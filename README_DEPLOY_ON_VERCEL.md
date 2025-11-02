# Deploying This App on Vercel

## 1. Requirements

- Node.js and npm installed
- Vercel CLI installed (`npm i -g vercel`)

## 2. Build (if needed)

If you use Vite (check for `vite.config.ts`), run:

```bash
npm run build
```

This will output to the `dist/` folder by default.

## 3. Vercel Configuration

A `vercel.json` file is included to ensure SPA routing works (all routes go to `index.html`).

## 4. Deploy

From your project root, run:

```bash
vercel --prod
```

Or, if you want to link to your Vercel account/project:

```bash
vercel link
vercel --prod
```

## 5. Notes

- All static assets in `dist/` (or your build output) will be served.
- If you use Vite, set the output directory in `vite.config.ts` if you change it from `dist`.
- For static HTML/JS/CSS (no build step), just run `vercel --prod` in the root.

## References

- [Vercel Docs](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
