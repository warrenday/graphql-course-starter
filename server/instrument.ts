import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://894b013caeb8a75a4e616432e3bf7165@o4508608845971456.ingest.de.sentry.io/4508608849576016",
  tracesSampleRate: 1.0,
  integrations: [
    Sentry.graphqlIntegration({
      ignoreResolveSpans: false,
    }),
  ],
});
