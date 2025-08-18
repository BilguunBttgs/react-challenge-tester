"use client";

import { CodeEditor } from "@/app/components";

export function EditorPane({
  value,
  onChange,
  fileType,
}: {
  value: string;
  fileType: string;
  onChange: (value: string) => void;
}) {
  return (
    <CodeEditor
      fileType={fileType}
      value={value}
      onChange={(v) => onChange(v ?? "")}
    />
  );
}
