export default {
  backendURL: process.env.BACKEND_URL,
  isProd: process.env.ENVIRONMENT === 'production',
  googleTrackingId: process.env.GOOGLE_TRACKING_ID,
};
