import app from "../artifacts/api-server/src/app";

// Vercel must pass the request stream through to Express so the app's own
// JSON and raw-image parsers can handle each endpoint correctly.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;