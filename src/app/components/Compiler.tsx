"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft, FileText, Folder, Loader2, Send } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import axios from "axios";
import { Challenge, challenges } from "@/lib/constants";

import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";

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

  const handleFormat = async () => {
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    const content = fileContents[selectedFileId] || "";

    try {
      if (extension === "html") {
        const formattedHtml = await prettier.format(content, {
          parser: "html",
          plugins: [parserHtml],
        });
        setFileContents((prev) => ({
          ...prev,
          [selectedFileId]: formattedHtml,
        }));
        return;
      }

      if (extension === "css") {
        const formattedCss = await prettier.format(content, {
          parser: "css",
          plugins: [parserCss],
        });
        setFileContents((prev) => ({
          ...prev,
          [selectedFileId]: formattedCss,
        }));
        return;
      }
    } catch (error) {
      console.error("Format error:", error);
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

  const getPreviewContent = () => {
    if (!selectedFile) return "";

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    const content = fileContents[selectedFileId] || "";

    if (extension === "html") {
      return content;
    }

    if (extension === "css") {
      return `<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <style>\n${content}\n    </style>\n  </head>\n  <body>\n  </body>\n</html>`;
    }

    if (extension === "js") {
      return `<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script>\n${content}\n    </script>\n  </body>\n</html>`;
    }

    // Fallback: render as plain text inside a pre tag
    const escaped = content
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    return `<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <style>body{font-family: ui-sans-serif, system-ui, sans-serif; padding: 16px;}</style>\n  </head>\n  <body>\n    <pre>${escaped}</pre>\n  </body>\n</html>`;
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
                onClick={handleFormat}
                variant="ghost"
                size="sm"
                className="m-2 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <AlignLeft />
                Format
              </Button>
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
                  <Send />
                )}
                Send
              </Button>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4 flex">
          <div className="flex-1">
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
          </div>
          <div className="flex-1 max-h-[600px] bg-gray-800 border border-gray-700 rounded overflow-hidden">
            <iframe
              height={600}
              title="Preview"
              className="w-full h-full bg-white"
              sandbox="allow-scripts allow-modals"
              srcDoc={getPreviewContent()}
            />
          </div>
        </div>
        {result && (
          <>
            <div>Success: {result.passed} ✅</div>
            <div>Failed: {result.failed} ❌</div>
          </>
        )}
      </div>
    </div>
  );
}
