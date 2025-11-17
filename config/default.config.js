/**
 * Default Configuration for AI Contextor
 */

module.exports = {
  docsDir: ".ai",
  sourceDirs: ["src"],
  sourcePatterns: ["**/*.ts", "**/*.js", "**/*.prisma"],
  docPatterns: ["**/*.md"],
  mappings: {},
  cacheFile: ".ai/docs-check-cache.json",
  check: {
    lastUpdated: true,
    version: true,
    links: true,
    structure: true,
  },
  dateFormat: "YYYY-MM-DD",
  datePattern: /\*\*Last Updated\*\*:\s*(\d{4}-\d{2}-\d{2})/,
  requiredSections: [
    "**Last Updated**",
    "**Version**",
  ],
  git: {
    enabled: true,
    useHash: true,
    useTimestamps: true,
  },
  reporter: {
    format: "console",
    quiet: false,
    errorsOnly: false,
  },
};

