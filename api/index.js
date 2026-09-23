// Vercel must pass the request stream through to Express so the app's own
// JSON and raw-image parsers can handle each endpoint correctly.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Vercel compiles this entry to CommonJS. Load the prebuilt ESM bundle
// dynamically so the runtime does not try to require a .mjs file.
const appPromise = import("../artifacts/api-server/dist/vercel.mjs").then(
  (module) => module.default,
);

export default async function handler(req, res) {
  const app = await appPromise;
  return app(req, res);
}