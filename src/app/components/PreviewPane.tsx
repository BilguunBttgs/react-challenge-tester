"use client";

import { buildPreviewDocument } from "../../utils/preview";

export function PreviewPane({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  return (
    <div className="flex-1 max-h-[600px] bg-gray-800 border border-gray-700 rounded overflow-hidden">
      <iframe
        height={600}
        title="Preview"
        className="w-full h-full bg-white"
        sandbox="allow-scripts allow-modals"
        srcDoc={buildPreviewDocument(filename, content)}
      />
    </div>
  );
}
