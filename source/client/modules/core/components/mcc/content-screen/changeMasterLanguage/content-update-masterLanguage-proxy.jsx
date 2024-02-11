import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChangeMasterLanguageDialog from "./content-update-masterLanguage"; // Adjust the import path as needed

// This proxy component receives the current language, available languages, and a callback function to handle the language change
const ChangeMasterLanguageProxy = ({
  contentId,
  currentLanguage,
  languages,
  onLanguageChange,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Change Master Language
      </Button>
      <ChangeMasterLanguageDialog
        contentId={contentId}
        open={dialogOpen}
        onClose={handleCloseDialog}
        languages={languages}
        currentLanguage={currentLanguage}
        onChange={(newLanguage) => {
          onLanguageChange(newLanguage);
          handleCloseDialog();
        }}
      />
    </>
  );
};

export default ChangeMasterLanguageProxy;
