# Cloudflare setup — WPDF

## 1. Create the D1 database

```bash
npx wrangler d1 create wpdf-db
```

Copy the returned `database_id` into `wrangler.toml` in place of `REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID`.

## 2. Initialize the schema

```bash
npx wrangler d1 execute wpdf-db --remote --file=./schema.sql
```

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
