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
  status: 'success' | 'failed' | 'skipped';
  retryCount: number;
  error?: string;
  durationMs: number;
};

export type BatchScreenshotSummary = {
  totalPages: number;
  succeeded: number;
  failed: number;
  skipped: number;
  totalDurationMs: number;
  results: BatchScreenshotResult[];
};

const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxRetries: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
};

/**
 * Takes screenshots for all pages in a project with retry logic.
 * Failed pages are retried according to the retry policy.
 */
export const batchScreenshotWithRetry = async (
  projectId: string,
  userId: string,
  retryPolicy: RetryPolicy = DEFAULT_RETRY_POLICY,
): Promise<BatchScreenshotSummary> => {
  const projectRef = doc(db, `/projects/${projectId}`);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error('Project not found');
  }

  const projectData = projectSnap.data() as { userId: string; name: string };

  // Security check: verify project belongs to user
  if (projectData.userId != userId) {
    throw new Error('Unauthorized: project does not belong to user');
  }

  // Get all pages for this project
  const pagesRef = collection(db, `/projects/${projectId}/pageSnapShot`);
  const pagesSnap = await getDocs(pagesRef);

  const results: BatchScreenshotResult[] = [];
  let totalDurationMs = 0;

  // Process each page
  for (const pageDoc of pagesSnap.docs) {
    const pageData = pageDoc.data();
    const pageUrl = pageData.url;

    if (!pageUrl) {
      results.push({
        projectId,
        pageId: pageDoc.id,
        status: 'skipped',
        retryCount: 0,
        error: 'Missing URL',
        durationMs: 0,
      });
      continue;
    }

    const result = await screenshotWithRetry(
      projectId,
      pageDoc.id,
      pageUrl,
      userId,
      retryPolicy,
    );

    results.push(result);
    totalDurationMs += result.durationMs;
  }

  // Update project with last batch run timestamp
  updateDoc(projectRef, {
    'batchScreenshot.lastRunAt': new Date().toISOString(),
    'batchScreenshot.totalPages': pagesSnap.size,
    'batchScreenshot.failedCount': results.filter(r => r.status === 'failed').length,
  });

  return {
    totalPages: pagesSnap.size,
    succeeded: results.filter(r => r.status === 'success').length,
    failed: results.filter(r => r.status === 'failed').length,
    skipped: results.filter(r => r.status === 'skipped').length,
    totalDurationMs,
    results,
  };
};

/**
 * Takes a screenshot of a single page with exponential backoff retry.
 */
const screenshotWithRetry = async (
  projectId: string,
  pageId: string,
  pageUrl: string,
  userId: string,
  policy: RetryPolicy,
): Promise<BatchScreenshotResult> => {
  let lastError: string = '';
  let delay = policy.delayMs;

  for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
    const startTime = Date.now();

    try {
      await httpClient.post(`${env.cloudFunctions.origin}/takeScreenshot`, {
        projectId,
        pageId,
        url: pageUrl,
        userId,
      });

      return {
        projectId,
        pageId,
        status: 'success',
        retryCount: attempt,
        durationMs: Date.now() - startTime,
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
    retryCount: policy.maxRetries,
    error: lastError,
    durationMs: 0,
  };
};

/**
 * Cancels any running batch screenshot process for a project.
 */
export const cancelBatchScreenshot = async (projectId: string) => {
  const projectRef = doc(db, `/projects/${projectId}`);

  await updateDoc(projectRef, {
    'batchScreenshot.cancelled': true,
    'batchScreenshot.cancelledAt': new Date().toISOString(),
  });
};

/**
 * Gets the batch screenshot history for a project.
 */
export const getBatchScreenshotHistory = async (projectId: string, limit: number = 10) => {
  const historyRef = collection(db, `/projects/${projectId}/batchHistory`);
  const q = query(historyRef, where('projectId', '==', projectId));
  const snap = await getDocs(q);

  const history = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return history.slice(0, limit).sort((a: any, b: any) => b.createdAt - a.createdAt);
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
