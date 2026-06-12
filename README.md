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

## Deploy websites to Render + link on npm

**Full guide:** [DEPLOY-RENDER.md](./DEPLOY-RENDER.md)

**Quick steps:**

1. Push repo to GitHub  
2. Render → **New** → **Blueprint** → connect repo → **Apply**  
3. Wait for deploy — docs live at **https://sdui-docs.onrender.com**  
4. Republish npm (version `1.0.2+`) so **Homepage** on npm points to docs  

| Site | Live URL |
|------|----------|
| Docs (npm Homepage) | https://sdui-docs.onrender.com |
| User Management | https://sdui-user-management.onrender.com |
| CRM Dashboard | https://sdui-crm-dashboard.onrender.com |
| Analytics | https://sdui-analytics-dashboard.onrender.com |
| Form Builder | https://sdui-form-builder.onrender.com |

Config: [render.yaml](./render.yaml) · URLs: [sites/urls.json](./sites/urls.json) · Demo links: [sites/docs/demos.json](./sites/docs/demos.json)

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

First-time setup (token, scope, 2FA): see [PUBLISHING.md](./PUBLISHING.md).

**Live packages:**

| Package | npm |
|---------|-----|
| Core | https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui |
| Ant Design | https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui-antd |
| Charts | https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui-charts |

**Repo:** https://github.com/ShubhamSahaniNitkkr/npm-server-driven-ui

### Republish (after you change code or fix README links)

npm does not update until you bump the version and publish again.

**1. Bump version** in all three `package.json` files:

- `packages/core/package.json`
- `packages/antd/package.json`
- `packages/charts/package.json`

Change e.g. `1.0.2` → `1.0.3` (must be higher than the version already on npm).

**2. Build and test:**

```bash
npx pnpm@9 install
npx pnpm@9 prepublish:check
```

**3. Publish** (core first, then antd, then charts):

```bash
cd packages/core && npm publish --access public
cd ../antd && npm publish --access public
cd ../charts && npm publish --access public
```

If you use 2FA with an authenticator app, add `--otp=123456` to each command.

If you use an npm token: `npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN` (see [PUBLISHING.md](./PUBLISHING.md)).

**4. Verify** — refresh the npm page and check the new version number.

---

MIT © shubhamsunnynitkkr
