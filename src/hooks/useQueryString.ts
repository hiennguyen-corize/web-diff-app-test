import { useTransitionRouter } from 'next-view-transitions';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type QueryStringType = {
  name: string;
  value: string;
};

export const useQueryString = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (queries: QueryStringType[]) => {
      const params = new URLSearchParams(searchParams.toString());
      queries.forEach(({ name, value }) => {
        params.set(name, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  const removeQueryString = useCallback(
    (query: Omit<QueryStringType, 'value'>[]) => {
      const params = new URLSearchParams(searchParams.toString());
      query.forEach(({ name }) => {
        params.delete(name);
      });
      return params.toString();
    },
    [searchParams]
  );

  const navigate = useCallback(
    (queryString: string) => {
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [pathname, router]
  );

  return { navigate, createQueryString, removeQueryString };
};
