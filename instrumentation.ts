import * as Sentry from "@sentry/nextjs";

// Error monitoring stays off until NEXT_PUBLIC_SENTRY_DSN is set in Vercel.
export function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, tracesSampleRate: 0 });
}

export const onRequestError = Sentry.captureRequestError;
