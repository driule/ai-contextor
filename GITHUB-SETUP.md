# GitHub Repository Setup - Link npm Package

> **Purpose**: How to make GitHub repository show the linked npm package.

---

## 🎯 Goal

Make GitHub repository display the npm package link in the "Packages" section or sidebar.

---

## ✅ What's Already Done

1. ✅ `package.json` has correct `repository` field
2. ✅ `package.json` has `homepage` and `bugs` URLs
3. ✅ README.md has npm badge and link

---

## 🔧 Steps to Link npm Package on GitHub

### Option 1: Add Package Topic (Recommended)

1. Go to your GitHub repository: https://github.com/driule/ai-contextor
2. Click on the gear icon ⚙️ next to "About" section (top right of README)
3. In the "Topics" field, add:
   - `npm-package`
   - `nodejs`
   - `cli-tool`
   - `documentation`
4. Save changes

**Note**: This helps GitHub categorize your repo and may show package info.

---

### Option 2: GitHub Packages (Advanced)

If you want to use GitHub Packages instead of npm registry:

1. Go to repository Settings → Packages
2. Enable GitHub Packages
3. Publish package to GitHub Packages registry

**Note**: This is more complex and not necessary if you're using npm registry.

---

### Option 3: Add Package Link in README (Already Done ✅)

The README.md already includes:
- npm badge
- npm package link
- Installation instructions

This is the simplest and most visible way.

---

## 🔍 Verify Connection

After publishing to npm with correct `package.json`:

1. **Check npmjs.com**:
   - Go to: https://www.npmjs.com/package/ai-contextor
   - Should show "Repository" link to GitHub ✅

2. **Check GitHub**:
   - Go to: https://github.com/driule/ai-contextor
   - README should show npm badge and link ✅
   - Repository sidebar may show package info (if GitHub detects it)

---

## 📝 Current Status

- ✅ npm package published: https://www.npmjs.com/package/ai-contextor
- ✅ GitHub repo: https://github.com/driule/ai-contextor
- ✅ package.json has repository field
- ✅ README.md has npm link

**GitHub may automatically detect the connection** based on:
- `package.json` repository field
- npm package metadata
- Repository topics

---

## 🎨 Recommended: Add Topics

To help GitHub better categorize and link your package:

1. Go to: https://github.com/driule/ai-contextor
2. Click ⚙️ next to "About"
3. Add topics:
   ```
   npm-package
   nodejs
   cli-tool
   documentation
   ai-assistant
   documentation-checker
   ```

---

## 🔗 Manual Link (If Needed)

If GitHub doesn't automatically show the package link:

1. Go to repository Settings
2. Scroll to "Packages" section
3. If available, link npm package manually

**Note**: GitHub usually auto-detects based on `package.json` repository field.

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0

