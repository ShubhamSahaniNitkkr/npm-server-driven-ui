# @shubhamsunnynitkkr/server-driven-ui

Build React UIs from JSON. Backend sends a schema → library renders forms, tables, buttons, charts.

---

## What the npm package does

| Package | Purpose |
|---------|---------|
| `@shubhamsunnynitkkr/server-driven-ui` | Core — reads JSON, renders React UI |
| `@shubhamsunnynitkkr/server-driven-ui-antd` | 30+ components (input, table, modal, etc.) |
| `@shubhamsunnynitkkr/server-driven-ui-charts` | Charts (line, bar, pie, area) |

```bash
npm install @shubhamsunnynitkkr/server-driven-ui @shubhamsunnynitkkr/server-driven-ui-antd react react-dom antd
```

```tsx
import { SDUIRenderer } from '@shubhamsunnynitkkr/server-driven-ui';
import { createAntdRegistry } from '@shubhamsunnynitkkr/server-driven-ui-antd';

<SDUIRenderer schema={schemaFromApi} registry={createAntdRegistry()} />
```

---

## Examples

Each example is a **separate deployable site** in `sites/`. Schema lives in `src/schemas/page.json`.

| Example | Folder | What it shows | Run locally |
|---------|--------|---------------|-------------|
| **User Management** | `sites/user-management` | Table, search, add-user modal, conditional fields (`visibleIf`) | `pnpm demo:user-management` |
| **CRM Dashboard** | `sites/crm-dashboard` | Stat cards, deals table, activity list | `pnpm demo:crm` |
| **Analytics Dashboard** | `sites/analytics-dashboard` | Date filters, line/bar/pie/area charts | `pnpm demo:analytics` |
| **Form Builder** | `sites/form-builder` | Dynamic form fields, preview panel | `pnpm demo:form-builder` |

### User Management

Table with sort/filter, search box, "Add User" modal. Department field only shows when role = admin.

```bash
pnpm demo:user-management   # → http://localhost:5173
```

Schema: `sites/user-management/src/schemas/page.json`

### CRM Dashboard

KPI stat cards, recent deals table, activity feed list.

```bash
pnpm demo:crm   # → http://localhost:5173
```

Schema: `sites/crm-dashboard/src/schemas/page.json`

### Analytics Dashboard

Date range pickers, metric selector, 4 chart types (needs charts package).

```bash
pnpm demo:analytics   # → http://localhost:5173
```

Schema: `sites/analytics-dashboard/src/schemas/page.json`

### Form Builder

Build form fields dynamically — select field type, name, label, required toggle.

```bash
pnpm demo:form-builder   # → http://localhost:5173
```

Schema: `sites/form-builder/src/schemas/page.json`

---

## Simplest way to test

**Prerequisite:** Node.js 18+. This repo uses `pnpm`. If you get `command not found: pnpm`, either install it once:

```bash
npm install -g pnpm
```

or prefix commands with `npx` (no global install):

```bash
npx pnpm@9 install
npx pnpm@9 demo:user-management
```

Then:

```bash
pnpm install
pnpm build
pnpm demo:user-management
```

Open **http://localhost:5173**

---

## Host on Render (separate sites)

| Site | Folder | Render publish path |
|------|--------|---------------------|
| Docs | `sites/docs` | `sites/docs` (no build) |
| User Management | `sites/user-management` | `sites/user-management/dist` |
| CRM Dashboard | `sites/crm-dashboard` | `sites/crm-dashboard/dist` |
| Analytics | `sites/analytics-dashboard` | `sites/analytics-dashboard/dist` |
| Form Builder | `sites/form-builder` | `sites/form-builder/dist` |

Full steps: [sites/README.md](./sites/README.md). Root [render.yaml](./render.yaml) deploys all 5 at once.

After deploying demos, update URLs in `sites/docs/demos.json`.

---

## Repo structure

```
packages/core          → @shubhamsunnynitkkr/server-driven-ui (npm)
packages/antd          → @shubhamsunnynitkkr/server-driven-ui-antd (npm)
packages/charts        → @shubhamsunnynitkkr/server-driven-ui-charts (npm)
sites/docs             → documentation site (static HTML)
sites/user-management  → live demo
sites/crm-dashboard    → live demo
sites/analytics-dashboard → live demo
sites/form-builder     → live demo
```

---

## Commands

| Command | What |
|---------|------|
| `pnpm build` | Build all npm packages |
| `pnpm demo:user-management` | Run user management demo |
| `pnpm demo:crm` | Run CRM demo |
| `pnpm demo:analytics` | Run analytics demo |
| `pnpm demo:form-builder` | Run form builder demo |
| `pnpm sites:build` | Build all demo sites for Render |
| `pnpm docs:serve` | Serve docs locally on :3000 |
| `pnpm test` | Run unit tests |
| `pnpm prepublish:check` | Build + test before npm publish |

---

## Publish to npm

See [PUBLISHING.md](./PUBLISHING.md).

---

MIT © shubhamsunnynitkkr
