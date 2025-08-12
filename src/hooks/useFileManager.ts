"use client";

import { useMemo, useState } from "react";
import type { Challenge } from "@/lib/constants";

export function useFileManager(initialFiles: Challenge[]) {
  const [files] = useState<Challenge[]>(initialFiles);
  const [selectedFileId, setSelectedFileId] = useState<string>(
    initialFiles[0]?.id ?? ""
  );
  const [fileContents, setFileContents] = useState<Record<string, string>>(
    () => {
      const contents: Record<string, string> = {};
      initialFiles.forEach((file) => {
        contents[file.id] = file.content;
      });
      return contents;
    }
  );

  const selectedFile = useMemo(
    () => files.find((f) => f.id === selectedFileId),
    [files, selectedFileId]
  );

  const updateSelectedFileContent = (content: string) => {
    setFileContents((prev) => ({ ...prev, [selectedFileId]: content }));
  };

  return {
    files,
    selectedFileId,
    setSelectedFileId,
    fileContents,
    setFileContents,
    selectedFile,
    updateSelectedFileContent,
  } as const;
}
