"use client";

import { getFileType } from "@/utils/fileTypes";
import { buildPreviewDocument } from "../../utils/preview";
import { LiveProvider, LivePreview, LiveError } from "react-live";

export function PreviewPane({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  return (
    <div className="flex-1 max-h-[600px] bg-gray-800 border border-gray-700 rounded overflow-hidden">
      {getFileType(filename) === "jsx" && (
        <LiveProvider code={content} noInline>
          <LivePreview />
          <div className="text-red-500">
            <LiveError />
          </div>
        </LiveProvider>
      )}
      {getFileType(filename) === "html" && (
        <iframe
          height={600}
          title="Preview"
          className="w-full h-full bg-white"
          sandbox="allow-scripts allow-modals"
          srcDoc={buildPreviewDocument(filename, content)}
        />
      )}
    </div>
  );
}
