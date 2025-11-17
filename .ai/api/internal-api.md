# Internal API

**Last Updated**: 2025-11-17
**Version**: 0.4.0

## Overview

Internal API documentation for library maintainers and contributors. These APIs are not part of the public interface and may change without notice.

## Internal Modules

### DocChecker (`src/checker.js`)

Core documentation checking logic.

**Class:** `DocChecker`

**Key Methods:**
- `hasCodeChanged()` - Check if code changed since last check
- `checkDocFreshness()` - Check documentation freshness
- `checkDocForSource()` - Check specific source file documentation
- `checkAllDocFiles()` - Check all documentation files
- `checkLinks()` - Validate internal links
- `run()` - Run all checks

**Usage:**
```javascript
const { DocChecker } = require('./checker');
const checker = new DocChecker({
  projectRoot: process.cwd(),
  config: {...},
  force: false,
  quiet: false
});
const result = checker.run();
```

### ProjectAnalyzer (`src/analyzer.js`)

Project structure and type analysis.

**Class:** `ProjectAnalyzer`

**Key Methods:**
- `analyze()` - Full project analysis
- `detectGit()` - Detect Git repository
- `analyzePackageJson()` - Analyze package.json
- `analyzeDirectoryStructure()` - Analyze directory structure
- `analyzeLanguages()` - Detect programming languages
- `detectProjectType()` - Determine project type

**Returns:**
```javascript
{
  type: 'frontend' | 'backend' | 'fullstack' | 'library' | 'monorepo',
  frameworks: ['React', 'Express', ...],
  languages: ['JavaScript', 'TypeScript', ...],
  buildTools: ['Vite', 'Webpack', ...],
  testFrameworks: ['Jest', 'Vitest', ...],
  keyDirs: ['src', 'lib', ...],
  keyFiles: ['package.json', 'tsconfig.json', ...]
}
```

### DocumentationGenerator (`src/generator.js`)

Generates INIT.md and documentation structure.

**Class:** `DocumentationGenerator`

**Key Methods:**
- `generate()` - Generate documentation structure and INIT.md

### StructureGenerator (`src/structure.js`)

Generates documentation directory structure.

**Class:** `StructureGenerator`

**Key Methods:**
- `generate()` - Generate structure based on project type
- `generateReadme()` - Generate .ai/README.md
- `generateGitignore()` - Generate .ai/.gitignore
- `generateDevStructure()` - Generate dev/ directory

### TaskGenerator (`src/task.js`)

Creates development task directories.

**Class:** `TaskGenerator`

**Key Methods:**
- `createTask(description)` - Create new task directory
- `getNextTaskNumber()` - Get next available task number

### TaskIntegrator (`src/integrator.js`)

Integrates task documentation into main docs.

**Class:** `TaskIntegrator`

**Key Methods:**
- `integrate(tasks, options)` - Integrate task documentation
- `generateDrafts()` - Generate draft documentation
- `readTaskInfo()` - Read task information
- `getChangedFiles()` - Get changed files from Git
- `updateDocumentation()` - Update/create documentation

### Utility Modules

**Parser (`src/parser.js`):**
- `getFileModTime()` - Get file modification time
- `getLastUpdatedDate()` - Extract date from markdown
- `getAllDocFiles()` - Find all documentation files

**Cache (`src/cache.js`):**
- `loadCache()` - Load cache from file
- `saveCache()` - Save cache to file
- `getCachePath()` - Get cache file path

**Git (`src/git.js`):**
- `getCurrentGitHash()` - Get current Git commit hash
- `hasRecentChanges()` - Check for recent changes
- `isGitRepo()` - Check if Git repository

## Internal Functions

These functions are used internally and not exported:

- Configuration merging logic
- Template generation functions
- File path resolution
- Date formatting utilities

## Implementation Details

### Configuration Loading

Configuration is merged in this order:
1. Default config (`config/default.config.js`)
2. Local config (`.contextor.config.js`)
3. Programmatic overrides

### Cache System

Cache is stored as JSON in `.ai/docs-check-cache.json`:
```json
{
  "lastCheck": "2025-11-17T...",
  "lastGitHash": "abc123...",
  "lastWarnings": 0,
  "lastErrors": 0
}
```

### Git Integration

Uses `git status --porcelain` and `git rev-parse HEAD` for change detection. Falls back gracefully if Git is not available.

## 🔗 Related Documentation
- [Public API](./public-api.md)
- [System Overview](../architecture/system-overview.md)
