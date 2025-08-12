"use client";

import { Folder } from "lucide-react";
import { getFileIcon } from "../../utils/fileIcons";
import type { Challenge } from "@/lib/constants";

export function Explorer({
  files,
  selectedFileId,
  onSelect,
}: {
  files: Challenge[];
  selectedFileId: string;
  onSelect: (fileId: string) => void;
}) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4" />
          <span className="text-sm font-medium">EXPLORER</span>
        </div>
      </div>

      <div className="p-2">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-2">
          Files
        </div>

        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => onSelect(file.id)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm rounded hover:bg-gray-700 transition-colors ${
              selectedFileId === file.id
                ? "bg-gray-700 text-white"
                : "text-gray-300"
            }`}
          >
            <span className="text-base">{getFileIcon(file.name)}</span>
            <span>{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
