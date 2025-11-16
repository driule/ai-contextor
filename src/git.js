/**
 * Git helpers for AI Contextor
 */

const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

function isGitRepo(projectRoot) {
  try {
    const gitDir = path.join(projectRoot, '.git');
    return fs.existsSync(gitDir);
  } catch {
    return false;
  }
}

function getCurrentGitHash(projectRoot) {
  if (!isGitRepo(projectRoot)) return null;
  try {
    const hash = execSync('git rev-parse HEAD', {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return hash || null;
  } catch {
    return null;
  }
}

function hasRecentChanges(projectRoot, sourceDirs, sinceDate) {
  if (!isGitRepo(projectRoot)) return false;
  try {
    const dirs = (sourceDirs && sourceDirs.length > 0 ? sourceDirs : ['src'])
      .map((d) => `"${d}"`)
      .join(' ');
    const since = sinceDate instanceof Date ? sinceDate.toISOString() : null;
    const cmd = since
      ? `git log --since="${since}" --name-only --pretty=format: -- ${dirs}`
      : `git log -1 --name-only --pretty=format: -- ${dirs}`;
    const out = execSync(cmd, {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return out.length > 0;
  } catch {
    return false;
  }
}

module.exports = {
  getCurrentGitHash,
  hasRecentChanges,
};


