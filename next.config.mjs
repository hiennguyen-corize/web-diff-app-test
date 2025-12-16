/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  compiler: {
    styledComponents: { ssr: true, minify: true, pure: true },
  },
  distDir: 'dist',
  env: {
    ENV: process.env.ENV,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SUBSCRIPTION_PRICING_TABLE_ID:
      process.env.STRIPE_SUBSCRIPTION_PRICING_TABLE_ID,
    STRIPE_ADD_ONS_PRICING_TABLE_ID:
      process.env.STRIPE_ADD_ONS_PRICING_TABLE_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_MAIL: process.env.FIREBASE_CLIENT_MAIL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    PRODUCTION_CLOUD_FC_REGION: process.env.PRODUCTION_CLOUD_FC_REGION,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
    formats: ['image/webp'],
    unoptimized: true,
  },
};

export default nextConfig;
