/**
 * Parser utilities for AI Contextor
 *
 * - Read file modification times
 * - Extract "Last Updated" dates from markdown
 * - Gather all documentation files under a directory
 */

const fs = require('fs');
const path = require('path');

function getFileModTime(projectRoot, relativeOrAbsolutePath) {
  const fullPath = path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(projectRoot, relativeOrAbsolutePath);
  try {
    const stat = fs.statSync(fullPath);
    return stat.isFile() ? stat.mtime : null;
  } catch {
    return null;
  }
}

function getLastUpdatedDate(projectRoot, relativeOrAbsolutePath, datePattern) {
  const fullPath = path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(projectRoot, relativeOrAbsolutePath);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const pattern =
      datePattern instanceof RegExp
        ? datePattern
        : /\*\*Last Updated\*\*:\s*(\d{4}-\d{2}-\d{2})/;
    const match = content.match(pattern);
    if (!match) return null;
    const iso = match[1];
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

function getAllDocFiles(targetDir) {
  const results = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        results.push(full);
      }
    }
  }
  if (fs.existsSync(targetDir) && fs.statSync(targetDir).isDirectory()) {
    walk(targetDir);
  }
  return results;
}

module.exports = {
  getFileModTime,
  getLastUpdatedDate,
  getAllDocFiles,
};


