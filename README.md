# WPDF

WPDF is a browser-based PDF tools application focused on client-side file processing.

## Current application

The current production application is implemented in `index.html` and provides PDF organization, optimization, conversion, and security tools.

## Development

The `main` branch remains the current published version. The `develop` branch is used for modernization and restructuring work.

## Architecture migration

The application is being migrated incrementally from the original monolithic JavaScript file into maintainable modules under `assets/js/pdf/`.

The extracted module layer now covers:

- core PDF loading, byte handling, downloads, and page-range parsing
- PDF merge
- PDF page extraction and per-page splitting
- page deletion and reordering
- page numbering
- image-to-PDF conversion
- security capability detection
- conversion-library boundaries for Word, Excel, and PowerPoint workflows
- dedicated conversion implementations for the existing browser libraries

The legacy `app.js` remains the authoritative runtime during this migration. The merge operation is already switched to the new module; the remaining runtime switches are intentionally kept separate from the module extraction so each browser-facing change can be audited without destabilizing the published application.

## PDF module smoke test

A browser-based smoke test is available at `tests/pdf-modules.html`. It creates in-memory PDFs and verifies merge, split, delete, reorder, page numbering, and image-to-PDF behavior without modifying production application state.

The repository also includes a GitHub Actions validation workflow that checks JavaScript module syntax and required project files on `main`, `develop`, and pull requests.

## SEO and PWA foundation

The development branch now includes:

- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- `sw.js` offline application-shell foundation

The service worker is prepared as a separate deployment asset; activation should be completed only after the manifest is linked and registration is wired into the browser runtime.

## Privacy and dependency policy

The application is designed around client-side processing for supported operations. Third-party libraries are currently loaded from CDNs. Conversion fidelity and browser compatibility should be audited before replacing or removing these dependencies.

## Roadmap

- [x] Establish a protected development branch.
- [x] Add project license and ignore rules.
- [x] Separate CSS and JavaScript from `index.html`.
- [x] Establish PDF module boundaries.
- [x] Extract PDF split, edit, numbering, and image operations.
- [x] Extract Word, Excel, and PowerPoint conversion boundaries.
- [x] Add browser smoke coverage for core PDF modules.
- [x] Add CI syntax and structure validation.
- [x] Add SEO crawling assets (`robots.txt` and `sitemap.xml`).
- [x] Add PWA manifest and service-worker foundation.
- [x] Switch PDF merge from the legacy runtime to the new module.
- [ ] Switch the remaining PDF operations from the legacy runtime to the new modules.
- [ ] Audit conversion fidelity and browser compatibility on real browsers/devices.
- [ ] Wire PWA registration and add production application icons.
- [ ] Complete mobile UX/accessibility audit.
- [ ] Replace remaining monolithic UI/processing paths with tested modules.
- [ ] Reduce unnecessary external dependencies where practical.

## License

See `LICENSE` for the MIT License.
