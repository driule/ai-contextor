# Public API

**Last Updated**: 2025-11-17
**Version**: 0.4.0

## Overview

Public API for programmatic usage of AI Contextor. The main entry point is the `Contextor` class exported from `src/index.js`.

## Main Exports

### Contextor Class

```javascript
const { Contextor } = require('ai-contextor');
```

#### Constructor

```javascript
new Contextor(config = {})
```

Creates a new Contextor instance.

**Parameters:**
- `config` (Object, optional) - Configuration overrides

**Example:**
```javascript
const contextor = new Contextor({
  docsDir: '.ai',
  sourceDirs: ['src', 'lib']
});
```

#### Methods

##### `async check(options = {})`

Runs documentation freshness checks.

**Parameters:**
- `options.force` (Boolean) - Force check, ignore cache
- `options.quiet` (Boolean) - Quiet mode, minimal output

**Returns:**
```javascript
{
  errors: Number,      // Number of errors found
  warnings: Number,    // Number of warnings found
  needsUpdate: Boolean // Whether documentation needs updates
}
```

**Example:**
```javascript
const result = await contextor.check({ force: true });
if (result.needsUpdate) {
  console.log('Documentation needs updates!');
}
```

##### `loadConfig(overrides = {})`

Loads and merges configuration.

**Parameters:**
- `overrides` (Object) - Configuration overrides

**Returns:** Merged configuration object

**Example:**
```javascript
const config = contextor.loadConfig({
  cacheFile: '.custom-cache.json'
});
```

## Usage Examples

### Basic Usage

```javascript
const { Contextor } = require('ai-contextor');

async function checkDocs() {
  const contextor = new Contextor();
  const result = await contextor.check();
  
  if (result.errors > 0) {
    console.error('Documentation has errors!');
    process.exit(1);
  }
  
  console.log('All checks passed!');
}

checkDocs();
```

### Custom Configuration

```javascript
const { Contextor } = require('ai-contextor');

const contextor = new Contextor({
  docsDir: '.ai',
  sourceDirs: ['src', 'lib'],
  mappings: {
    'src/app.js': ['.ai/architecture/system-overview.md'],
    'src/api/**/*.js': ['.ai/api/endpoints.md']
  },
  check: {
    lastUpdated: true,
    links: true,
    structure: true
  }
});

const result = await contextor.check({ force: true });
```

### Integration with Build Tools

```javascript
// In your build script
const { Contextor } = require('ai-contextor');

async function build() {
  // ... build steps ...
  
  // Check documentation
  const contextor = new Contextor();
  const result = await contextor.check({ quiet: true });
  
  if (result.errors > 0) {
    throw new Error('Documentation check failed');
  }
}
```

## Best Practices

1. **Use Configuration File**: Prefer `.contextor.config.js` over programmatic config
2. **Handle Errors**: Always check `result.errors` and `result.needsUpdate`
3. **Use Quiet Mode**: In CI/CD, use `quiet: true` to reduce output
4. **Cache Awareness**: Use `force: true` only when needed (slower)

## 🔗 Related Documentation
- [API Design](../architecture/api-design.md)
- [Usage Examples](../examples/usage-examples.md)
- [Internal API](./internal-api.md)
