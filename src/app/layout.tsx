import { Layout } from '@/components/layout';
import { urbanist } from '@/configs/fonts';
import { ViewTransitions } from 'next-view-transitions';
import { ReactNode } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Web Diff',
};

export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html className={urbanist.className}>
        <head>
          <link rel='preconnect' href='https://storage.googleapis.com' />
        </head>
        <body>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
