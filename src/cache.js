/**
 * Simple JSON cache for AI Contextor
 */

const fs = require('fs');
const path = require('path');

function getCachePath(projectRoot, cacheFile) {
  const filename = cacheFile || '.docs-check-cache.json';
  return path.join(projectRoot, filename);
}

function loadCache(projectRoot, cacheFile) {
  const filePath = getCachePath(projectRoot, cacheFile);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    if (json && typeof json === 'object') {
      return json;
    }
  } catch {
    // ignore
  }
  return {
    lastCheck: null,
    lastGitHash: null,
    lastWarnings: 0,
    lastErrors: 0,
  };
}

function saveCache(projectRoot, cacheFile, data) {
  const filePath = getCachePath(projectRoot, cacheFile);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // ignore write failures
  }
}

module.exports = {
  loadCache,
  saveCache,
};


