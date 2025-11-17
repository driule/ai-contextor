# API Design

**Last Updated**: 2025-11-17
**Version**: 0.4.0

## Overview

AI Contextor provides both a CLI interface and a programmatic API for documentation management. The API is designed to be simple, flexible, and extensible.

## API Philosophy

### Public vs Internal APIs

**Public API** (`src/index.js`):
- `Contextor` class - Main entry point for programmatic usage
- `check()` method - Run documentation checks
- `loadConfig()` method - Configuration management

**Internal APIs** (other modules):
- `DocChecker` - Core checking logic
- `ProjectAnalyzer` - Project analysis
- `DocumentationGenerator` - Documentation generation
- `StructureGenerator` - Structure generation
- `TaskGenerator` - Task management
- `TaskIntegrator` - Task integration

### Design Principles

1. **Simple and Intuitive**: Easy to use for common cases
2. **Configurable**: Extensive configuration options for advanced use
3. **Composable**: Internal modules can be used independently
4. **Non-Breaking**: Changes maintain backward compatibility where possible

### API Layers

```
CLI (bin/contextor.js)
  ↓
Public API (Contextor class)
  ↓
Core Logic (DocChecker, Analyzer, Generator, etc.)
  ↓
Utilities (Parser, Cache, Git)
```

## Versioning Strategy

- **Semantic Versioning**: Follows semver (MAJOR.MINOR.PATCH)
- **Current Version**: 0.4.0 (pre-1.0, API may change)
- **Breaking Changes**: Will increment MAJOR version
- **New Features**: Will increment MINOR version
- **Bug Fixes**: Will increment PATCH version

## Configuration API

Configuration is loaded in this order:
1. Default configuration (`config/default.config.js`)
2. Project configuration (`.contextor.config.js`)
3. Programmatic overrides (constructor/config parameter)

## Extension Points

- **Custom Checkers**: Can extend `DocChecker` class
- **Custom Analyzers**: Can extend `ProjectAnalyzer` class
- **Custom Generators**: Can extend `DocumentationGenerator` class
- **Configuration**: Fully configurable via `.contextor.config.js`

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Public API](../api/public-api.md)
- [Internal API](../api/internal-api.md)
