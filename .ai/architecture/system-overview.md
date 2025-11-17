# System Overview

**Last Updated**: 2025-11-17
**Version**: 0.4.0

## Overview

AI Contextor is a CLI tool and library for managing AI assistant documentation. It provides automated documentation freshness checking, project structure analysis, and documentation generation for AI assistant projects.

## Library Structure

The library is organized into modular components:

### Core Modules (`src/`)

- **`index.js`** - Main entry point, `Contextor` class
  - Configuration loading and merging
  - Main API for programmatic usage
  
- **`checker.js`** - `DocChecker` class
  - Documentation freshness checking
  - Link validation
  - Structure validation
  - Cache management

- **`analyzer.js`** - `ProjectAnalyzer` class
  - Project type detection (frontend/backend/fullstack/library/monorepo)
  - Framework and technology detection
  - Language analysis
  - Structure analysis

- **`generator.js`** - `DocumentationGenerator` class
  - INIT.md generation
  - Project context documentation

- **`structure.js`** - `StructureGenerator` class
  - Documentation directory structure generation
  - Template-based file creation
  - Project-type-specific structures

- **`task.js`** - `TaskGenerator` class
  - Development task directory creation
  - Task documentation templates

- **`integrator.js`** - `TaskIntegrator` class
  - Task documentation integration
  - Draft generation
  - Documentation updates

- **`parser.js`** - Utility functions
  - File modification time extraction
  - Date parsing from markdown
  - Documentation file discovery

- **`cache.js`** - Cache management
  - Cache loading and saving
  - Cache path resolution

- **`git.js`** - Git integration
  - Git hash retrieval
  - Change detection

### Configuration (`config/`)

- **`default.config.js`** - Default configuration values

### CLI (`bin/`)

- **`contextor.js`** - CLI entry point
  - Command parsing
  - Command routing (init, task:new, check, etc.)

## Design Principles

### Modularity
- Each component has a single responsibility
- Clear separation between CLI and library code
- Easy to extend and test

### Configuration-Driven
- Default configuration with project-level overrides
- Flexible mapping system for source-to-documentation relationships
- Configurable check behaviors

### Git-Aware
- Integrates with Git for change detection
- Uses Git hashes for cache invalidation
- Respects Git repository structure

### Non-Intrusive
- Only reads and writes documentation files
- Never modifies source code
- Safe to run in CI/CD pipelines

## Architecture Decisions

1. **No External Dependencies**: Uses only Node.js built-in modules for portability
2. **File-Based Configuration**: Uses `.contextor.config.js` for project-specific settings
3. **Cache System**: Reduces redundant checks using JSON cache files
4. **Template-Based Generation**: Uses templates for consistent documentation structure
5. **Task-Based Workflow**: Supports development tasks with temporary documentation

## 🔗 Related Documentation
- [API Design](./api-design.md)
- [Public API](../api/public-api.md)
- [Internal API](../api/internal-api.md)
