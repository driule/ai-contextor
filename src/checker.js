/**
 * Documentation Checker - Core Logic
 * 
 * Checks documentation freshness and consistency
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getFileModTime, getLastUpdatedDate, getAllDocFiles } = require('./parser');
const { loadCache, saveCache } = require('./cache');
const { getCurrentGitHash, hasRecentChanges } = require('./git');

class DocChecker {
  constructor(options = {}) {
    this.warnings = [];
    this.errors = [];
    this.quiet = options.quiet || false;
    this.force = options.force || false;
    this.projectRoot = options.projectRoot || process.cwd();
    this.config = options.config || {};
    this.cache = loadCache(this.projectRoot, this.config.cacheFile);
  }

  /**
   * Check if code has changed since last check
   */
  hasCodeChanged() {
    if (this.force) {
      return true;
    }

    const currentHash = getCurrentGitHash(this.projectRoot);
    
    // If no git hash, always check
    if (!currentHash) return true;
    
    // If hash changed, code definitely changed
    if (this.cache.lastGitHash !== currentHash) {
      return true;
    }
    
    // Check if any source files were modified after last check
    if (this.cache.lastCheck) {
      const lastCheckTime = new Date(this.cache.lastCheck);
      return hasRecentChanges(this.projectRoot, this.config.sourceDirs || ['src'], lastCheckTime);
    }
    
    return true;
  }

  /**
   * Check documentation freshness
   */
  checkDocFreshness() {
    if (!this.hasCodeChanged()) {
      if (!this.quiet) {
        console.log('📚 Documentation check: No code changes since last check, skipping...\n');
      }
      return;
    }

    if (!this.quiet) {
      console.log('📚 Checking documentation freshness...\n');
    }

    const mappings = this.config.mappings || {};
    const docsDir = path.join(this.projectRoot, this.config.docsDir || '.ai');

    // Check each mapping
    for (const [srcPath, docPaths] of Object.entries(mappings)) {
      const srcModTime = getFileModTime(this.projectRoot, srcPath);
      
      if (!srcModTime) {
        // Source file doesn't exist or is a directory - check all files in it
        if (srcPath.includes('/') && !srcPath.match(/\.(ts|js|prisma)$/)) {
          // It's a directory, check if any file in it changed
          const dirPath = path.join(this.projectRoot, srcPath);
          if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
              if (file.match(/\.(ts|js|prisma)$/)) {
                const filePath = path.join(srcPath, file);
                const fileModTime = getFileModTime(this.projectRoot, filePath);
                if (fileModTime) {
                  this.checkDocForSource(filePath, fileModTime, docPaths, docsDir);
                }
              }
            }
          }
        }
        continue;
      }

      this.checkDocForSource(srcPath, srcModTime, docPaths, docsDir);
    }

    // Check all .md files in docs directory
    if (this.config.check?.structure !== false) {
      this.checkAllDocFiles(docsDir);
    }
  }

  /**
   * Check documentation for a specific source file
   */
  checkDocForSource(srcPath, srcModTime, docPaths, docsDir) {
    for (const docPath of docPaths) {
      const fullDocPath = docPath.startsWith('/') || docPath.startsWith(this.projectRoot)
        ? docPath
        : path.join(docsDir, docPath);
      
      const docModTime = getFileModTime(this.projectRoot, fullDocPath);
      const lastUpdated = getLastUpdatedDate(this.projectRoot, fullDocPath, this.config.datePattern);

      if (!docModTime) {
        this.warnings.push(`⚠️  Documentation file missing: ${docPath}`);
        continue;
      }

      if (!lastUpdated && this.config.check?.lastUpdated !== false) {
        this.warnings.push(`⚠️  Missing "Last Updated" date in: ${docPath}`);
        continue;
      }

      // Check if source was modified after documentation
      if (srcModTime > docModTime && lastUpdated) {
        const daysSinceUpdate = Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
        const daysSinceSourceChange = Math.floor((Date.now() - srcModTime.getTime()) / (1000 * 60 * 60 * 24));
        
        const threshold = this.config.threshold || { error: 7, warning: 30 };
        
        if (daysSinceUpdate > threshold.error && daysSinceSourceChange < threshold.warning) {
          this.errors.push(
            `❌ ${docPath} may be outdated (source ${srcPath} modified ${daysSinceSourceChange} days ago, doc updated ${daysSinceUpdate} days ago)`
          );
        } else if (srcModTime > lastUpdated && daysSinceSourceChange < threshold.error) {
          this.warnings.push(
            `⚠️  ${docPath} may need update (source ${srcPath} modified after last doc update)`
          );
        }
      }
    }
  }

  /**
   * Check all documentation files for structure
   */
  checkAllDocFiles(docsDir) {
    if (!fs.existsSync(docsDir)) {
      return;
    }

    const docFiles = getAllDocFiles(docsDir);
    const requiredSections = this.config.requiredSections || [
      '**Last Updated**',
      '**Version**'
    ];

    for (const file of docFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(this.projectRoot, file);

      // Check for required sections
      for (const section of requiredSections) {
        if (!content.includes(section)) {
          this.warnings.push(`⚠️  Missing "${section}" in: ${relativePath}`);
        }
      }

      // Check for broken internal links
      if (this.config.check?.links !== false) {
        this.checkLinks(content, relativePath);
      }
    }
  }

  /**
   * Check for broken internal links
   */
  checkLinks(content, filePath) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkPath = match[2];

      // Only check relative links
      if (linkPath.startsWith('./') || linkPath.startsWith('../') || 
          (!linkPath.startsWith('http') && !linkPath.startsWith('#') && !linkPath.startsWith('mailto:'))) {
        const docDir = path.dirname(filePath);
        const resolvedPath = path.resolve(this.projectRoot, docDir, linkPath);
        
        if (!fs.existsSync(resolvedPath)) {
          this.warnings.push(`⚠️  Broken link in ${filePath}: ${linkText} → ${linkPath}`);
        }
      }
    }
  }

  /**
   * Run all checks
   */
  run() {
    if (!this.quiet) {
      console.log('🔍 Running documentation checks...\n');
    }
    
    this.checkDocFreshness();

    // Print results
    if (this.errors.length > 0) {
      if (!this.quiet) {
        console.log('\n❌ DOCUMENTATION UPDATES NEEDED:\n');
        this.errors.forEach(err => console.log(err));
        console.log('\n💡 Consider updating documentation before committing.\n');
      }
    }

    if (this.warnings.length > 0 && !this.quiet) {
      console.log('\n⚠️  WARNINGS:\n');
      this.warnings.forEach(warn => console.log(warn));
    }

    if (this.errors.length === 0 && this.warnings.length === 0 && !this.quiet) {
      console.log('✅ All documentation checks passed!\n');
    }

    // Save cache
    const currentHash = getCurrentGitHash(this.projectRoot);
    saveCache(this.projectRoot, this.config.cacheFile, {
      lastCheck: new Date().toISOString(),
      lastGitHash: currentHash,
      lastWarnings: this.warnings.length,
      lastErrors: this.errors.length
    });

    return {
      errors: this.errors.length,
      warnings: this.warnings.length,
      needsUpdate: this.errors.length > 0
    };
  }
}

module.exports = { DocChecker };


