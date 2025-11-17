# Development Tasks

**Last Updated**: 2025-11-17

> This directory contains temporary development documentation for active tasks.
> Task directories are gitignored and should be cleaned up when tasks are completed.

## 📋 Purpose

The `dev/` directory is used for:
- **Task-specific documentation** - Requirements, specifications, and notes for active development tasks
- **Temporary notes** - Work-in-progress documentation that doesn't belong in main documentation
- **Task tracking** - Organize documentation by task number (task-0, task-1, etc.)

## 🚀 Usage

### Creating a New Task

Use the `contextor task:new` command to create a new task directory:

```bash
npx contextor task:new "Task description"
# or
npm run task:new "Task description"
```

This will:
- Create a new `task-N` directory (where N is the next available number)
- Generate a task README with template structure
- Create initial documentation files

### Task Structure

Each task directory (`task-0`, `task-1`, etc.) contains:

- **README.md** - Task overview, requirements, and status
- **requirements.md** - Detailed requirements and specifications
- **notes.md** - Development notes and decisions
- **implementation.md** - Implementation details and approach

### Task Workflow

1. **Create task**: `contextor task:new "Feature X"`
2. **Document requirements**: Fill in `requirements.md`
3. **Take notes**: Use `notes.md` during development
4. **Document implementation**: Update `implementation.md` as you code
5. **Clean up**: Delete task directory when task is complete

### Best Practices

- ✅ Keep task directories focused on a single task
- ✅ Update documentation as you work
- ✅ Clean up completed tasks
- ✅ Use clear, descriptive task names
- ❌ Don't commit task directories (they're gitignored)
- ❌ Don't leave old tasks indefinitely

## 📁 Example Task Structure

```
dev/
├── README.md              # This file
├── task-0/                # First task
│   ├── README.md          # Task overview
│   ├── requirements.md    # Requirements
│   ├── notes.md           # Development notes
│   └── implementation.md  # Implementation details
└── task-1/                # Second task
    └── ...
```

## 🔗 Related Documentation

- [Main Documentation](../README.md)
- [Project Initialization Guide](../INIT.md)

---

*Task directories are automatically gitignored. They are temporary and should be removed when tasks are completed.*
