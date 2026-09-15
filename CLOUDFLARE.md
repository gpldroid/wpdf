# Cloudflare setup — WPDF

## 1. Production D1 database

Database name: `wpdf-production`

Database ID: `09339c53-6f74-4d35-b9f4-04e7cfd19246`

The production D1 binding is configured in `wrangler.toml` as `DB`. fileciteturn209file0

## 2. Initialize the schema

From the repository root, run:

```bash
npx wrangler d1 execute wpdf-production --remote --file=./schema.sql
```

The schema creates the application settings and visit analytics tables and seeds the owner as `عماد الدين لمراني`. fileciteturn210file0

## 3. Deploy to Cloudflare Pages

Connect `gpldroid/wpdf` to Cloudflare Pages and use the repository root as the build output directory. No build command is required for the static application.

Make sure the D1 binding is named exactly `DB` for the production environment.

## 4. Protect the administration area

Use Cloudflare Zero Trust Access to protect:

- `/admin/*`
- `/api/admin/*`

Only the site owner should be allowed to access these paths. The dashboard intentionally does not implement a second password system in browser JavaScript.

## 5. Owner

The configured site owner is **عماد الدين لمراني**. The value is also stored in D1 under `site_settings.owner_name`.

## 6. PDF editor

The public editor is available at `/pdf-editor.html` and supports:

- PDF upload
- camera capture on supported mobile browsers
- image upload and conversion to PDF
- page preview using PDF.js
- adding text
- freehand drawing
- local save/download using pdf-lib

Files remain in the browser during editing; the editor does not upload document contents to D1.

## Important

The D1 database is for application metadata/analytics, not for storing users' PDF documents. Do not add PDF contents or sensitive document data to the analytics tables.
