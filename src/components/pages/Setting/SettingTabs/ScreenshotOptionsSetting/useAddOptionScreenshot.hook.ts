import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import {
  addScreenshotOption,
  deleteOptionsScreenshot,
  getScreenshotOptions,
  updateManyOptionsScreenshot,
} from '@/services/screenshotOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep, first, uniqueId } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export type FieldType = {
  key: string;
  value: string;
  isDeleted?: boolean;
  id: string | number;
};

type KeyAndValueType = {
  key: string;
  value: string;
};

export const useAddOptionScreenshot = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const modifyIdsMap = useMemo(() => new Map<string, boolean>(), []);

  const { isAllowed, isPermissionChecking, checkUserPermission } =
    useProjectPermission();

  const {
    control,
    handleSubmit,
    unregister,
    reset: resetForm,
  } = useForm({
    shouldFocusError: true,
  });

  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const addField = useCallback(() => {
    queryClient.setQueryData(
      [projectId, 'screenshotOptions'],
      (prev: FieldType[]) => [...prev, { id: uniqueId(), key: '', value: '' }]
    );
  }, [projectId, queryClient]);

  const removeField = useCallback(
    (id: string) => {
      queryClient.setQueryData(
        [projectId, 'screenshotOptions'],
        (prev: FieldType[]) => {
          const newPrev = cloneDeep(prev);
          let newOptions: FieldType[];

          if (Number(id)) {
            newOptions = newPrev.filter((field) => field.id !== id);
          }

          newOptions = newPrev.map((field) => {
            if (field.id === id) {
              field.isDeleted = true;
            }
            return field;
          });

          return newOptions;
        }
      );

      unregister([`${id}-key`, `${id}-value`]);
    },
    [projectId, queryClient, unregister]
  );

  const handleGetScreenshotOptions = useCallback(async () => {
    if (!projectId) {
      return;
    }

    try {
      let response = await getScreenshotOptions(projectId);

      if (!response.data || !response.data.length) {
        await addScreenshotOption(projectId, [{ key: '', value: '' }]);
        response = await getScreenshotOptions(projectId);
      }

      return response.data;
    } catch (error) {
      setNotification({
        type: 'error',
        message:
          error instanceof AxiosError ? error.message : 'An error occurred',
      });
    }
  }, [projectId, setNotification]);

  const {
    data: screenshotOptions,
    isLoading: isLoadingScreenshotOptions,
    refetch: refetchScreenshotOptions,
  } = useQuery({
    queryKey: [projectId, 'screenshotOptions'],
    queryFn: handleGetScreenshotOptions,
    enabled: !!projectId && !!isAllowed,
  });

  const submit = useCallback(
    async (options: { [k: string]: FormDataEntryValue }) => {
      if (!projectId) {
        return;
      }

      const isAllowed = await checkUserPermission();

      if (!isAllowed) {
        setNotification({
          type: 'error',
          message: 'You do not have permission to add screenshot options',
        });
        return;
      }

      try {
        const deleteOptions = screenshotOptions?.filter(
          (option: FieldType) => option.isDeleted
        );

        const deleteOptionIds = deleteOptions?.map((option) => option.id) || [];
        const { newOptions, modifyOptions } = handleFilterOptions(
          options,
          modifyIdsMap
        );

        await Promise.all([
          addScreenshotOption(projectId, newOptions),
          deleteOptionsScreenshot(projectId, deleteOptionIds),
          updateManyOptionsScreenshot(projectId, modifyOptions),
        ]);

        if (!!newOptions.length || !!modifyOptions.length) {
          await refetchScreenshotOptions();
        }

        resetForm();

        setNotification({
          type: 'success',
          message: 'Update screenshot options successfully',
        });
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof AxiosError
              ? error?.message || 'An error occurred'
              : 'Update screenshot options failed',
        });
      }
    },
    [
      checkUserPermission,
      modifyIdsMap,
      projectId,
      refetchScreenshotOptions,
      resetForm,
      screenshotOptions,
      setNotification,
    ]
  );

  const { mutate: onSubmit, isPending: isOptionsUpdating } = useMutation({
    mutationFn: submit,
  });

  const disabled = useMemo(
    () => isOptionsUpdating || !!isPermissionChecking,
    [isOptionsUpdating, isPermissionChecking]
  );

  const loading = useMemo(
    () => isLoadingScreenshotOptions || isPermissionChecking,
    [isLoadingScreenshotOptions, isPermissionChecking]
  );

  const handleCancel = useCallback(async () => {
    resetForm();
    await refetchScreenshotOptions();
  }, [refetchScreenshotOptions, resetForm]);

  return {
    onSubmit: handleSubmit((form: Record<string, FormDataEntryValue>) =>
      onSubmit(form)
    ),
    notFound: isAllowed === false,
    screenshotOptions,
    isOptionsUpdating,
    modifyIdsMap,
    handleCancel,
    removeField,
    addField,
    disabled,
    loading,
    control,
  };
};

const handleFilterOptions = (
  options: { [k: string]: FormDataEntryValue },
  modifyIdsMap: Map<string, boolean>
) => {
  const newOptions: KeyAndValueType[] = [];
  const modifyOptions: (KeyAndValueType & { id: string })[] = [];

  Object.keys(options).forEach((objectKey) => {
    const id = first(objectKey.split('-'));

    if (!id) {
      return;
    }

    const key = options[`${id}-key`]?.toString();
    const value = options[`${id}-value`]?.toString();

    if (!key || !value) {
      return;
    }

    if (!!Number(id)) {
      push(newOptions, key, value);
    } else {
      modifyIdsMap.set(id, true);
      push(modifyOptions, key, value, id);
    }
  });

  return { newOptions, modifyOptions };
};

const push = (
  options: KeyAndValueType[],
  key: string,
  value: string,
  id?: string
) => {
  const isExist = options.some(
    (option) => option.key === key && option.value === value
  );

  if (!isExist) {
    const payload: KeyAndValueType & { id?: string } = {
      key,
      value,
    };

    if (id) {
      payload.id = id;
    }

    options.push(payload);
  }
};
