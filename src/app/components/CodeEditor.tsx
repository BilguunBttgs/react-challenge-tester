"use client";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export const CodeEditor = ({
  value,
  onChange,
  fileType,
}: {
  value: string;
  onChange: (_value: string | undefined) => void;
  fileType: string;
}) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.React,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        allowJs: true,
        checkJs: false,
        noEmit: true,
      });
    }
  }, [monaco]);

  return (
    <Editor
      value={value}
      defaultLanguage={fileType === "jsx" ? "typescript" : "html"}
      onChange={onChange}
      theme="vs-dark"
      height={600}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};
