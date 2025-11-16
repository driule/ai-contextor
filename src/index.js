/**
 * AI Contextor - Main Entry Point
 * 
 * Documentation freshness checker for AI assistant projects
 */

const path = require('path');
const fs = require('fs');
const defaultConfig = require('../config/default.config.js');
const { DocChecker } = require('./checker.js');

class Contextor {
  constructor(config = {}) {
    this.projectRoot = process.cwd();
    this.config = this.loadConfig(config);
  }

  async check(options = {}) {
    const checker = new DocChecker({
      projectRoot: this.projectRoot,
      config: this.config,
      force: Boolean(options.force),
      quiet: Boolean(options.quiet),
    });
    return checker.run();
  }

  loadConfig(overrides = {}) {
    // start with defaults
    const merged = { ...defaultConfig };

    // project config: .contextor.config.js in project root
    const localConfigPath = path.join(this.projectRoot, '.contextor.config.js');
    if (fs.existsSync(localConfigPath)) {
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const local = require(localConfigPath);
        Object.assign(merged, local || {});
      } catch {
        // ignore invalid local config
      }
    }

    // apply programmatic overrides last
    Object.assign(merged, overrides || {});
    return merged;
  }
}

module.exports = { Contextor };

