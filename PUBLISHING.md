# Publishing Guide - ai-contextor

> **Purpose**: Step-by-step guide for publishing `ai-contextor` to npm registry.

---

## 📋 Pre-Publishing Checklist

### 1. ✅ npm Account Setup

**❓ Do I need to create an organization?**

**NO!** For unscoped packages (like `ai-contextor`), you **don't need an organization**. You can publish as an individual user.

**Organization is only needed if**:

- You want to use scoped packages: `@your-org/package-name`
- You need team collaboration features
- You want to manage multiple packages under one scope

**For `ai-contextor`**: No organization needed ✅

---

**❓ Where do I create the package on npmjs.com?**

**You DON'T create it on the website!** The package is created automatically when you run `npm publish`. You just need:

1. npm account (individual account is fine)
2. Verified email
3. Login via CLI: `npm login`

---

**Create npm account** (if you don't have one):

1. Go to [npmjs.com](https://www.npmjs.com/signup)
2. Sign up with **email** or **GitHub** (GitHub is easier)
3. **Verify your email** (required for publishing)
4. Enable 2FA (Two-Factor Authentication) - **highly recommended**

**Login to npm**:

```bash
npm login
```

You'll be prompted for:

- Username
- Password
- Email (if not already verified)
- OTP (if 2FA enabled)

**Verify login**:

```bash
npm whoami
```

Should display your npm username.

---

### 2. ✅ Package Name Availability

**Check if name is available**:

```bash
npm search ai-contextor
npm view ai-contextor
```

**Expected result**: `404 Not Found` or `npm ERR! 404` means the name is available ✅

**If name is taken**:

- Use scoped package: `@driule/ai-contextor`
- Or choose different name

---

### 3. ✅ Package.json Requirements

**Required fields** (already set ✅):

- ✅ `name`: `ai-contextor`
- ✅ `version`: `0.1.0` (follows semver)
- ✅ `description`: Clear description
- ✅ `main`: Entry point file
- ✅ `license`: `MIT`
- ✅ `repository`: GitHub URL
- ✅ `author`: Should be filled (see below)

**Recommended fields**:

- ✅ `keywords`: SEO-friendly keywords
- ✅ `bin`: CLI commands
- ✅ `files`: What to include in package
- ✅ `engines`: Node.js version requirement

**⚠️ Missing/To Fix**:

- ⚠️ `author`: Should include your name/email
- ⚠️ `version`: Consider starting with `0.1.0` (already set ✅)

---

### 4. ✅ Package Content

**Files to include** (defined in `package.json` → `files`):

- ✅ `src/` - Source code
- ✅ `bin/` - CLI executables
- ✅ `config/` - Default config
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - License file

**Files excluded** (via `.npmignore`):

- ✅ `.git/` - Git files
- ✅ `tests/` - Test files (for now)
- ✅ `.env` - Environment files
- ✅ Development files

**Verify what will be published**:

```bash
npm pack --dry-run
```

This shows what files will be included without actually creating the tarball.

---

### 5. ✅ Code Quality

**Before publishing**:

- [ ] Code is functional (at least basic structure)
- [ ] README.md is complete
- [ ] LICENSE file exists
- [ ] No sensitive data (API keys, passwords)
- [ ] No large unnecessary files
- [ ] `.npmignore` is configured correctly

---

## 🚀 Publishing Steps

### Step 1: Final Checks

```bash
cd /Users/andrius-j/src/ai-contextor

# Check package.json
npm run lint  # If configured

# Verify what will be published
npm pack --dry-run

# Check package name availability
npm view ai-contextor
```

### Step 2: Update package.json (if needed)

Add author information:

```json
{
  "author": "Your Name <your.email@example.com>",
  // or
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "url": "https://github.com/driule"
  }
}
```

### Step 3: Login to npm

```bash
npm login
```

### Step 4: Publish

**For `ai-contextor` (unscoped package)**:

```bash
npm publish
```

That's it! The package will be created automatically on npmjs.com.

**Note**: If you were using a scoped package like `@driule/ai-contextor`, you would need:

```bash
npm publish --access public
```

But since `ai-contextor` is unscoped, just use `npm publish`.

### Step 5: Verify Publication

1. **Check npm website**:

   ```
   https://www.npmjs.com/package/ai-contextor
   ```

2. **Test installation**:
   ```bash
   npm install ai-contextor
   npx contextor
   ```

---

## 🔄 Updating Published Package

### Version Bumping

Follow [Semantic Versioning](https://semver.org/):

- **Patch** (`0.1.0` → `0.1.1`): Bug fixes
- **Minor** (`0.1.0` → `0.2.0`): New features (backward compatible)
- **Major** (`0.1.0` → `1.0.0`): Breaking changes

**Update version**:

```bash
# Manual edit in package.json
# Or use npm version command:
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

**Publish update**:

```bash
npm publish
```

---

## ⚠️ Common Issues

### Issue: "Package name already exists"

**Solution**:

- Use scoped package: `@driule/ai-contextor`
- Or choose different name

### Issue: "Email not verified"

**Solution**:

- Check email inbox
- Verify email on npmjs.com
- Re-login: `npm login`

### Issue: "2FA required"

**Solution**:

- Enable 2FA on npmjs.com
- Use OTP when logging in

### Issue: "Incorrect package.json"

**Solution**:

- Check all required fields
- Validate JSON syntax
- Run `npm pack --dry-run` to check

---

## 📝 Post-Publishing

### 1. Update GitHub Repository

- Add npm badge to README
- Link to npm package
- Update description

### 2. Create Release

```bash
git tag v0.1.0
git push origin v0.1.0
```

### 3. Monitor

- Check npm download stats
- Monitor issues on GitHub
- Update documentation as needed

---

## 🔐 Security Best Practices

1. **Never commit**:

   - `.npmrc` with tokens
   - API keys
   - Passwords
   - Personal information

2. **Use `.npmignore`**:

   - Exclude unnecessary files
   - Exclude sensitive data

3. **Enable 2FA**:
   - Protect your npm account
   - Required for some operations

---

## 📚 Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Package Name Guidelines](https://docs.npmjs.com/package-name-guidelines)
- [Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0
