/**
 * Project Analyzer - Detects project type and structure
 * 
 * Analyzes project structure to determine:
 * - Project type (frontend, backend, library, monorepo, etc.)
 * - Framework/technology stack
 * - Key directories and files
 * - Dependencies
 */

const fs = require('fs');
const path = require('path');

class ProjectAnalyzer {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.analysis = {
      type: null,
      frameworks: [],
      languages: [],
      buildTools: [],
      testFrameworks: [],
      keyDirs: [],
      keyFiles: [],
      dependencies: {},
      devDependencies: {},
      hasGit: false,
      hasTests: false,
      structure: {}
    };
  }

  /**
   * Analyze the entire project
   */
  analyze() {
    this.detectGit();
    this.analyzePackageJson();
    this.analyzeDirectoryStructure();
    this.detectProjectType();
    this.analyzeLanguages();
    return this.analysis;
  }

  /**
   * Check if project uses Git
   */
  detectGit() {
    this.analysis.hasGit = fs.existsSync(path.join(this.projectRoot, '.git'));
  }

  /**
   * Analyze package.json if it exists
   */
  analyzePackageJson() {
    const packagePath = path.join(this.projectRoot, 'package.json');
    if (!fs.existsSync(packagePath)) {
      return;
    }

    try {
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      this.analysis.dependencies = pkg.dependencies || {};
      this.analysis.devDependencies = pkg.devDependencies || {};
      
      // Detect frameworks and tools from dependencies
      const allDeps = { ...this.analysis.dependencies, ...this.analysis.devDependencies };
      
      // Frontend frameworks
      if (allDeps.react || allDeps['react-dom']) {
        this.analysis.frameworks.push('React');
      }
      if (allDeps.vue || allDeps['@vue/core']) {
        this.analysis.frameworks.push('Vue');
      }
      if (allDeps.angular || allDeps['@angular/core']) {
        this.analysis.frameworks.push('Angular');
      }
      if (allDeps.next) {
        this.analysis.frameworks.push('Next.js');
      }
      if (allDeps.nuxt || allDeps['nuxt']) {
        this.analysis.frameworks.push('Nuxt.js');
      }
      if (allDeps.svelte || allDeps['svelte']) {
        this.analysis.frameworks.push('Svelte');
      }
      if (allDeps.remix) {
        this.analysis.frameworks.push('Remix');
      }

      // Backend frameworks
      if (allDeps.express) {
        this.analysis.frameworks.push('Express');
      }
      if (allDeps.koa || allDeps['@koa/router']) {
        this.analysis.frameworks.push('Koa');
      }
      if (allDeps.fastify) {
        this.analysis.frameworks.push('Fastify');
      }
      if (allDeps.nestjs || allDeps['@nestjs/core']) {
        this.analysis.frameworks.push('NestJS');
      }
      if (allDeps.hapi || allDeps['@hapi/hapi']) {
        this.analysis.frameworks.push('Hapi');
      }
      if (allDeps.fastapi || allDeps.flask) {
        this.analysis.frameworks.push('Python Web Framework');
      }

      // Build tools
      if (allDeps.webpack || allDeps['webpack']) {
        this.analysis.buildTools.push('Webpack');
      }
      if (allDeps.vite || allDeps['vite']) {
        this.analysis.buildTools.push('Vite');
      }
      if (allDeps.rollup || allDeps['rollup']) {
        this.analysis.buildTools.push('Rollup');
      }
      if (allDeps.esbuild) {
        this.analysis.buildTools.push('esbuild');
      }
      if (allDeps.turbopack) {
        this.analysis.buildTools.push('Turbopack');
      }
      if (allDeps['@vitejs/plugin-react'] || allDeps['@vitejs/plugin-vue']) {
        this.analysis.buildTools.push('Vite');
      }

      // Test frameworks
      if (allDeps.jest || allDeps['jest']) {
        this.analysis.testFrameworks.push('Jest');
        this.analysis.hasTests = true;
      }
      if (allDeps.vitest || allDeps['vitest']) {
        this.analysis.testFrameworks.push('Vitest');
        this.analysis.hasTests = true;
      }
      if (allDeps.mocha || allDeps['mocha']) {
        this.analysis.testFrameworks.push('Mocha');
        this.analysis.hasTests = true;
      }
      if (allDeps.cypress || allDeps['cypress']) {
        this.analysis.testFrameworks.push('Cypress');
        this.analysis.hasTests = true;
      }
      if (allDeps['@testing-library/react'] || allDeps['@testing-library/vue']) {
        this.analysis.testFrameworks.push('Testing Library');
        this.analysis.hasTests = true;
      }
      if (allDeps.playwright || allDeps['playwright']) {
        this.analysis.testFrameworks.push('Playwright');
        this.analysis.hasTests = true;
      }

      // Database
      if (allDeps.prisma || allDeps['@prisma/client']) {
        this.analysis.frameworks.push('Prisma');
      }
      if (allDeps.typeorm || allDeps['typeorm']) {
        this.analysis.frameworks.push('TypeORM');
      }
      if (allDeps.sequelize || allDeps['sequelize']) {
        this.analysis.frameworks.push('Sequelize');
      }
      if (allDeps.mongoose || allDeps['mongoose']) {
        this.analysis.frameworks.push('Mongoose');
      }

      // Check for monorepo
      if (pkg.workspaces || allDeps.lerna || allDeps.nx || allDeps.turborepo) {
        this.analysis.structure.isMonorepo = true;
        if (allDeps.lerna) this.analysis.frameworks.push('Lerna');
        if (allDeps.nx) this.analysis.frameworks.push('Nx');
        if (allDeps.turborepo) this.analysis.frameworks.push('Turborepo');
      }

      // Check scripts for hints
      if (pkg.scripts) {
        if (pkg.scripts.dev || pkg.scripts.start) {
          this.analysis.structure.hasDevScript = true;
        }
        if (pkg.scripts.build) {
          this.analysis.structure.hasBuildScript = true;
        }
        if (pkg.scripts.test) {
          this.analysis.hasTests = true;
        }
      }
    } catch (error) {
      // Ignore parse errors
    }
  }

  /**
   * Analyze directory structure
   */
  analyzeDirectoryStructure() {
    const commonDirs = [
      'src', 'lib', 'app', 'pages', 'components', 'views', 'public', 
      'dist', 'build', 'out', 'server', 'client', 'api', 'routes',
      'controllers', 'models', 'services', 'utils', 'helpers',
      'tests', 'test', '__tests__', 'spec', 'e2e', 'cypress',
      'config', 'scripts', 'docs', 'documentation'
    ];

    const commonFiles = [
      'README.md', 'package.json', 'tsconfig.json', 'jsconfig.json',
      'webpack.config.js', 'vite.config.js', 'next.config.js',
      'tailwind.config.js', 'postcss.config.js', 'babel.config.js',
      '.env', '.env.example', 'docker-compose.yml', 'Dockerfile',
      'tsconfig.json', 'jest.config.js', 'vitest.config.js'
    ];

    for (const dir of commonDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        this.analysis.keyDirs.push(dir);
      }
    }

    for (const file of commonFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        this.analysis.keyFiles.push(file);
      }
    }

    // Check for test directories
    if (this.analysis.keyDirs.some(d => ['tests', 'test', '__tests__', 'spec', 'e2e'].includes(d))) {
      this.analysis.hasTests = true;
    }
  }

  /**
   * Detect programming languages used
   */
  analyzeLanguages() {
    const extensions = new Set();
    
    const scanDir = (dir, depth = 0) => {
      if (depth > 3) return; // Limit depth to avoid scanning too much
      
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          // Skip node_modules, .git, etc.
          if (entry.name.startsWith('.') || entry.name === 'node_modules') {
            continue;
          }

          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            scanDir(fullPath, depth + 1);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (ext) {
              extensions.add(ext);
            }
          }
        }
      } catch (error) {
        // Ignore permission errors
      }
    };

    scanDir(this.projectRoot);

    // Map extensions to languages
    const langMap = {
      '.js': 'JavaScript',
      '.jsx': 'JavaScript (React)',
      '.ts': 'TypeScript',
      '.tsx': 'TypeScript (React)',
      '.py': 'Python',
      '.java': 'Java',
      '.go': 'Go',
      '.rs': 'Rust',
      '.rb': 'Ruby',
      '.php': 'PHP',
      '.cs': 'C#',
      '.swift': 'Swift',
      '.kt': 'Kotlin',
      '.vue': 'Vue',
      '.svelte': 'Svelte',
      '.css': 'CSS',
      '.scss': 'SCSS',
      '.sass': 'SASS',
      '.less': 'Less',
      '.html': 'HTML',
      '.json': 'JSON',
      '.md': 'Markdown',
      '.sql': 'SQL',
      '.prisma': 'Prisma Schema'
    };

    for (const ext of extensions) {
      if (langMap[ext]) {
        this.analysis.languages.push(langMap[ext]);
      }
    }

    // Remove duplicates
    this.analysis.languages = [...new Set(this.analysis.languages)];
  }

  /**
   * Detect project type based on analysis
   */
  detectProjectType() {
    const { frameworks, keyDirs, keyFiles, structure } = this.analysis;

    // Monorepo
    if (structure.isMonorepo) {
      this.analysis.type = 'monorepo';
      return;
    }

    // Frontend indicators
    const frontendIndicators = [
      'pages', 'components', 'public', 'app', 'src',
      'React', 'Vue', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'Remix'
    ];
    const hasFrontend = frameworks.some(f => frontendIndicators.includes(f)) ||
                       keyDirs.some(d => ['pages', 'components', 'public', 'app'].includes(d)) ||
                       keyFiles.some(f => ['next.config.js', 'vite.config.js'].includes(f));

    // Backend indicators
    const backendIndicators = [
      'server', 'api', 'routes', 'controllers', 'models',
      'Express', 'Koa', 'Fastify', 'NestJS', 'Hapi'
    ];
    const hasBackend = frameworks.some(f => backendIndicators.includes(f)) ||
                      keyDirs.some(d => ['server', 'api', 'routes', 'controllers'].includes(d));

    // Library indicators
    const libraryIndicators = ['lib', 'dist', 'build'];
    const isLibrary = keyDirs.some(d => libraryIndicators.includes(d)) &&
                     !hasFrontend && !hasBackend &&
                     (this.analysis.keyFiles.includes('package.json') && 
                      !this.analysis.keyDirs.includes('pages') &&
                      !this.analysis.keyDirs.includes('app'));

    // Determine type
    if (hasFrontend && hasBackend) {
      this.analysis.type = 'fullstack';
    } else if (hasFrontend) {
      this.analysis.type = 'frontend';
    } else if (hasBackend) {
      this.analysis.type = 'backend';
    } else if (isLibrary) {
      this.analysis.type = 'library';
    } else if (this.analysis.keyDirs.includes('src') || this.analysis.keyDirs.includes('lib')) {
      this.analysis.type = 'library';
    } else {
      this.analysis.type = 'unknown';
    }
  }
}

module.exports = { ProjectAnalyzer };

