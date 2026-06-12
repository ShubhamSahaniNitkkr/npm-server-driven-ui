# Deploy websites to Render + link on npm

Deploy **5 static sites** (docs + 4 demos), then point npm **Homepage** to your docs URL.

---

## Step 1 — Push code to GitHub

Repo: https://github.com/ShubhamSahaniNitkkr/npm-server-driven-ui

```bash
git add .
git commit -m "Add Render deploy config"
git push origin main
```

---

## Step 2 — Deploy on Render (one click)

1. Go to https://dashboard.render.com  
2. **New** → **Blueprint**  
3. Connect GitHub → select `npm-server-driven-ui`  
4. Render reads `render.yaml` and creates **5 static sites**  
5. Click **Apply** → wait ~5–10 min for builds  

### Default URLs (after deploy)

| Site | URL |
|------|-----|
| **Docs** (link this on npm) | https://sdui-docs.onrender.com |
| User Management demo | https://sdui-user-management.onrender.com |
| CRM demo | https://sdui-crm-dashboard.onrender.com |
| Analytics demo | https://sdui-analytics-dashboard.onrender.com |
| Form Builder demo | https://sdui-form-builder.onrender.com |

> Free tier sites sleep after inactivity — first load may take ~30s.

---

## Step 3 — Fix URLs if Render gave different names

If your URLs differ from the table above:

1. Edit `sites/urls.json` — set your real Render URLs  
2. Edit `sites/docs/demos.json` — same demo URLs (powers demo links on docs site)  
3. Edit `homepage` in `packages/core/package.json` (and antd/charts) → your docs URL  
4. Commit, push → Render auto-redeploys docs  

---

## Step 4 — Link docs on npm

npm shows the **Homepage** field from `package.json` on the package page sidebar.

Already set to:

```
https://sdui-docs.onrender.com
```

**Republish** so npm picks it up:

1. Bump version in `packages/core`, `packages/antd`, `packages/charts` (e.g. `1.0.1` → `1.0.2`)  
2. Build:

```bash
npx pnpm@9 prepublish:check
```

3. Publish:

```bash
cd packages/core && npm publish --access public
cd ../antd && npm publish --access public
cd ../charts && npm publish --access public
```

4. Open https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui  
   - **Homepage** → docs site  
   - **Repository** → GitHub  
   - README **Full docs** → docs site  

---

## Step 5 — Verify

- [ ] https://sdui-docs.onrender.com loads  
- [ ] https://sdui-docs.onrender.com/configure.html loads  
- [ ] Demo links on docs page open the 4 demos  
- [ ] npm package **Homepage** opens docs site  

---

## Redeploy after changes

Push to GitHub → Render redeploys automatically.

To rebuild demos locally before push:

```bash
npx pnpm@9 sites:build
```
