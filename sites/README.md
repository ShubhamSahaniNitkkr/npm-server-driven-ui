# Sites (Render deployment)

See **[DEPLOY-RENDER.md](../DEPLOY-RENDER.md)** for the full deploy + npm linking guide.

## URLs (after Render deploy)

| Site | URL |
|------|-----|
| Docs | https://sdui-docs.onrender.com |
| User Management | https://sdui-user-management.onrender.com |
| CRM | https://sdui-crm-dashboard.onrender.com |
| Analytics | https://sdui-analytics-dashboard.onrender.com |
| Form Builder | https://sdui-form-builder.onrender.com |

Update `sites/urls.json` and `sites/docs/demos.json` if your Render URLs differ.

## Local dev

```bash
npx pnpm@9 demo:user-management   # http://localhost:5173
npx pnpm@9 docs:serve             # http://localhost:3000
```
