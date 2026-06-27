---
name: Portfolio pdfjs-dist version constraint
description: pdfjs-dist must be v4.x; v6 breaks due to Map.prototype.getOrInsertComputed missing in current browser/Node env
---

pdfjs-dist must be pinned at v4.x (currently 4.10.38 in artifacts/portfolio).

**Why:** v6 uses `Map.prototype.getOrInsertComputed` (a very new JS API) which is not available in the current Replit browser preview environment. It manifests as `this[#methodPromises].getOrInsertComputed is not a function` at `ResizeObserver.renderPage`.

**How to apply:** If pdfjs-dist is ever upgraded, test the Resume component immediately. The worker import style (`import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"`) works fine with v4.
