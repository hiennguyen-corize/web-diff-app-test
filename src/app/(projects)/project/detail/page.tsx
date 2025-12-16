import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'Web Diff - Project Detail',
};

export default function projectDetail() {
  return (
    <Suspense>
      <ProjectDetailPage />
    </Suspense>
  );
}
