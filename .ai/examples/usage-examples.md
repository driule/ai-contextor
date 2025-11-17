# Usage Examples

**Last Updated**: 2025-11-17
**Version**: 0.4.0

## Overview

Practical examples of using AI Contextor in various scenarios.

## CLI Usage Examples

### Basic Documentation Check

```bash
# Check documentation freshness
npx contextor

# Force check (ignore cache)
npx contextor --force

# Quiet mode
npx contextor --quiet
```

### Initialize Documentation

```bash
# Initialize documentation structure
npx contextor init

# Output:
# ✅ Documentation initialized!
# 📄 Created: .ai/INIT.md
# 📊 Project Type: frontend
# 🛠️  Frameworks: React, Next.js
```

### Task Management

```bash
# Create new task
npx contextor task:new "Add user authentication"

# Generate drafts for task
npx contextor 0

# Integrate improved drafts
npx contextor 0 --integrate
```

## Programmatic Usage Examples

### Basic Check

```javascript
const { Contextor } = require('ai-contextor');

async function main() {
  const contextor = new Contextor();
  const result = await contextor.check();
  
  console.log(`Errors: ${result.errors}`);
  console.log(`Warnings: ${result.warnings}`);
  
  if (result.needsUpdate) {
    console.log('Documentation needs updates!');
  }
}

main();
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
  cacheFile: '.ai/docs-check-cache.json',
  check: {
    lastUpdated: true,
    links: true,
    structure: true
  }
});

const result = await contextor.check({ force: true });
```

### CI/CD Integration

```javascript
// In your CI/CD pipeline
const { Contextor } = require('ai-contextor');

async function ciCheck() {
  const contextor = new Contextor();
  const result = await contextor.check({ quiet: true });
  
  if (result.errors > 0) {
    console.error('Documentation check failed!');
    process.exit(1);
  }
  
  console.log('Documentation check passed!');
}

ciCheck();
```

### Build Script Integration

```javascript
// In package.json scripts
const { Contextor } = require('ai-contextor');

async function build() {
  // ... your build steps ...
  
  // Check documentation
  const contextor = new Contextor();
  const result = await contextor.check({ quiet: true });
  
  if (result.errors > 0) {
    throw new Error('Documentation check failed');
  }
  
  console.log('Build completed successfully!');
}

build().catch(console.error);
```

## Workflow Examples

### Complete Development Workflow

```bash
# 1. Initialize project documentation
npx contextor init

# 2. Create task for new feature
npx contextor task:new "Add user authentication"

# 3. Develop feature and document in task folder
# ... edit .ai/dev/task-0/ files ...

# 4. Commit code changes
git add .
git commit -m "Add user authentication"

# 5. Generate documentation drafts
npx contextor 0

# 6. AI assistant improves drafts
# ... review and improve .ai/dev/task-0/doc-integration-*.md ...

# 7. Integrate improved documentation
npx contextor 0 --integrate

# 8. Commit documentation updates
git add .ai/
git commit -m "Update documentation for user authentication"
```

### Multiple Tasks Workflow

```bash
# Generate drafts for multiple tasks
npx contextor 0,1,2

# Integrate all tasks
npx contextor 0,1,2 --integrate
```

## Configuration Examples

### Frontend Project

```javascript
// .contextor.config.js
module.exports = {
  docsDir: '.ai',
  sourceDirs: ['src', 'app'],
  mappings: {
    'src/components/**/*.tsx': ['.ai/components/component-guidelines.md'],
    'src/pages/**/*.tsx': ['.ai/architecture/routing.md'],
    'src/api/**/*.ts': ['.ai/api/api-integration.md']
  }
};
```

### Backend Project

```javascript
// .contextor.config.js
module.exports = {
  docsDir: '.ai',
  sourceDirs: ['src', 'server'],
  mappings: {
    'src/routes/**/*.js': ['.ai/api/endpoints.md'],
    'src/models/**/*.js': ['.ai/database/database-schema.md'],
    'src/services/**/*.js': ['.ai/architecture/service-architecture.md']
  }
};
```

### Library Project

```javascript
// .contextor.config.js
module.exports = {
  docsDir: '.ai',
  sourceDirs: ['src', 'lib'],
  mappings: {
    'src/index.js': ['.ai/api/public-api.md'],
    'src/**/*.js': ['.ai/architecture/system-overview.md']
  }
};
```

## 🔗 Related Documentation
- [Public API](../api/public-api.md)
- [API Design](../architecture/api-design.md)
- [System Overview](../architecture/system-overview.md)
