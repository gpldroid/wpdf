import * as core from './core.js';
import * as merge from './merge.js';
import * as split from './split.js';
import * as edit from './edit.js';
import * as security from './security.js';
import * as convert from './convert.js';

// Stable namespace for the migration phase. Existing app.js remains authoritative
// until each operation is switched over and tested.
window.WPDF_PDF = { core, merge, split, edit, security, convert };
