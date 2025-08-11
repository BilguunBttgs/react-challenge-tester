"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Folder, Loader2, Send } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import axios from "axios";
import { Challenge, challenges } from "@/lib/constants";

// Create a button that increases a counter when clicked.
export function Compiler() {
  const [files] = useState<Challenge[]>(challenges);

  const [selectedFileId, setSelectedFileId] = useState<string>("1");
  const [fileContents, setFileContents] = useState<Record<string, string>>(
    () => {
      const contents: Record<string, string> = {};
      files.forEach((file) => {
        contents[file.id] = file.content;
      });
      return contents;
    }
  );

  const selectedFile = files.find((file) => file.id === selectedFileId);
  const [result, setResult] = useState<{
    failed: number;
    passed: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (fileId: string) => {
    setSelectedFileId(fileId);
  };

  const handleContentChange = (content: string) => {
    setFileContents((prev) => ({
      ...prev,
      [selectedFileId]: content,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post(
        "https://aegis-insurance-mongolia.app.n8n.cloud/webhook-test/9035824f-7f7e-4a3a-a566-333ca29b9e63",
        {
          code: fileContents[selectedFileId],
          test: selectedFile?.test,
        }
      );
      console.log(data["object Object"].output);
      setResult(data["object Object"].output);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
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
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar - File Explorer */}
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
              onClick={() => handleFileSelect(file.id)}
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

      {/* Right Side - Editor */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="bg-gray-800 border-b border-gray-700">
          {selectedFile && (
            <div className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700">
                <span className="text-base">
                  {getFileIcon(selectedFile.name)}
                </span>
                <span className="text-sm">{selectedFile.name}</span>
              </div>
              <div className="flex-1"></div>
              <Button
                onClick={handleSave}
                variant="ghost"
                size="sm"
                disabled={loading}
                className="m-2 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Send
              </Button>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4">
          {selectedFile ? (
            <CodeEditor
              value={fileContents[selectedFileId] || ""}
              onChange={(value: string | undefined) =>
                handleContentChange(value!)
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a file to start editing</p>
              </div>
            </div>
          )}
          {result && (
            <>
              <div>Success: {result.passed} ✅</div>
              <div>Failed: {result.failed} ❌</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
