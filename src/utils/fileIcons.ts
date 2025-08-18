export function getFileIcon(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "html":
      return "🌐";
    case "css":
      return "🎨";
    case "js":
      return "⚡";
    case "jsx":
      return "🫆";
    default:
      return "📄";
  }
}

/**
 * Extracts the file type/extension from a filename
 * @param fileName - The name of the file (e.g., "component.jsx", "index.html")
 * @returns The file type/extension (e.g., "jsx", "html", "css")
 */
export function getFileType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "";
}
