import { Config } from '@/types/config';

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

if (!FIREBASE_PROJECT_ID) {
  throw new Error('FIREBASE_PROJECT_ID is not defined');
}

const config: Config = {
  client: {
    origin: 'http://localhost:3000',
  },
  cloudFunctions: {
    origin: `http://localhost:5001/${FIREBASE_PROJECT_ID}/asia-southeast1`,
  },
};

export default config;
