import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit"; // or UpdateIcon for a different style
import LanguageIcon from "@mui/icons-material/Language";
import ChangeLanguageDialog from "./content-update-RevisionLanguage"; // Adjust the import path as needed

const ChangeMasterLanguageProxy = ({
  contentId,
  currentLanguage,
  languages,
  onLanguageChange,
  revisonIndex,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // print all the props to the console
  console.log("currentLanguage", currentLanguage);
  console.log("languages", languages);
  //console.log("onLanguageChange", onLanguageChange);
  console.log("revisonIndex", revisonIndex);



  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenDialog}
        aria-label="change revision language"
      >
        <LanguageIcon />
        {/* Replace EditIcon with UpdateIcon or any other icon as needed */}
      </IconButton>
      <ChangeLanguageDialog
        contentId={contentId}
        open={dialogOpen}
        onClose={handleCloseDialog}
        languages={languages}
        currentLanguage={currentLanguage}
        revisonIndex={revisonIndex}
        onChange={(newLanguage) => {
          onLanguageChange(newLanguage);
          handleCloseDialog();
        }}
      />
    </>
  );
};

export default ChangeMasterLanguageProxy;
