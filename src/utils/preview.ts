export function buildPreviewDocument(
  filename: string,
  content: string
): string {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (extension === "html") return content;

  if (extension === "css") {
    return `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style>\n${content}\n    </style>\n  </head>\n  <body>\n  </body>\n</html>`;
  }

  if (extension === "js") {
    return `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n  </head>\n  <body>\n    <div id="app"></div>\n    <script>\n${content}\n    </script>\n  </body>\n</html>`;
  }

  const escaped = content
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style>body{font-family: ui-sans-serif, system-ui, sans-serif; padding: 16px;}</style>\n  </head>\n  <body>\n    <pre>${escaped}</pre>\n  </body>\n</html>`;
}
