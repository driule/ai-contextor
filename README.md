# ai-contextor

> Keep your AI documentation fresh and in sync with code changes.

[![npm version](https://img.shields.io/npm/v/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![npm downloads](https://img.shields.io/npm/dm/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

📦 **npm package**: [ai-contextor](https://www.npmjs.com/package/ai-contextor)

Check documentation freshness for AI assistant projects. Automatically detects when documentation needs updates after code changes. Non-intrusive, git-aware, and highly configurable.

---

## 🚀 Quick Start

### Step 1: Installation

Install as a development dependency:

```bash
npm install --save-dev ai-contextor
```

Or use it directly with npx (no installation needed):

```bash
npx ai-contextor
```

### Step 2: Initialize Documentation

Generate initial documentation structure for your project:

```bash
npx contextor init
```

This command will:
- 🔍 Analyze your project structure
- 📊 Detect project type (frontend, backend, fullstack, library, etc.)
- 🛠️ Identify frameworks and technologies
- 📄 Create `.ai/INIT.md` with project context for AI assistants

**Example output:**
```
🔍 Analyzing project structure...

✅ Documentation initialized!

📄 Created: .ai/INIT.md

📊 Project Type: frontend
🛠️  Frameworks: React, Next.js
💻 Languages: TypeScript, JavaScript, CSS

💡 Review and customize .ai/INIT.md as needed.
```

### Step 3: Configure (Optional)

Create `.contextor.config.js` in your project root to customize behavior:

```javascript
module.exports = {
  // Documentation directory
  docsDir: ".ai",
  
  // Source directories to monitor
  sourceDirs: ["src"],
  
  // Mapping: source files → documentation files
  mappings: {
    "src/app.ts": [".ai/architecture/system-overview.md"],
    "src/services/**/*.ts": [".ai/architecture/components.md"],
  },
  
  // Cache file location (default: .ai/docs-check-cache.json)
  cacheFile: ".ai/docs-check-cache.json",
  
  // Check settings
  check: {
    lastUpdated: true,  // Check "Last Updated" dates
    version: true,       // Check version numbers
    links: true,         // Check broken links
    structure: true,     // Check required sections
  },
};
```

### Step 4: Check Documentation

Run the checker to verify documentation freshness:

```bash
# Basic check
npx contextor

# Force check (ignore cache)
npx contextor --force

# Quiet mode (minimal output)
npx contextor --quiet
```

---

## 📖 Features

- ✅ **Smart Project Analysis** - Automatically detects project type and tech stack
- ✅ **Documentation Initialization** - Generates `.ai/INIT.md` with project context
- ✅ **Freshness Checking** - Detects outdated documentation
- ✅ **Git Integration** - Only checks when code changes
- ✅ **Link Validation** - Checks for broken internal links
- ✅ **Structure Validation** - Ensures required sections exist
- ✅ **Smart Caching** - Avoids redundant checks
- ✅ **Configurable** - Works with any project structure

---

## 📝 Usage Guide

### Initializing Documentation

The `init` command analyzes your project and creates a comprehensive `INIT.md` file:

```bash
npx contextor init
```

**What it does:**
- Scans project structure (directories, files, dependencies)
- Detects project type (frontend/backend/fullstack/library/monorepo)
- Identifies frameworks (React, Vue, Express, NestJS, etc.)
- Detects build tools (Webpack, Vite, etc.)
- Identifies test frameworks (Jest, Vitest, Cypress, etc.)
- Generates `.ai/INIT.md` with:
  - Project overview and type
  - Technology stack
  - Project structure explanation
  - Development workflow
  - Documentation guidelines
  - AI assistant instructions

### Checking Documentation Freshness

Run the checker to ensure documentation stays up-to-date:

```bash
# Standard check
npx contextor

# Force check (bypass cache)
npx contextor --force
npx contextor -f

# Quiet mode
npx contextor --quiet
npx contextor -q
```

**What it checks:**
- Whether source files were modified after documentation
- Missing "Last Updated" dates
- Broken internal links
- Required documentation sections
- Documentation structure compliance

### Configuration

Copy `.contextor.config.js.example` to `.contextor.config.js` and customize:

```bash
cp .contextor.config.js.example .contextor.config.js
```

Key configuration options:
- `docsDir` - Documentation directory (default: `.ai`)
- `sourceDirs` - Directories to monitor for changes
- `mappings` - Map source files to documentation files
- `cacheFile` - Cache file location
- `check.*` - Enable/disable specific checks

---

## 🎯 Common Workflows

### New Project Setup

```bash
# 1. Install
npm install --save-dev ai-contextor

# 2. Initialize documentation
npx contextor init

# 3. Review and customize .ai/INIT.md

# 4. Add to package.json scripts
# "scripts": {
#   "docs:check": "contextor"
# }

# 5. Run checks
npm run docs:check
```

### Existing Project

```bash
# 1. Initialize documentation
npx contextor init

# 2. Configure mappings in .contextor.config.js
# 3. Create documentation files in .ai/ directory
# 4. Run checks regularly
npx contextor
```

### CI/CD Integration

Add to your CI pipeline:

```yaml
# GitHub Actions example
- name: Check documentation freshness
  run: npx contextor
```

---

## 📁 Project Structure

After initialization, your project will have:

```
your-project/
├── .ai/
│   ├── INIT.md              # Generated project context
│   └── docs-check-cache.json # Cache file (gitignored)
├── .contextor.config.js     # Configuration (optional)
└── ...
```

---

## 🔧 CLI Commands

| Command | Description |
|---------|-------------|
| `npx contextor` | Check documentation freshness |
| `npx contextor init` | Initialize documentation structure |
| `npx contextor --force` | Force check (ignore cache) |
| `npx contextor --quiet` | Quiet mode (minimal output) |

---

## 📚 Documentation Structure

Documentation files in `.ai/` directory should follow this structure:

```markdown
# Document Title

**Last Updated**: YYYY-MM-DD
**Version**: 1.0.0

## Overview
Brief description...

## Details
Main content...

## 🔗 Related Documentation
- [Link to related doc](./other-doc.md)
```

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

---

## 📄 License

MIT © [Andrius](https://github.com/driule)

---

**Status**: 🚧 Early Development
