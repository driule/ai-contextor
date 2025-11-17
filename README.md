# ai-contextor

> Keep your AI documentation fresh and in sync with code changes.

[![npm version](https://img.shields.io/npm/v/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![npm downloads](https://img.shields.io/npm/dm/ai-contextor.svg)](https://www.npmjs.com/package/ai-contextor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/driule/ai-contextor.svg?style=social)](https://github.com/driule/ai-contextor)

📦 **npm package**: [ai-contextor](https://www.npmjs.com/package/ai-contextor)  
⭐ **Star us on GitHub**: [driule/ai-contextor](https://github.com/driule/ai-contextor)  
💝 **Support this project**: [GitHub Sponsors](https://github.com/sponsors/driule)

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

### Step 5: Development Task Workflow (Optional)

Use the task system for managing development documentation:

```bash
# 1. Create a new task
npx contextor task:new "Add user authentication"

# 2. Develop and document in .ai/dev/task-0/ folder
#    - Edit requirements.md
#    - Add notes to notes.md
#    - Document implementation in implementation.md

# 3. Generate documentation drafts
npx contextor 0

# 4. AI assistant reviews and improves drafts
#    - Review .ai/dev/task-0/doc-integration-*.md files
#    - Follow instructions in DOC-INTEGRATION.md

# 5. Integrate improved documentation
npx contextor 0 --integrate

# 6. Commit documentation updates
git add .ai/
git commit -m "Update documentation for user authentication"
```

---

## 📖 Features

- ✅ **Smart Project Analysis** - Automatically detects project type and tech stack
- ✅ **Documentation Initialization** - Generates `.ai/INIT.md` with project context
- ✅ **Development Task System** - Manage temporary task documentation with integration workflow
- ✅ **Freshness Checking** - Detects outdated documentation
- ✅ **Git Integration** - Only checks when code changes
- ✅ **Link Validation** - Checks for broken internal links
- ✅ **Structure Validation** - Ensures required sections exist
- ✅ **Smart Caching** - Avoids redundant checks
- ✅ **Safe Defaults** - Won't overwrite existing documentation unless forced
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

### Development Task Management

Manage temporary development documentation with the task system:

**1. Create a new task:**
```bash
npx contextor task:new "Add user authentication"
```

This creates `.ai/dev/task-0/` with:
- `README.md` - Task overview and status
- `requirements.md` - Detailed requirements template
- `notes.md` - Development notes template
- `implementation.md` - Implementation details template

**2. Generate documentation drafts:**
```bash
# After committing code changes
npx contextor 0
```

This generates:
- `doc-integration-*.md` - Draft documentation files
- `DOC-INTEGRATION.md` - Instructions for AI assistant

**3. Integrate improved drafts:**
```bash
# After AI assistant improves drafts
npx contextor 0 --integrate
```

This integrates the improved drafts into main documentation (`.ai/` directory).

**Task workflow:**
1. Create task → Develop → Document in task folder
2. Commit code → Generate drafts
3. AI assistant improves drafts
4. Integrate → Commit documentation

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
│   ├── INIT.md                      # Generated project context
│   ├── README.md                    # Documentation framework overview
│   ├── architecture/                # Architecture documentation
│   ├── api/                         # API documentation
│   ├── examples/                    # Usage examples
│   ├── dev/                         # Development tasks (gitignored)
│   │   ├── README.md                # Task system documentation
│   │   └── task-N/                  # Individual task directories
│   └── docs-check-cache.json        # Cache file (gitignored)
├── .contextor.config.js             # Configuration (optional)
└── ...
```

**Note:** The `.ai/dev/` directory is gitignored and contains temporary task documentation.

---

## 🔧 CLI Commands

### Core Commands

| Command | Description |
|---------|-------------|
| `npx contextor` | Check documentation freshness (default) |
| `npx contextor init` | Initialize documentation structure |
| `npx contextor init --force` | Initialize and overwrite existing INIT.md |
| `npx contextor task:new "description"` | Create a new development task directory |
| `npx contextor <task-list>` | Generate documentation drafts for tasks |
| `npx contextor <task-list> --integrate` | Integrate improved drafts into main docs |
| `npx contextor --help` | Show help message |
| `npx contextor --version` | Show version number |

### Options

| Option | Description |
|--------|-------------|
| `--force`, `-f` | Force mode (overwrite INIT.md or ignore cache) |
| `--quiet`, `-q` | Quiet mode (minimal output) |

### Examples

```bash
# Initialize documentation
npx contextor init

# Initialize and overwrite existing INIT.md
npx contextor init --force

# Create a new task
npx contextor task:new "Add user authentication"

# Generate drafts for task-0
npx contextor 0
# or
npx contextor task-0

# Generate drafts for multiple tasks
npx contextor 0,1,2
# or
npx contextor task-0,task-1,task-2

# Integrate improved drafts
npx contextor 0 --integrate

# Check documentation freshness
npx contextor

# Force check (ignore cache)
npx contextor --force

# Quiet mode
npx contextor --quiet
```

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

Contributions welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

---

## 💝 Support & Sponsorship

This project is open source and free to use. If you find it helpful, please consider:

- ⭐ **Starring** the repository on GitHub
- 🐛 **Reporting** bugs and issues
- 💬 **Sharing** with your team and community
- 💝 **Sponsoring** the project to support continued development

### GitHub Sponsors

Support this project through [GitHub Sponsors](https://github.com/sponsors/driule). Your sponsorship helps:

- 🚀 Maintain and improve the project
- 🐛 Fix bugs faster
- ✨ Add new features
- 📚 Create better documentation

**Sponsorship Tiers:**
- 🤖 **Assistant** ($5/month) - Thank you! Your name in README supporters list
- 🚀 **Navigator** ($15/month) - Priority support + your name in README
- ⚡ **Architect** ($50/month) - All above + feature requests priority
- 🌟 **Context Master** ($200/month) - All above + custom features consultation

*Note: GitHub Sponsors is free - GitHub doesn't take any fees for personal accounts!*

### Other Ways to Support

- 💼 **Hire me** for consulting or custom development
- 📧 **Contact**: [GitHub Profile](https://github.com/driule)

---

## 📄 License

MIT © [Andrius](https://github.com/driule)

---

## 📦 Version

Current version: **0.5.4**

**Status**: 🚧 Beta - Ready for use, but still in active development

### What's New in v0.5.0

- ✨ **Safe init behavior** - INIT.md is now skipped if exists (prevents overwriting custom docs)
- ✨ **--force flag** - Allows overwriting INIT.md when needed
- 🔧 **Refactored generator** - Improved code maintainability and extensibility
- 📚 **Task system** - Complete development task workflow with draft generation and integration

### Roadmap

- [ ] Unit tests and test coverage
- [ ] CI/CD pipeline
- [ ] TypeScript definitions
- [ ] More project type templates
- [ ] Enhanced error messages
