/**
 * Common file extensions and their corresponding types
 */
export const FILE_EXTENSIONS = {
  // Web files
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",

  // JavaScript files
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",

  // JSON and data files
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",

  // Markdown and documentation
  md: "markdown",
  markdown: "markdown",

  // Configuration files
  config: "config",
  env: "env",
  gitignore: "gitignore",

  // Package files
  package: "package",
  lock: "lock",

  // Other common files
  txt: "text",
  log: "log",
  sql: "sql",
  py: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  php: "php",
  rb: "ruby",
  go: "go",
  rs: "rust",
  swift: "swift",
  kt: "kotlin",
} as const;

export type FileType = (typeof FILE_EXTENSIONS)[keyof typeof FILE_EXTENSIONS];

/**
 * Extracts the file type/extension from a filename
 * @param fileName - The name of the file (e.g., "component.jsx", "index.html")
 * @returns The file type/extension (e.g., "jsx", "html", "css")
 */
export function getFileType(fileName: string): string {
  if (!fileName || typeof fileName !== "string") {
    return "";
  }

  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "";
}

/**
 * Gets a more descriptive file type from a filename
 * @param fileName - The name of the file
 * @returns The descriptive file type or the extension if not recognized
 */
export function getDescriptiveFileType(fileName: string): string {
  const extension = getFileType(fileName);

  // Check if it's a recognized file type
  if (extension in FILE_EXTENSIONS) {
    return FILE_EXTENSIONS[extension as keyof typeof FILE_EXTENSIONS];
  }

  // Return the extension if not recognized
  return extension;
}

/**
 * Checks if a file is a specific type
 * @param fileName - The name of the file
 * @param fileType - The file type to check for
 * @returns True if the file is of the specified type
 */
export function isFileType(fileName: string, fileType: string): boolean {
  return getFileType(fileName) === fileType.toLowerCase();
}

/**
 * Checks if a file is a web file (html, css, js, jsx, ts, tsx)
 * @param fileName - The name of the file
 * @returns True if the file is a web file
 */
export function isWebFile(fileName: string): boolean {
  const webExtensions = [
    "html",
    "htm",
    "css",
    "scss",
    "sass",
    "less",
    "js",
    "jsx",
    "ts",
    "tsx",
  ];
  return webExtensions.includes(getFileType(fileName));
}

/**
 * Checks if a file is a React component file (jsx, tsx)
 * @param fileName - The name of the file
 * @returns True if the file is a React component
 */
export function isReactComponent(fileName: string): boolean {
  const reactExtensions = ["jsx", "tsx"];
  return reactExtensions.includes(getFileType(fileName));
}
