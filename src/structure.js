/**
 * Documentation Structure Generator
 * 
 * Creates documentation directory structure based on project type
 */

const fs = require('fs');
const path = require('path');

class StructureGenerator {
  constructor(projectRoot, analysis) {
    this.projectRoot = projectRoot;
    this.analysis = analysis;
    this.aiDir = path.join(projectRoot, '.ai');
  }

  /**
   * Generate structure based on project type
   */
  generate() {
    const type = this.analysis.type || 'unknown';
    
    // Ensure .ai directory exists
    if (!fs.existsSync(this.aiDir)) {
      fs.mkdirSync(this.aiDir, { recursive: true });
    }

    // Generate .gitignore first (to ignore cache files)
    const gitignorePath = path.join(this.aiDir, '.gitignore');
    const gitignoreContent = this.generateGitignore();
    let gitignoreCreated = false;
    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8');
      gitignoreCreated = true;
    }

    // Generate README.md
    const readmePath = path.join(this.aiDir, 'README.md');
    const readmeContent = this.generateReadme(type);
    let readmeCreated = false;
    if (!fs.existsSync(readmePath)) {
      fs.writeFileSync(readmePath, readmeContent, 'utf8');
      readmeCreated = true;
    }

    // Generate project-specific structure first
    let structureResult;
    switch (type) {
      case 'frontend':
        structureResult = this.generateFrontendStructure();
        break;
      case 'backend':
        structureResult = this.generateBackendStructure();
        break;
      case 'fullstack':
        structureResult = this.generateFullstackStructure();
        break;
      case 'library':
        structureResult = this.generateLibraryStructure();
        break;
      case 'monorepo':
        structureResult = this.generateMonorepoStructure();
        break;
      default:
        structureResult = this.generateGenericStructure();
    }

    // Add .gitignore to created files if it was created
    if (gitignoreCreated) {
      structureResult.created.push(gitignorePath);
    } else {
      structureResult.skipped.push(gitignorePath);
    }

    // Generate dev directory structure
    const devResult = this.generateDevStructure();
    if (devResult.created.length > 0) {
      structureResult.created.push(...devResult.created);
    }
    if (devResult.skipped.length > 0) {
      structureResult.skipped.push(...devResult.skipped);
    }

    // Add README.md to created files if it was created
    if (readmeCreated) {
      structureResult.created.push(readmePath);
    } else {
      structureResult.skipped.push(readmePath);
    }

