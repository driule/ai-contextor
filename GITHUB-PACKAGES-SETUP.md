# GitHub Packages Setup

> **Purpose**: How to publish package to GitHub Packages registry so it shows in the "Packages" section.

---

## 🎯 Goal

Make the "Packages" section on GitHub show your package by publishing to GitHub Packages registry.

**Note**: You can publish to BOTH npm and GitHub Packages - they're separate registries.

---

## 📋 Prerequisites

1. ✅ npm package already published: https://www.npmjs.com/package/ai-contextor
2. ✅ GitHub repository: https://github.com/driule/ai-contextor
3. ✅ GitHub Personal Access Token with `write:packages` permission

---

## 🔧 Step-by-Step Guide

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `ai-contextor-packages`
4. Select scopes:
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `delete:packages` (optional)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

---

### Step 2: Configure npm for GitHub Packages

**Option A: Use .npmrc file (Recommended)**

Create `.npmrc` file in project root:

```bash
cd /Users/andrius-j/src/ai-contextor
echo "@driule:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE" >> .npmrc
```

Replace `YOUR_TOKEN_HERE` with your actual token.

**Option B: Use npm login**

```bash
npm login --scope=@driule --registry=https://npm.pkg.github.com
```

Enter:

- Username: `driule`
- Password: `YOUR_TOKEN_HERE`
- Email: your GitHub email

---

### Step 3: Update package.json

Update package name to use GitHub scope:

```json
{
  "name": "@driule/ai-contextor",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**OR** keep both names (publish to both registries):

Keep current `package.json` for npm, create separate config for GitHub Packages.

---

### Step 4: Publish to GitHub Packages

```bash
cd /Users/andrius-j/src/ai-contextor
npm publish --registry=https://npm.pkg.github.com
```

---

## 🎯 Alternative: Publish to Both Registries

### Option 1: Manual (Two Commands)

```bash
# Publish to npm
npm publish

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### Option 2: Use GitHub Actions (Automated)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://registry.npmjs.org"
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}

  publish-github:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          registry-url: "https://npm.pkg.github.com"
          scope: "@driule"
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

---

## ⚠️ Important Notes

1. **Package Name**: GitHub Packages requires scoped packages (`@username/package-name`)
2. **Visibility**: Packages are private by default. To make public:
   - Go to package settings on GitHub
   - Change visibility to public
3. **Installation**: Users install with:
   ```bash
   npm install @driule/ai-contextor
   ```
4. **Two Packages**: You'll have:
   - `ai-contextor` on npm
   - `@driule/ai-contextor` on GitHub Packages

---

## 🔄 Recommended Approach

**Keep it simple**: Since you already have `ai-contextor` on npm, you can:

1. **Option A**: Just use npm (simpler, more users)

   - "Packages" section will show "No packages published"
   - But npm link is in README ✅

2. **Option B**: Publish to both (more complex)
   - Shows in GitHub "Packages" section ✅
   - But requires maintaining two packages

**Recommendation**: Option A is simpler. The npm link in README is sufficient for most users.

---

## 📝 Quick Setup (If You Want GitHub Packages)

```bash
# 1. Create token (see Step 1 above)

# 2. Login
npm login --scope=@driule --registry=https://npm.pkg.github.com

# 3. Update package.json name to @driule/ai-contextor

# 4. Publish
npm publish --registry=https://npm.pkg.github.com
```

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0
