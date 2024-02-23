import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EditArticleCode from "../editArticleCode/editArticleCode"; // Adjust the path as needed
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

const DocumentRenderer = ({ contentNode }) => {
  const [articleCodes, setArticleCodes] = useState(
    contentNode.articleCode || []
  );

  const handleUpdateArticleCodes = (newCodes) => {
    DEFCON5 && console.log("Updating article codes", newCodes);
    setArticleCodes(newCodes); // This updates the state asynchronously
    const fieldsToUpdate = { articleCode: newCodes }; // Use newCodes directly

    Meteor.call(
      "content.update",
      contentNode._id,
      "Update article codes",
      fieldsToUpdate,
      (error, result) => {
        if (error) {
          DEFCON5 && console.error("Failed to update article codes:", error);
        } else {
          DEFCON5 && console.log("Article codes updated successfully:", result);
        }
      }
    );
  };


  // Render article codes or a message if none are provided
  const renderArticleCodes = () => {
    if (articleCodes.length === 0) {
      return <Typography variant="caption">No code given</Typography>;
    } else {
      return articleCodes.map((code, index) => (
        <Typography key={index} variant="caption" display="block">
          {code}
        </Typography>
      ));
    }
  };

  return (
    <Box>
      {/* Other content details */}
      <Typography variant="subtitle1">Article Codes:</Typography>
      <EditArticleCode
        existingCodes={articleCodes}
        onUpdate={handleUpdateArticleCodes}
      />
    </Box>
  );
};

export default DocumentRenderer;
