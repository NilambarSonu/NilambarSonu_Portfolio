---
name: Portfolio misc sharp edges
description: Named import for react-github-calendar; separate pg.query calls for stats tables
---

## react-github-calendar import
Use named export: `import { GitHubCalendar } from "react-github-calendar"` (v4.5+ dropped default export).

**Why:** The package only exports a named `GitHubCalendar` from `build/index.js`. Default import throws "does not provide an export named 'default'" at runtime.

## Stats table creation (api-server)
Use separate `await p.query()` calls for each CREATE TABLE / INSERT statement, not a single multi-statement string. A `tablesEnsured` boolean guard prevents repeated setup calls.

**Why:** pg's `pool.query()` does not support multiple SQL statements separated by semicolons — it throws a Postgres parse error (`duplicate key value violates unique constraint "pg_type_typname_nsp_index"` or similar).
