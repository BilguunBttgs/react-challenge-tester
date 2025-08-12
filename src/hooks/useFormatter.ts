"use client";

import { useCallback, useState } from "react";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";

export function useFormatter() {
  const [isFormatting, setIsFormatting] = useState(false);

  const formatContent = useCallback(
    async (filename: string, content: string) => {
      const extension = filename.split(".").pop()?.toLowerCase();
      setIsFormatting(true);
      try {
        if (extension === "html") {
          return await prettier.format(content, {
            parser: "html",
            plugins: [parserHtml],
          });
        }
        if (extension === "css") {
          return await prettier.format(content, {
            parser: "css",
            plugins: [parserCss],
          });
        }
        return content;
      } finally {
        setIsFormatting(false);
      }
    },
    []
  );

  return { isFormatting, formatContent } as const;
}
