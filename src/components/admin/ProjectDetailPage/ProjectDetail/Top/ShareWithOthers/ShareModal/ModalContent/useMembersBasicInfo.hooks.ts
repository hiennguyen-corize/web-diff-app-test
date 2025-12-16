import { USER_BASIC_INFO_PROMISES_POOL_CONCURRENCY } from '@/constants/common';
import { UserBasicType } from '@/models/GetUserBasicInfoResponse';
import { getUserBasicInfo } from '@/services/user';
import { useQueryClient } from '@tanstack/react-query';
import { compact } from 'lodash';
import pLimit from 'p-limit';
import { useCallback, useEffect, useState } from 'react';

const limit = pLimit(USER_BASIC_INFO_PROMISES_POOL_CONCURRENCY);

type CollaboratorObjectType = { [key: string]: UserBasicType };

export const useMemberBasicInfo = (condition: boolean, emails?: string[]) => {
  const [collaboratorsObject, setCollaboratorsObject] =
    useState<CollaboratorObjectType>({});

  const queryClient = useQueryClient();

  const fetchDataWithPool = useCallback(
    async (emails?: string[]) => {
      if (!emails) {
        return;
      }

      const fetchPromises = emails.map((email) =>
        limit(async () => {
          const response = await getUserBasicInfo(email);
          setCollaboratorsObject((prev) => {
            if (!response.data) {
              return prev;
            }

            queryClient.setQueryData(
              ['usersBasicInfo'],
              (prev: CollaboratorObjectType) => {
                return {
                  ...prev,
                  [email]: response.data,
                };
              }
            );

            return {
              ...prev,
              [email]: response.data,
            };
          });
        })
      );

      return Promise.all(compact(fetchPromises));
    },
    [queryClient]
  );

  const getUserInfo = useCallback(() => {
    if (!emails) {
      return;
    }

    const usersBasicInfo = queryClient.getQueryData<CollaboratorObjectType>([
      'usersBasicInfo',
    ]);

    const noCachedEmails: string[] = [];

    if (usersBasicInfo) {
      setCollaboratorsObject(usersBasicInfo);
    }

    emails.forEach((email) => {
      if (!usersBasicInfo?.[email]) {
        noCachedEmails.push(email);
      }
    });

    fetchDataWithPool(noCachedEmails);
  }, [emails, fetchDataWithPool, queryClient]);

  useEffect(() => {
    if (condition) {
      getUserInfo();
    }
  }, [condition, getUserInfo]);

  return { collaboratorsObject };
};
