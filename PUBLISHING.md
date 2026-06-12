# Publish to npm (simplest way)

npm has **no publish button on the website**. You publish from the terminal only.  
This takes ~10 minutes once. After that, each release is 3 commands.

---

## One-time setup (do once)

### 1. Create the scope on npm

1. Open https://www.npmjs.com/org/create  
2. Organization name: `shubhamsunnynitkkr`  
3. Choose **Free** plan  

Without this, `@shubhamsunnynitkkr/...` packages cannot be published.

### 2. Set up publish access (pick ONE option)

Email OTP at login is **not enough** to publish. Pick **A** or **B**:

#### Option A — No authenticator app? Use an npm token (easiest)

Do everything in the **browser** (email OTP only — no Google Authenticator):

1. Open https://www.npmjs.com/settings/~/tokens  
2. Click **Generate New Token** → **Granular Access Token**  
3. Name: `publish`  
4. Expiration: 90 days (or longer)  
5. Permissions: **Read and write**  
6. Packages: select **All packages** (or only `@shubhamsunnynitkkr/*`)  
7. If you see **Bypass two-factor authentication for automation** → turn it **ON**  
8. Click **Generate Token** → **copy the token** (you only see it once)

**Skip `npm login`** — paste the token directly (no browser):

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token you copied.  
Check it worked: `npm whoami` (should print your username).

Skip to [Publish](#publish-every-release) — you usually **don't** need `--otp=`.

<details>
<summary>Alternative: legacy login in terminal (no browser)</summary>

```bash
npm logout
npm login --auth-type=legacy
# Username: your npm username
# Password: paste the TOKEN (not your npm password)
# Email: your npm email
```
</details>

#### Option B — Use Google Authenticator (2 min install)

1. Install **Google Authenticator** from App Store / Play Store (free)  
2. Open https://www.npmjs.com/settings/~/security  
3. **Enable 2FA** → choose **Authorization and writes**  
4. Scan QR code with the app  

Log in (browser opens — press ENTER, complete login once):

```bash
npm logout
npm login
```

Or avoid browser: `npm login --auth-type=legacy`  
When publishing, use `--otp=123456` from the app.

---

## Publish (every release)

### Step 1 — Build

```bash
cd /Users/shubhamsunny/Documents/Projects/npm-server-driven-ui
npx pnpm@9 install
npx pnpm@9 prepublish:check
```

### Step 2 — Publish all 3 packages

**If you used Option A (token):**

```bash
cd packages/core && npm publish --access public
cd ../antd && npm publish --access public
cd ../charts && npm publish --access public
```

**If you used Option B (authenticator app):**

```bash
cd packages/core && npm publish --access public --otp=123456
cd ../antd && npm publish --access public --otp=123456
cd ../charts && npm publish --access public --otp=123456
```

Replace `123456` with the code from Google Authenticator.

Done. Check: https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui

---

## Republish (update npm after code or README changes)

npm keeps the old version until you publish a **new** version number.

1. Bump `version` in `packages/core`, `packages/antd`, and `packages/charts` `package.json` (e.g. `1.0.1` → `1.0.2`)
2. Run `npx pnpm@9 prepublish:check`
3. Publish in order:

```bash
cd packages/core && npm publish --access public
cd ../antd && npm publish --access public
cd ../charts && npm publish --access public
```

4. Confirm on npm — version and README should update within a minute.

**Repo URL on npm** must match your real GitHub repo:  
https://github.com/ShubhamSahaniNitkkr/npm-server-driven-ui

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `E403` + "Two-factor authentication required" | Enable 2FA → **Authorization and writes** → use `--otp=` |
| `E402` / paywall | Use free org at npm.com/org/create |
| `403 Forbidden` on scope | Create org `shubhamsunnynitkkr` first |
| `You cannot publish over the previously published version` | Bump `version` in that package's `package.json` (e.g. `1.0.1`) |
| OTP invalid | Code expires every 30s — get a new one |

---

## After publishing

Users install with:

```bash
npm install @shubhamsunnynitkkr/server-driven-ui @shubhamsunnynitkkr/server-driven-ui-antd react react-dom antd
```
