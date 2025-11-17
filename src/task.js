/**
 * Task Generator - Creates new development task directories
 */

const fs = require('fs');
const path = require('path');

class TaskGenerator {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.devDir = path.join(projectRoot, '.ai', 'dev');
  }

  /**
   * Create a new task directory
   */
  createTask(description) {
    // Ensure .ai/dev directory exists
    if (!fs.existsSync(this.devDir)) {
      fs.mkdirSync(this.devDir, { recursive: true });
    }

    // Find next available task number
    const taskNumber = this.getNextTaskNumber();
    const taskDir = path.join(this.devDir, `task-${taskNumber}`);
    
    // Create task directory
    fs.mkdirSync(taskDir, { recursive: true });

    // Generate task files
    const files = {
      'README.md': this.generateTaskReadme(taskNumber, description),
      'requirements.md': this.generateRequirements(),
      'notes.md': this.generateNotes(),
      'implementation.md': this.generateImplementation(),
    };

    const created = [taskDir];
    for (const [filename, content] of Object.entries(files)) {
      const filePath = path.join(taskDir, filename);
      fs.writeFileSync(filePath, content, 'utf8');
      created.push(filePath);
    }

    return {
      taskNumber,
      taskDir,
      files: created
    };
  }

  /**
   * Get next available task number
   */
  getNextTaskNumber() {
    if (!fs.existsSync(this.devDir)) {
      return 0;
    }

    const entries = fs.readdirSync(this.devDir, { withFileTypes: true });
    const taskDirs = entries
      .filter(entry => entry.isDirectory() && entry.name.startsWith('task-'))
      .map(entry => {
        const match = entry.name.match(/^task-(\d+)$/);
        return match ? parseInt(match[1], 10) : -1;
      })
      .filter(num => num >= 0)
      .sort((a, b) => b - a);

    return taskDirs.length > 0 ? taskDirs[0] + 1 : 0;
  }

  /**
   * Generate task README.md
   */
  generateTaskReadme(taskNumber, description) {
    const date = new Date().toISOString().split('T')[0];
    return `# Task ${taskNumber}: ${description || 'Untitled Task'}

**Created**: ${date}
**Status**: 🚧 In Progress

## Overview

${description || 'Task description goes here'}

## Requirements

See [requirements.md](./requirements.md) for detailed requirements and specifications.

## Development Notes

See [notes.md](./notes.md) for development notes and decisions made during implementation.

## Implementation

See [implementation.md](./implementation.md) for implementation details and approach.

## Status

- [ ] Requirements defined
- [ ] Implementation started
- [ ] Testing
- [ ] Documentation updated
- [ ] Task completed

## 🔗 Related Documentation

- [Development Tasks README](../README.md)
`;
  }

  /**
   * Generate requirements.md template
   */
  generateRequirements() {
    const date = new Date().toISOString().split('T')[0];
    return `# Requirements

**Last Updated**: ${date}

## Overview

Detailed requirements and specifications for this task.

## Functional Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Non-Functional Requirements

- Performance requirements
- Security requirements
- Usability requirements

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Constraints

- Technical constraints
- Time constraints
- Resource constraints

## 🔗 Related Documentation

- [Task README](./README.md)
`;
  }

  /**
   * Generate notes.md template
   */
  generateNotes() {
    const date = new Date().toISOString().split('T')[0];
    return `# Development Notes

**Last Updated**: ${date}

## Notes

Development notes, decisions, and observations during implementation.

### ${date}

- Note 1
- Note 2

## Decisions

### Decision 1
- **Date**: ${date}
- **Context**: Why this decision was needed
- **Decision**: What was decided
- **Rationale**: Why this approach was chosen
- **Alternatives**: What alternatives were considered

## Questions

- Question 1 - needs clarification
- Question 2 - needs research

## 🔗 Related Documentation

- [Task README](./README.md)
- [Implementation](./implementation.md)
`;
  }

  /**
   * Generate implementation.md template
   */
  generateImplementation() {
    const date = new Date().toISOString().split('T')[0];
    return `# Implementation

**Last Updated**: ${date}

## Approach

Implementation approach and strategy for this task.

## Architecture

- High-level architecture decisions
- Component structure
- Data flow

## Implementation Steps

1. Step 1
2. Step 2
3. Step 3

## Code Changes

### Files Modified
- File 1 - changes made
- File 2 - changes made

### Files Created
- New file 1 - purpose
- New file 2 - purpose

## Testing

- Test cases
- Test results
- Edge cases

## Challenges

- Challenge 1 - how it was solved
- Challenge 2 - how it was solved

## 🔗 Related Documentation

- [Task README](./README.md)
- [Requirements](./requirements.md)
- [Notes](./notes.md)
`;
  }
}

module.exports = { TaskGenerator };

