"use client";

import { CodeEditor } from "@/app/components";

export function EditorPane({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return <CodeEditor value={value} onChange={(v) => onChange(v ?? "")} />;
}
