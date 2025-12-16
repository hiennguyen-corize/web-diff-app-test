'use client';
import { AppPropsWithLayout } from '@/types';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { FC, PropsWithChildren, useState } from 'react';

const TansTackProviders: FC<
  PropsWithChildren<{ pageProps: AppPropsWithLayout['pageProps'] }>
> = ({ children, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TansTackProviders;
