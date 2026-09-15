# WPDF

WPDF is a browser-based PDF tools application focused on client-side file processing.

## Current application

The current production application is implemented in `index.html` and provides PDF organization, optimization, conversion, and security tools.

## Development

The `main` branch remains the current published version. The `develop` branch is used for modernization and restructuring work.

## Architecture migration

The application is being migrated incrementally from the original monolithic JavaScript file into maintainable modules. The current development branch contains a PDF module boundary under `assets/js/pdf/` for core utilities, merge, split, editing, security, and conversion dependencies.

The legacy `app.js` remains the authoritative runtime during this migration, while completed operations are switched over one at a time after their behavior is audited.

The PDF merge operation is now wired to `assets/js/pdf/merge.js` and keeps the existing output filename and PDF object-stream behavior.

## PDF module smoke test

A browser-based smoke test is available at `tests/pdf-modules.html`. It creates small in-memory PDFs and verifies the extracted merge, split, delete-page, and reorder-page modules. The test does not modify production application state.

## Privacy

The application is designed around client-side processing for the supported operations. Third-party libraries are currently loaded from CDNs and will be reviewed during development.

## Roadmap

- [x] Establish a protected development branch.
- [x] Add project license and ignore rules.
- [x] Separate CSS and JavaScript from `index.html`.
- [x] Establish PDF module boundaries.
- [x] Add browser smoke coverage for the extracted PDF modules.
- [x] Switch PDF merge from the legacy runtime to the new module.
- [ ] Switch the remaining PDF operations from the legacy runtime to the new modules.
- [ ] Audit conversion fidelity and browser compatibility.
- [ ] Improve mobile UX and accessibility.
- [ ] Improve SEO, metadata, and structured data.
- [ ] Add PWA support and proper application icons.
- [ ] Improve error handling and progress feedback.
- [ ] Reduce unnecessary external dependencies where practical.

## License

See LICENSE.
