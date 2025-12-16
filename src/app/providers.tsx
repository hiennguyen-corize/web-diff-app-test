// In Next.js, this file would be called: app/providers.jsx
'use client';
import { NotificationProvider } from '@/contexts/Notification';
// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { NotificationContainer } from '@/components/ui/Notification';
import { theme } from '@/configs/theme';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthenticationProvider } from '@/contexts/Auth/AuthenticationProvider';
import { ProjectDetailStateProvider } from '@/contexts/ProjectDetailState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import dynamic from 'next/dynamic';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';

const ProgressBar = dynamic(
  () => import('next-nprogress-bar').then((mod) => mod.AppProgressBar),
  { ssr: false }
);

const ReactQueryDevtoolsDynamic = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then(
      (mod) => mod.ReactQueryDevtools
    ),
  { ssr: false }
);

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ReactQueryDevtoolsDynamic initialIsOpen={false} />
        <ProgressBar
          height='4px'
          color={theme.colors.primary}
          options={{ showSpinner: false }}
          shallowRouting
        />
        <AdminProvider>
          <AuthenticationProvider>
            <NotificationProvider>
              <ProjectDetailStateProvider>
                {typeof window !== 'undefined' ? (
                  <Provider>{children}</Provider>
                ) : (
                  <StyleSheetManager
                    sheet={styledComponentsStyleSheet.instance}
                  >
                    {children}
                  </StyleSheetManager>
                )}
              </ProjectDetailStateProvider>
              <NotificationContainer />
            </NotificationProvider>
          </AuthenticationProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
