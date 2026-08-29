# nouveyann.fr

My personal site. Next.js 16, TypeScript, Tailwind 4, bilingual FR/EN, deployed
on Vercel.

```bash
npm install
npm run dev
```

Content lives in `src/data` (`.en.ts` files hold the English copy), interface
strings in `src/i18n/dictionaries.ts`. French routes have no prefix, English
sits under `/en`.

`npm run check` runs the content guard, the security checks, `tsc` and `eslint`.
