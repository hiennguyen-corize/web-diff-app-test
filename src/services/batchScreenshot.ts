import env from '@/configs/env';
import db from '@/configs/firebase';
import { httpClient } from '@/utils/httpClient';
import { collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore';

export type RetryPolicy = {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier: number;
};

export type BatchScreenshotResult = {
  projectId: string;
  pageId: string;
  status: 'success' | 'failed';
  durationMs: number;
  error?: string;
};

export type BatchScreenshotSummary = {
  projectId: string;
  totalPages: number;
  successCount: number;
  failedCount: number;
  totalDurationMs: number;
  results: BatchScreenshotResult[];
};

const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxRetries: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Captures screenshots for all pages of a project with retry logic.
 * Uses exponential backoff for failed attempts.
 */
export const batchScreenshotWithRetry = async (
  projectId: string,
  userId: string,
  retryPolicy: RetryPolicy = DEFAULT_RETRY_POLICY,
): Promise<BatchScreenshotSummary> => {
  const projectRef = doc(db, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error(`Project ${projectId} not found`);
  }

  const projectData = projectSnap.data();

  if (projectData.userId != userId) {
    throw new Error('Unauthorized: project does not belong to user');
  }

  const pagesRef = collection(db, `projects/${projectId}/pages`);
  const pagesQuery = query(pagesRef, where('status', '==', 'active'));
  const pagesSnap = await getDocs(pagesQuery);

  const results: BatchScreenshotResult[] = [];
  let successCount = 0;
  let failedCount = 0;

  for (const pageDoc of pagesSnap.docs) {
    const pageData = pageDoc.data();
    const result = await screenshotWithRetry(
      projectId,
      pageDoc.id,
      pageData.url as string,
      retryPolicy,
    );

    results.push(result);
    if (result.status === 'success') {
      successCount++;
    } else {
      failedCount++;
    }
  }

  const totalDurationMs = results.reduce((sum, r) => sum + r.durationMs, 0);

  updateDoc(projectRef, {
    'batchScreenshot.lastRunAt': new Date().toISOString(),
    'batchScreenshot.totalPages': pagesSnap.size,
    'batchScreenshot.successCount': successCount,
    'batchScreenshot.failedCount': failedCount,
  });

  return {
    projectId,
    totalPages: pagesSnap.size,
    successCount,
    failedCount,
    totalDurationMs,
    results,
  };
};

/**
 * Takes a screenshot of a single page with retry logic.
 * Implements exponential backoff between retries.
 */
const screenshotWithRetry = async (
  projectId: string,
  pageId: string,
  url: string,
  policy: RetryPolicy,
): Promise<BatchScreenshotResult> => {
  let lastError = '';
  let delay = policy.delayMs;

  for (let attempt = 1; attempt <= policy.maxRetries; attempt++) {
    try {
      const startTime = Date.now();

      const response = await httpClient.post(`${env.SCREENSHOT_API_URL}/capture`, {
        projectId,
        pageId,
        url,
      });

      const durationMs = Date.now() - startTime;

      return {
        projectId,
        pageId,
        status: 'success',
        durationMs,
      };
    } catch (error: any) {
      lastError = error.message || 'Unknown error';

      if (attempt < policy.maxRetries) {
        await sleep(delay);
        delay *= policy.backoffMultiplier;
      }
    }
  }

  return {
    projectId,
    pageId,
    status: 'failed',
    durationMs: 0,
    error: lastError,
  };
};

/**
 * Cancels a running batch screenshot operation.
 */
export const cancelBatchScreenshot = async (projectId: string) => {
  const projectRef = doc(db, 'projects', projectId);
  await updateDoc(projectRef, {
    'batchScreenshot.cancelled': true,
    'batchScreenshot.cancelledAt': new Date().toISOString(),
  });
};

/**
 * Gets the recent batch screenshot history for a project.
 */
export const getBatchScreenshotHistory = async (projectId: string, limit: number = 10) => {
  const historyRef = collection(db, `/projects/${projectId}/batchHistory`);
  const historyQuery = query(historyRef, where('projectId', '==', projectId));
  const historySnap = await getDocs(historyQuery);

  const history = historySnap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return history.slice(0, limit).sort((a, b) => {
    return (b as any).createdAt - (a as any).createdAt;
  });
};
