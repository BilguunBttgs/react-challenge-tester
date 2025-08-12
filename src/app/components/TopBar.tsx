"use client";

import { Button } from "@/components/ui/button";
import { AlignLeft, Loader2, Send } from "lucide-react";

export function TopBar({
  filename,
  onFormat,
  onSend,
  isSending,
}: {
  filename: string | undefined;
  onFormat: () => void;
  onSend: () => void;
  isSending: boolean;
}) {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      {filename && (
        <div className="flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700">
            <span className="text-sm">{filename}</span>
          </div>
          <div className="flex-1" />
          <Button
            onClick={onFormat}
            variant="ghost"
            size="sm"
            className="m-2 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <AlignLeft />
            Format
          </Button>
          <Button
            onClick={onSend}
            variant="ghost"
            size="sm"
            disabled={isSending}
            className="m-2 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send />
            )}
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
