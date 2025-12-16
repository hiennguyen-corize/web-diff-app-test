import { Config } from '@/types/config';

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const PRODUCTION_CLOUD_FC_REGION = process.env.PRODUCTION_CLOUD_FC_REGION;

if (!FIREBASE_PROJECT_ID) {
  throw new Error('FIREBASE_PROJECT_ID is not defined');
}

if (!PRODUCTION_CLOUD_FC_REGION) {
  throw new Error('PRODUCTION_CLOUD_FC_REGION is not defined');
}

const config: Config = {
  client: {
    origin: 'https://web-diff-ed45d.web.app',
  },
  cloudFunctions: {
    origin: `https://${PRODUCTION_CLOUD_FC_REGION}-${FIREBASE_PROJECT_ID}.cloudfunctions.net`,
  },
};

export default config;
