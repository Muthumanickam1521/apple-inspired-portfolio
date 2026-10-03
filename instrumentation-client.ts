// Error monitoring stays off until NEXT_PUBLIC_SENTRY_DSN is set in Vercel.
// Sentry is loaded lazily so it adds nothing to page load while it is off.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  import("@sentry/nextjs").then((Sentry) => Sentry.init({ dsn, tracesSampleRate: 0 }));
}
