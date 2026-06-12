# Publishing to npm

## Packages

| Package | npm name |
|---------|----------|
| Core | `@shubhamsunnynitkkr/server-driven-ui` |
| Ant Design UI | `@shubhamsunnynitkkr/server-driven-ui-antd` |
| Charts | `@shubhamsunnynitkkr/server-driven-ui-charts` |

## Before you publish

1. Create an npm account: https://www.npmjs.com/signup
2. Create the `@shubhamsunnynitkkr` scope: https://www.npmjs.com/org/create
3. **Enable 2FA** (required — without this publish fails with E403)
4. Run checks:

```bash
npx pnpm@9 install
npx pnpm@9 prepublish:check
```

---

## Fix E403: "Two-factor authentication required"

npm **blocks all publishes** without 2FA. Do this once:

### Step 1 — Enable 2FA on npm

1. Open https://www.npmjs.com/settings/~/security
2. Click **Enable 2FA**
3. Choose **Authorization and writes** (not "authorization only")
4. Scan QR code with Google Authenticator / Authy
5. Save your recovery codes

### Step 2 — Log in again in terminal

```bash
npm logout
npm login
```

Enter username, password, email, then the **6-digit OTP** from your authenticator app.

### Step 3 — Publish with OTP

When you publish, npm asks for OTP again. Either:

**Option A** — wait for prompt:
```bash
cd packages/core
npm publish --access public
# Enter OTP when prompted
```

**Option B** — pass OTP directly:
```bash
npm publish --access public --otp=123456
```
Replace `123456` with the current code from your authenticator app.

---

## Publish order (core first)

```bash
npx pnpm@9 build
npx pnpm@9 test:coverage

cd packages/core && npm publish --access public --otp=YOUR_CODE
cd ../antd && npm publish --access public --otp=YOUR_CODE
cd ../charts && npm publish --access public --otp=YOUR_CODE
```

Bump `version` in each `package.json` before each release.

---

## Alternative: Granular access token

If `npm login` keeps failing:

1. Go to https://www.npmjs.com/settings/~/tokens
2. **Generate New Token** → **Granular Access Token**
3. Permissions: **Read and write** on packages
4. Enable **Bypass 2FA for automation** (if available)
5. Log in using the token as password:

```bash
npm logout
npm login
# Username: your-npm-username
# Password: paste the token (not your npm password)
# Email: your email
```

Then publish as above.

---

## After publishing

Users install with:

```bash
npm install @shubhamsunnynitkkr/server-driven-ui @shubhamsunnynitkkr/server-driven-ui-antd react react-dom antd
```

With charts:

```bash
npm install @shubhamsunnynitkkr/server-driven-ui-charts recharts
```

Verify live package: https://www.npmjs.com/package/@shubhamsunnynitkkr/server-driven-ui
