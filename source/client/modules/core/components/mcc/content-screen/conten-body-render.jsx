import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DocumentRenderer = ({ contentNode }) => {
  const theme = useTheme();

  // Custom style to ensure line wrapping
  const customStyle = {
    ...materialDark, // Spread the existing style
    'pre[class*="language-"]': {
      whiteSpace: "pre-wrap !important",
      wordBreak: "break-word !important",
      overflowWrap: "break-word !important",
    },
  };

  // Function to convert HTML code to readable format
  const formatHTML = (html) => {
    // You can add more logic here to format HTML as needed
    return html;
  };

  return (
    <SyntaxHighlighter
      language="html"
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
      wrapLines={true}
      showLineNumbers={true}
    >
      {formatHTML(contentNode.body)}
    </SyntaxHighlighter>
  );
};

export default DocumentRenderer;
