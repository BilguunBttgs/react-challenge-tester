"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { challenges } from "@/lib/constants";
import { useFileManager } from "@/hooks/useFileManager";
import { useFormatter } from "@/hooks/useFormatter";
import { runTests, type TestRunResult } from "@/services/runTests";
import { Explorer } from "@/app/components/Explorer";
import { TopBar } from "@/app/components/TopBar";
import { EditorPane } from "@/app/components/EditorPane";
import { PreviewPane } from "@/app/components/PreviewPane";

export function Compiler() {
  const {
    files,
    selectedFileId,
    setSelectedFileId,
    fileContents,
    updateSelectedFileContent,
    selectedFile,
  } = useFileManager(challenges);
  const { formatContent } = useFormatter();
  const [result, setResult] = useState<TestRunResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  const handleContentChange = (content: string) => {
    updateSelectedFileContent(content);
  };

  const handleSave = async () => {
    setLoading(true);
    setResult(null);
    const output = await runTests({
      code: fileContents[selectedFileId],
      test: selectedFile?.test,
    });
    setResult(output);
    setLoading(false);
  };

  const handleFormat = async () => {
    if (!selectedFile) return;
    const formatted = await formatContent(
      selectedFile.name,
      fileContents[selectedFileId] || ""
    );
    updateSelectedFileContent(formatted);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Explorer
        files={files}
        selectedFileId={selectedFileId}
        onSelect={handleFileSelect}
      />
      <div className="flex-1 flex flex-col">
        <TopBar
          filename={selectedFile?.name}
          onFormat={handleFormat}
          onSend={handleSave}
          isSending={loading}
        />
        <div className="flex-1 p-4 flex">
          <div className="flex-1">
            {selectedFile ? (
              <EditorPane
                value={fileContents[selectedFileId] || ""}
                onChange={(value: string) => handleContentChange(value)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a file to start editing</p>
                </div>
              </div>
            )}
          </div>
          <PreviewPane
            filename={selectedFile?.name ?? ""}
            content={fileContents[selectedFileId] || ""}
          />
        </div>
        {result && (
          <div className="px-4 pb-4 flex gap-4">
            <div>Success: {result.passed} ✅</div>
            <div>Failed: {result.failed} ❌</div>
          </div>
        )}
      </div>
    </div>
  );
}