    return structureResult;
  }

  /**
   * Generate .gitignore for .ai directory
   */
  generateGitignore() {
    return `# AI Contextor cache files
docs-check-cache.json

# Development task directories (temporary documentation)
# Note: dev/README.md is committed, only task-{n} folders are ignored
dev/task-*/

# Documentation integration drafts
doc-integration-*.md
DOC-INTEGRATION.md

# Temporary files
*.tmp
*.temp

# Personal notes (uncomment if you want to ignore)
# personal-notes.md
# notes/
`;
  }

  /**
   * Generate dev directory structure
   */
  generateDevStructure() {
    const devDir = path.join(this.aiDir, 'dev');
    const created = [];
    const skipped = [];

    // Create dev directory
    if (!fs.existsSync(devDir)) {
      fs.mkdirSync(devDir, { recursive: true });
      created.push(devDir);
    }

    // Create dev/README.md
    const devReadmePath = path.join(devDir, 'README.md');
    const devReadmeContent = this.generateDevReadme();
    if (!fs.existsSync(devReadmePath)) {
      fs.writeFileSync(devReadmePath, devReadmeContent, 'utf8');
      created.push(devReadmePath);
    } else {
      skipped.push(devReadmePath);
    }

    return { created, skipped };
  }

  /**
   * Generate dev/README.md
   */
  generateDevReadme() {
    const date = new Date().toISOString().split('T')[0];
    return `# Development Tasks

**Last Updated**: ${date}

> This directory contains temporary development documentation for active tasks.
> Task directories are gitignored and should be cleaned up when tasks are completed.

## 📋 Purpose

The \`dev/\` directory is used for:
- **Task-specific documentation** - Requirements, specifications, and notes for active development tasks
- **Temporary notes** - Work-in-progress documentation that doesn't belong in main documentation
- **Task tracking** - Organize documentation by task number (task-0, task-1, etc.)

## 🚀 Usage

### Creating a New Task

Use the \`contextor task:new\` command to create a new task directory:

\`\`\`bash
npx contextor task:new "Task description"
# or
npm run task:new "Task description"
\`\`\`

This will:
- Create a new \`task-N\` directory (where N is the next available number)
- Generate a task README with template structure
- Create initial documentation files

### Task Structure

Each task directory (\`task-0\`, \`task-1\`, etc.) contains:

- **README.md** - Task overview, requirements, and status
- **requirements.md** - Detailed requirements and specifications
- **notes.md** - Development notes and decisions
- **implementation.md** - Implementation details and approach

### Task Workflow

1. **Create task**: \`contextor task:new "Feature X"\`
2. **Document requirements**: Fill in \`requirements.md\`
3. **Take notes**: Use \`notes.md\` during development
4. **Document implementation**: Update \`implementation.md\` as you code
5. **Clean up**: Delete task directory when task is complete

### Best Practices

- ✅ Keep task directories focused on a single task
- ✅ Update documentation as you work
- ✅ Clean up completed tasks
- ✅ Use clear, descriptive task names
- ❌ Don't commit task directories (they're gitignored)
- ❌ Don't leave old tasks indefinitely

## 📁 Example Task Structure

\`\`\`
dev/
├── README.md              # This file
├── task-0/                # First task
│   ├── README.md          # Task overview
│   ├── requirements.md    # Requirements
│   ├── notes.md           # Development notes
│   └── implementation.md  # Implementation details
└── task-1/                # Second task
    └── ...
\`\`\`

## 🔗 Related Documentation

- [Main Documentation](../README.md)
- [Project Initialization Guide](../INIT.md)

---

*Task directories are automatically gitignored. They are temporary and should be removed when tasks are completed.*
`;
  }

  /**
   * Generate README.md for .ai directory
   */
  generateReadme(projectType) {
    const typeDescriptions = {
      'frontend': 'Frontend web application',
      'backend': 'Backend API/server application',
      'fullstack': 'Full-stack application (frontend + backend)',
      'library': 'Library or package',
      'monorepo': 'Monorepo workspace',
      'unknown': 'Project'
    };

    const description = typeDescriptions[projectType] || typeDescriptions.unknown;
    const date = new Date().toISOString().split('T')[0];

    return `# AI Documentation

**Last Updated**: ${date}

> This directory contains AI assistant documentation for this ${description.toLowerCase()}.
> Documentation is automatically managed by [AI Contextor](https://github.com/driule/ai-contextor).

## 📚 Documentation Framework

This project uses a structured documentation framework to provide context for AI assistants working on the codebase.

### Quick Start

1. **Read [INIT.md](./INIT.md)** - Start here for project context and guidelines
2. **Explore documentation** - Browse the documentation structure below
3. **Keep it updated** - Update documentation when code changes

### Documentation Structure

The documentation is organized into logical sections:

- **[INIT.md](./INIT.md)** - Project initialization guide and context
- **architecture/** - System architecture and design decisions
${this.getReadmeStructureLinks(projectType)}
- **dev/** - Development tasks (temporary, gitignored) - See [dev/README.md](./dev/README.md)

### Documentation Guidelines

- Each documentation file includes metadata (Last Updated, Version)
- Files link to related documentation using the "🔗 Related Documentation" section
- Documentation should be updated when code changes
- Use clear headings and structure

### Using This Documentation

**For AI Assistants:**
- Start with [INIT.md](./INIT.md) to understand the project
- Reference specific documentation files when working on related code
- Update documentation when making code changes

**For Developers:**
- Review documentation before making significant changes
- Keep documentation in sync with code
- Add new documentation files as the project evolves

---

*This documentation structure was generated by [AI Contextor](https://github.com/driule/ai-contextor).*
`;
  }

  /**
   * Get structure links for README based on project type
   */
  getReadmeStructureLinks(projectType) {
    const links = {
      'frontend': `- **components/** - Component patterns and UI guidelines
- **state-management/** - State management approach
- **api/** - API integration patterns
- **styling/** - Styling approach and design system`,
      'backend': `- **database/** - Database schema and migrations
- **api/** - API endpoints and authentication
- **services/** - Business logic and domain rules`,
      'fullstack': `- **frontend/** - Frontend-specific documentation
- **backend/** - Backend-specific documentation
- **shared/** - Shared code and types
- **database/** - Database schema`,
      'library': `- **api/** - Public and internal API documentation
- **examples/** - Usage examples and patterns`,
      'monorepo': `- **packages/** - Individual package documentation`,
      'unknown': `- **components/** - Component documentation`
    };

    return links[projectType] || links['unknown'];
  }

  /**
   * Generate frontend project structure
   */
  generateFrontendStructure() {
    const structure = {
      'architecture': {
        'system-overview.md': this.getTemplate('frontend', 'system-overview'),
        'component-architecture.md': this.getTemplate('frontend', 'component-architecture'),
        'routing.md': this.getTemplate('frontend', 'routing'),
      },
      'components': {
        'component-guidelines.md': this.getTemplate('frontend', 'component-guidelines'),
        'ui-patterns.md': this.getTemplate('frontend', 'ui-patterns'),
      },
      'state-management': {
        'state-overview.md': this.getTemplate('frontend', 'state-overview'),
      },
      'api': {
        'api-integration.md': this.getTemplate('frontend', 'api-integration'),
      },
      'styling': {
        'styling-guide.md': this.getTemplate('frontend', 'styling'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Generate backend project structure
   */
  generateBackendStructure() {
    const structure = {
      'architecture': {
        'system-overview.md': this.getTemplate('backend', 'system-overview'),
        'api-design.md': this.getTemplate('backend', 'api-design'),
        'service-architecture.md': this.getTemplate('backend', 'service-architecture'),
      },
      'database': {
        'database-schema.md': this.getTemplate('backend', 'database-schema'),
        'migrations.md': this.getTemplate('backend', 'migrations'),
      },
      'api': {
        'endpoints.md': this.getTemplate('backend', 'endpoints'),
        'authentication.md': this.getTemplate('backend', 'authentication'),
      },
      'services': {
        'business-logic.md': this.getTemplate('backend', 'business-logic'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Generate fullstack project structure
   */
  generateFullstackStructure() {
    const structure = {
      'architecture': {
        'system-overview.md': this.getTemplate('fullstack', 'system-overview'),
        'client-server.md': this.getTemplate('fullstack', 'client-server'),
      },
      'frontend': {
        'frontend-overview.md': this.getTemplate('fullstack', 'frontend-overview'),
        'components.md': this.getTemplate('fullstack', 'components'),
      },
      'backend': {
        'backend-overview.md': this.getTemplate('fullstack', 'backend-overview'),
        'api.md': this.getTemplate('fullstack', 'api'),
      },
      'shared': {
        'shared-code.md': this.getTemplate('fullstack', 'shared-code'),
      },
      'database': {
        'database-schema.md': this.getTemplate('fullstack', 'database-schema'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Generate library project structure
   */
  generateLibraryStructure() {
    const structure = {
      'architecture': {
        'system-overview.md': this.getTemplate('library', 'system-overview'),
        'api-design.md': this.getTemplate('library', 'api-design'),
      },
      'api': {
        'public-api.md': this.getTemplate('library', 'public-api'),
        'internal-api.md': this.getTemplate('library', 'internal-api'),
      },
      'examples': {
        'usage-examples.md': this.getTemplate('library', 'usage-examples'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Generate monorepo project structure
   */
  generateMonorepoStructure() {
    const structure = {
      'architecture': {
        'monorepo-overview.md': this.getTemplate('monorepo', 'monorepo-overview'),
        'workspace-structure.md': this.getTemplate('monorepo', 'workspace-structure'),
      },
      'packages': {
        'package-overview.md': this.getTemplate('monorepo', 'package-overview'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Generate generic project structure
   */
  generateGenericStructure() {
    const structure = {
      'architecture': {
        'system-overview.md': this.getTemplate('generic', 'system-overview'),
      },
      'components': {
        'components-overview.md': this.getTemplate('generic', 'components-overview'),
      },
    };

    return this.createStructure(structure);
  }

  /**
   * Create directory structure and files
   */
  createStructure(structure) {
    const created = [];
    const skipped = [];
    
    const createDir = (dirPath, contents) => {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        created.push(dirPath);
      }

      for (const [name, content] of Object.entries(contents)) {
        if (typeof content === 'string') {
          // It's a file
          const filePath = path.join(dirPath, name);
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content, 'utf8');
            created.push(filePath);
          } else {
            skipped.push(filePath);
          }
        } else {
          // It's a subdirectory
          const subDirPath = path.join(dirPath, name);
          createDir(subDirPath, content);
        }
      }
    };

    createDir(this.aiDir, structure);
    return { created, skipped };
  }

  /**
   * Get template content for a specific file
   */
  getTemplate(projectType, fileType) {
    const templates = {
      frontend: {
        'system-overview': this.getFrontendSystemOverview(),
        'component-architecture': this.getComponentArchitecture(),
        'routing': this.getRouting(),
        'component-guidelines': this.getComponentGuidelines(),
        'ui-patterns': this.getUIPatterns(),
        'state-overview': this.getStateOverview(),
        'api-integration': this.getAPIIntegration(),
        'styling': this.getStylingGuide(),
      },
      backend: {
        'system-overview': this.getBackendSystemOverview(),
        'api-design': this.getAPIDesign(),
        'service-architecture': this.getServiceArchitecture(),
        'database-schema': this.getDatabaseSchema(),
        'migrations': this.getMigrations(),
        'endpoints': this.getEndpoints(),
        'authentication': this.getAuthentication(),
        'business-logic': this.getBusinessLogic(),
      },
      fullstack: {
        'system-overview': this.getFullstackSystemOverview(),
        'client-server': this.getClientServer(),
        'frontend-overview': this.getFrontendOverview(),
        'components': this.getComponents(),
        'backend-overview': this.getBackendOverview(),
        'api': this.getAPI(),
        'shared-code': this.getSharedCode(),
        'database-schema': this.getDatabaseSchema(),
      },
      library: {
        'system-overview': this.getLibrarySystemOverview(),
        'api-design': this.getLibraryAPIDesign(),
        'public-api': this.getPublicAPI(),
        'internal-api': this.getInternalAPI(),
        'usage-examples': this.getUsageExamples(),
      },
      monorepo: {
        'monorepo-overview': this.getMonorepoOverview(),
        'workspace-structure': this.getWorkspaceStructure(),
        'package-overview': this.getPackageOverview(),
      },
      generic: {
        'system-overview': this.getGenericSystemOverview(),
        'components-overview': this.getGenericComponentsOverview(),
      },
    };

    return templates[projectType]?.[fileType] || this.getDefaultTemplate(fileType);
  }

  /**
   * Frontend templates
   */
  getFrontendSystemOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# System Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

High-level overview of the frontend application architecture, key technologies, and overall system design.

## Architecture

Describe the overall architecture:
- Application structure
- Key architectural decisions
- Technology choices

## Key Components

List and describe major components:
- Core features
- Shared components
- Layout structure

## 🔗 Related Documentation
- [Component Architecture](./component-architecture.md)
- [Routing](./routing.md)
- [State Management](../state-management/state-overview.md)
`;
  }

  getComponentArchitecture() {
    const date = new Date().toISOString().split('T')[0];
    return `# Component Architecture

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Documentation of component structure, patterns, and organization.

## Component Hierarchy

Describe the component tree structure:
- Root components
- Layout components
- Feature components
- Shared components

## Component Patterns

Common patterns used:
- Component composition
- Props patterns
- State management patterns

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Component Guidelines](../components/component-guidelines.md)
`;
  }

  getRouting() {
    const date = new Date().toISOString().split('T')[0];
    return `# Routing

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Documentation of application routing structure and navigation patterns.

## Route Structure

- Main routes
- Nested routes
- Route parameters
- Route guards/middleware

## Navigation Patterns

- Link patterns
- Programmatic navigation
- Route transitions

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Component Architecture](./component-architecture.md)
`;
  }

  getComponentGuidelines() {
    const date = new Date().toISOString().split('T')[0];
    return `# Component Guidelines

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Guidelines for creating and maintaining components in this project.

## Component Structure

Standard component structure:
\`\`\`
ComponentName/
  ├── ComponentName.tsx
  ├── ComponentName.test.tsx
  ├── ComponentName.module.css
  └── index.ts
\`\`\`

## Naming Conventions

- Component files: PascalCase
- Props interfaces: ComponentNameProps
- Hooks: useComponentName

## Best Practices

- Component composition
- Props design
- State management
- Performance optimization

## 🔗 Related Documentation
- [Component Architecture](../architecture/component-architecture.md)
- [UI Patterns](./ui-patterns.md)
`;
  }

  getUIPatterns() {
    const date = new Date().toISOString().split('T')[0];
    return `# UI Patterns

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Common UI patterns and design system usage.

## Design System

- Design tokens
- Color palette
- Typography
- Spacing system

## Common Patterns

- Form patterns
- Navigation patterns
- Feedback patterns (loading, errors, success)
- Modal/dialog patterns

## 🔗 Related Documentation
- [Component Guidelines](./component-guidelines.md)
- [Styling Guide](../styling/styling-guide.md)
`;
  }

  getStateOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# State Management Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Documentation of state management approach and patterns.

## State Management Strategy

- Global state solution
- Local state patterns
- Server state management

## State Structure

- State shape
- State updates
- State persistence

## 🔗 Related Documentation
- [System Overview](../architecture/system-overview.md)
- [API Integration](../api/api-integration.md)
`;
  }

  getAPIIntegration() {
    const date = new Date().toISOString().split('T')[0];
    return `# API Integration

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

How the frontend integrates with backend APIs.

## API Client

- API client setup
- Request/response handling
- Error handling

## API Endpoints

Document key API endpoints used:
- Authentication
- Data fetching
- Mutations

## 🔗 Related Documentation
- [State Management](../state-management/state-overview.md)
`;
  }

  getStylingGuide() {
    const date = new Date().toISOString().split('T')[0];
    return `# Styling Guide

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Styling approach and guidelines for the project.

## Styling Solution

- CSS framework/library
- CSS-in-JS approach
- Styling methodology

## Styling Patterns

- Component styling
- Global styles
- Responsive design
- Theming

## 🔗 Related Documentation
- [UI Patterns](../components/ui-patterns.md)
`;
  }

  /**
   * Backend templates
   */
  getBackendSystemOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# System Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

High-level overview of the backend application architecture.

## Architecture

- Application structure
- Key architectural patterns
- Technology stack

## Services

- Core services
- Service responsibilities
- Service interactions

## 🔗 Related Documentation
- [API Design](./api-design.md)
- [Service Architecture](./service-architecture.md)
- [Database Schema](../database/database-schema.md)
`;
  }

  getAPIDesign() {
    const date = new Date().toISOString().split('T')[0];
    return `# API Design

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

API design principles and structure.

## API Structure

- REST/GraphQL/gRPC approach
- Endpoint organization
- Versioning strategy

## Request/Response Patterns

- Standard request format
- Standard response format
- Error handling

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Endpoints](../api/endpoints.md)
`;
  }

  getServiceArchitecture() {
    const date = new Date().toISOString().split('T')[0];
    return `# Service Architecture

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Service layer architecture and organization.

## Service Structure

- Service organization
- Service responsibilities
- Service dependencies

## Business Logic

- Where business logic lives
- Service patterns
- Error handling

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Business Logic](../services/business-logic.md)
`;
  }

  getDatabaseSchema() {
    const date = new Date().toISOString().split('T')[0];
    return `# Database Schema

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Database schema documentation and design decisions.

## Schema Overview

- Database type
- Schema structure
- Key tables/collections

## Relationships

- Entity relationships
- Foreign keys
- Indexes

## 🔗 Related Documentation
- [Migrations](./migrations.md)
`;
  }

  getMigrations() {
    const date = new Date().toISOString().split('T')[0];
    return `# Database Migrations

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Database migration strategy and history.

## Migration Strategy

- Migration tool
- Migration process
- Rollback strategy

## Migration History

Document significant migrations:
- Date
- Description
- Impact

## 🔗 Related Documentation
- [Database Schema](./database-schema.md)
`;
  }

  getEndpoints() {
    const date = new Date().toISOString().split('T')[0];
    return `# API Endpoints

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Complete list of API endpoints.

## Endpoints

### Authentication
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh

### [Resource Name]
- GET /resource
- POST /resource
- GET /resource/:id
- PUT /resource/:id
- DELETE /resource/:id

## 🔗 Related Documentation
- [API Design](../architecture/api-design.md)
- [Authentication](./authentication.md)
`;
  }

  getAuthentication() {
    const date = new Date().toISOString().split('T')[0];
    return `# Authentication

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Authentication and authorization implementation.

## Authentication Flow

- Login process
- Token management
- Session handling

## Authorization

- Role-based access
- Permissions
- Protected routes

## 🔗 Related Documentation
- [Endpoints](./endpoints.md)
`;
  }

  getBusinessLogic() {
    const date = new Date().toISOString().split('T')[0];
    return `# Business Logic

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Core business logic and domain rules.

## Business Rules

- Key business rules
- Validation rules
- Business processes

## Domain Models

- Domain entities
- Domain relationships
- Domain services

## 🔗 Related Documentation
- [Service Architecture](../architecture/service-architecture.md)
`;
  }

  /**
   * Fullstack templates
   */
  getFullstackSystemOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# System Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Complete system overview including frontend and backend.

## Architecture

- Full-stack architecture
- Client-server communication
- Deployment architecture

## Components

- Frontend components
- Backend services
- Shared code

## 🔗 Related Documentation
- [Client-Server Architecture](./client-server.md)
- [Frontend Overview](../frontend/frontend-overview.md)
- [Backend Overview](../backend/backend-overview.md)
`;
  }

  getClientServer() {
    const date = new Date().toISOString().split('T')[0];
    return `# Client-Server Architecture

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

How frontend and backend communicate and interact.

## Communication

- API communication
- WebSocket/real-time communication
- Data flow

## Shared Code

- Shared types/interfaces
- Shared utilities
- Shared validation

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Shared Code](../shared/shared-code.md)
`;
  }

  getFrontendOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# Frontend Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Frontend application structure and architecture.

## Frontend Architecture

- Framework/technology
- Component structure
- State management

## Key Features

- Main features
- User flows
- UI patterns

## 🔗 Related Documentation
- [System Overview](../architecture/system-overview.md)
- [Components](./components.md)
`;
  }

  getComponents() {
    const date = new Date().toISOString().split('T')[0];
    return `# Components

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Frontend component documentation.

## Component Structure

- Component organization
- Component patterns
- Reusable components

## 🔗 Related Documentation
- [Frontend Overview](./frontend-overview.md)
`;
  }

  getBackendOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# Backend Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Backend application structure and architecture.

## Backend Architecture

- Framework/technology
- Service structure
- API design

## Key Services

- Core services
- Service responsibilities
- Service interactions

## 🔗 Related Documentation
- [System Overview](../architecture/system-overview.md)
- [API](./api.md)
`;
  }

  getAPI() {
    const date = new Date().toISOString().split('T')[0];
    return `# API

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Backend API documentation.

## API Structure

- Endpoint organization
- Request/response formats
- Error handling

## 🔗 Related Documentation
- [Backend Overview](./backend-overview.md)
`;
  }

  getSharedCode() {
    const date = new Date().toISOString().split('T')[0];
    return `# Shared Code

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Code shared between frontend and backend.

## Shared Types

- Type definitions
- Interfaces
- Enums

## Shared Utilities

- Utility functions
- Validation
- Constants

## 🔗 Related Documentation
- [Client-Server Architecture](../architecture/client-server.md)
`;
  }

  /**
   * Library templates
   */
  getLibrarySystemOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# System Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Library architecture and design overview.

## Library Structure

- Module organization
- Core functionality
- Extension points

## Design Principles

- API design principles
- Architecture decisions
- Design patterns

## 🔗 Related Documentation
- [API Design](./api-design.md)
- [Public API](../api/public-api.md)
`;
  }

  getLibraryAPIDesign() {
    const date = new Date().toISOString().split('T')[0];
    return `# API Design

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Library API design and structure.

## API Philosophy

- API design principles
- Public vs internal APIs
- Versioning strategy

## 🔗 Related Documentation
- [System Overview](./system-overview.md)
- [Public API](../api/public-api.md)
`;
  }

  getPublicAPI() {
    const date = new Date().toISOString().split('T')[0];
    return `# Public API

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Public API documentation for library users.

## Main Exports

- Primary exports
- Function signatures
- Type definitions

## Usage

- Basic usage examples
- Common patterns
- Best practices

## 🔗 Related Documentation
- [API Design](../architecture/api-design.md)
- [Usage Examples](../examples/usage-examples.md)
`;
  }

  getInternalAPI() {
    const date = new Date().toISOString().split('T')[0];
    return `# Internal API

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Internal API documentation for library maintainers.

## Internal Structure

- Internal modules
- Internal functions
- Implementation details

## 🔗 Related Documentation
- [Public API](./public-api.md)
`;
  }

  getUsageExamples() {
    const date = new Date().toISOString().split('T')[0];
    return `# Usage Examples

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Examples of how to use this library.

## Basic Usage

\`\`\`javascript
// Basic example
\`\`\`

## Advanced Usage

\`\`\`javascript
// Advanced example
\`\`\`

## 🔗 Related Documentation
- [Public API](../api/public-api.md)
`;
  }

  /**
   * Monorepo templates
   */
  getMonorepoOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# Monorepo Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Monorepo structure and organization.

## Workspace Structure

- Package organization
- Shared packages
- Package dependencies

## 🔗 Related Documentation
- [Workspace Structure](./workspace-structure.md)
- [Package Overview](../packages/package-overview.md)
`;
  }

  getWorkspaceStructure() {
    const date = new Date().toISOString().split('T')[0];
    return `# Workspace Structure

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Detailed workspace structure documentation.

## Package Organization

- Package layout
- Package naming
- Package dependencies

## 🔗 Related Documentation
- [Monorepo Overview](./monorepo-overview.md)
`;
  }

  getPackageOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# Package Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Overview of packages in this monorepo.

## Packages

List and describe each package:
- Package name
- Purpose
- Dependencies

## 🔗 Related Documentation
- [Monorepo Overview](../architecture/monorepo-overview.md)
`;
  }

  /**
   * Generic templates
   */
  getGenericSystemOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# System Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

High-level overview of the system architecture.

## Architecture

- System structure
- Key components
- Technology choices

## 🔗 Related Documentation
- [Components Overview](../components/components-overview.md)
`;
  }

  getGenericComponentsOverview() {
    const date = new Date().toISOString().split('T')[0];
    return `# Components Overview

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Overview of system components.

## Components

- Component list
- Component responsibilities
- Component interactions

## 🔗 Related Documentation
- [System Overview](../architecture/system-overview.md)
`;
  }

  /**
   * Default template fallback
   */
  getDefaultTemplate(fileType) {
    const date = new Date().toISOString().split('T')[0];
    return `# ${fileType.charAt(0).toUpperCase() + fileType.slice(1).replace(/-/g, ' ')}

**Last Updated**: ${date}
**Version**: 1.0.0

## Overview

Documentation for ${fileType}.

## Details

Add documentation here.

## 🔗 Related Documentation
`;
  }
}

module.exports = { StructureGenerator };

