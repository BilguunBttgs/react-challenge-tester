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
