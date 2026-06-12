# Publishing to npm

## Packages

| Package | npm name |
|---------|----------|
| Core | `@shubhamsunnynitkkr/server-driven-ui` |
| Ant Design UI | `@shubhamsunnynitkkr/server-driven-ui-antd` |
| Charts | `@shubhamsunnynitkkr/server-driven-ui-charts` |

## Before you publish

1. Create an npm account: https://www.npmjs.com/signup
2. Create the `@shubhamsunnynitkkr` org/scope on npm
3. Log in: `npm login`
4. Run checks: `pnpm prepublish:check`

## Publish order (core first)

```bash
pnpm build
pnpm test:coverage

cd packages/core && npm publish --access public
cd ../antd && npm publish --access public
cd ../charts && npm publish --access public
```

Bump `version` in each `package.json` before each release.

## After publishing

Users install with:

```bash
npm install @shubhamsunnynitkkr/server-driven-ui @shubhamsunnynitkkr/server-driven-ui-antd react react-dom antd
```
