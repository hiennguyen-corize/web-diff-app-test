'use client';

import { ProjectDetailPage } from '@/components/admin/ProjectDetailPage';
import { Loading } from '@/components/ui/Loading';
import { Suspense } from 'react';

export default function ProjectDetail() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectDetailPage />
    </Suspense>
  );
}
