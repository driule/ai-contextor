# Quick Start: Publishing to npm

> **TL;DR**: You don't need an organization. Just create an npm account and run `npm publish`.

---

## 🚀 3 Simple Steps

### 1. Create npm Account (if needed)

- Go to [npmjs.com/signup](https://www.npmjs.com/signup)
- Sign up with GitHub (easiest) or email
- **Verify your email** (check inbox)
- Enable 2FA (recommended)

**❓ Do I need an organization?**

- **NO!** Individual account is enough for `ai-contextor`
- Organization only needed for scoped packages (`@org/name`)

---

### 2. Login via CLI

```bash
npm login
```

Enter your:

- Username
- Password
- Email (if prompted)
- OTP (if 2FA enabled)

Verify:

```bash
npm whoami
```

---

### 3. Publish

```bash
cd /Users/andrius-j/src/ai-contextor
npm publish
```

**That's it!** The package will appear at:

```
https://www.npmjs.com/package/ai-contextor
```

---

## ❓ FAQ

**Q: Where do I create the package on npmjs.com?**  
A: You don't! It's created automatically when you run `npm publish`.

**Q: Do I need an organization?**  
A: No, only for scoped packages. `ai-contextor` is unscoped, so individual account is fine.

**Q: What if the name is taken?**  
A: Check with `npm view ai-contextor`. If 404, it's available ✅

**Q: Can I unpublish later?**  
A: Yes, but there are restrictions. Better to use versioning.

---

## ✅ Pre-Publish Checklist

- [ ] npm account created
- [ ] Email verified
- [ ] Logged in: `npm whoami` works
- [ ] Package name available: `npm view ai-contextor` returns 404
- [ ] `package.json` has all required fields
- [ ] Tested locally: `npm pack --dry-run`

---

**See [PUBLISHING.md](./PUBLISHING.md) for detailed guide.**
