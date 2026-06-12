# Sites (deploy separately on Render)

Each folder is an **independent static site** for Render.

| Folder | Render service name | Publish path |
|--------|---------------------|--------------|
| `sites/docs` | sdui-docs | `sites/docs` (no build) |
| `sites/user-management` | sdui-user-management | `sites/user-management/dist` |
| `sites/crm-dashboard` | sdui-crm-dashboard | `sites/crm-dashboard/dist` |
| `sites/analytics-dashboard` | sdui-analytics-dashboard | `sites/analytics-dashboard/dist` |
| `sites/form-builder` | sdui-form-builder | `sites/form-builder/dist` |

## Deploy on Render

### 1. Docs site (no build)

- **Type:** Static Site
- **Root directory:** (repo root)
- **Publish directory:** `sites/docs`
- **Build command:** (leave empty)

### 2. Demo sites (need build)

Create one Static Site per demo. Example for User Management:

- **Root directory:** (repo root)
- **Build command:**
  ```bash
  pnpm install && pnpm --filter "./packages/*" run build && pnpm --filter sdui-site-user-management run build
  ```
- **Publish directory:** `sites/user-management/dist`

Or use the `render.yaml` inside each site folder.

### 3. Link demos on docs site

After deploying, update URLs in `sites/docs/demos.json` and redeploy docs.

## Local dev

```bash
pnpm demo:user-management   # http://localhost:5173
pnpm demo:crm
pnpm demo:analytics
pnpm demo:form-builder
pnpm docs:serve             # http://localhost:3000
```
