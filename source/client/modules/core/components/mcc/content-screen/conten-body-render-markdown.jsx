import React, { useState, useEffect } from "react";
import Showdown from "showdown";
import { Grid, Container, Paper, Typography, Divider } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const HtmlToMarkdownConverter = ({ initialHtml }) => {
  const [markdown, setMarkdown] = useState("");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
  });

  useEffect(() => {
    if (initialHtml) {
      const md = converter.makeMarkdown(initialHtml);
      setMarkdown(md);
    }
  }, [initialHtml]);

  return (
    <SyntaxHighlighter
      language="markdown"
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
      wrapLines={true}
      showLineNumbers={true}
    >
      {markdown}
    </SyntaxHighlighter>
  );
};

export default HtmlToMarkdownConverter;
