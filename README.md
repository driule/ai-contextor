# ai-contextor

> Keep your AI documentation fresh and in sync with code changes.

[![npm version](https://img.shields.io/npm/v/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![npm downloads](https://img.shields.io/npm/dm/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📦 **npm package**: [ai-contextor](https://www.npmjs.com/package/ai-contextor)

Check documentation freshness for AI assistant projects. Automatically detects when documentation needs updates after code changes. Non-intrusive, git-aware, and highly configurable.

---

## 🚀 Quick Start

### Installation

```bash
npm install --save-dev ai-contextor
```

### Usage

```bash
# Check documentation freshness
npx contextor

# Or use npm script
npm run contextor
```

### Basic Configuration

Create `.contextor.config.js` in your project root:

```javascript
module.exports = {
  docsDir: ".ai",
  sourceDirs: ["src"],
  mappings: {
    "src/app.ts": [".ai/architecture/system-overview.md"],
    "src/services/**/*.ts": [".ai/architecture/components.md"],
  },
};
```

---

## 📖 Features

- ✅ **Freshness Checking** - Detects outdated documentation
- ✅ **Git Integration** - Only checks when code changes
- ✅ **Link Validation** - Checks for broken internal links
- ✅ **Structure Validation** - Ensures required sections exist
- ✅ **Smart Caching** - Avoids redundant checks
- ✅ **Configurable** - Works with any project structure

---

## 📝 Documentation

Full documentation coming soon. See [GitHub repository](https://github.com/driule/ai-contextor) for details.

## 📦 Installation

```bash
npm install --save-dev ai-contextor
```

Or use it directly with npx:

```bash
npx ai-contextor
```

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

---

## 📄 License

MIT © [Your Name]

---

**Status**: 🚧 Early Development
