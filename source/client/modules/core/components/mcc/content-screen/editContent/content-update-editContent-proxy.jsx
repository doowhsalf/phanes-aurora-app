import React, { useState } from "react";
import Button from "@mui/material/Button";
import RequestToEdit from "./content-update-editContent"; // Adjust the import path as needed
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
// Assuming this component now triggers archive/reactivate dialog
const ContentEditProxy = ({ contentId, content, revisionIndex }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const actionLabel = "Edit Content";

  return (
    <>
      <IconButton onClick={handleOpenDialog} aria-label="edit Content">
        <EditNoteIcon />
        {/* Replace EditIcon with UpdateIcon or any other icon as needed */}
      </IconButton>
      <RequestToEdit
        contentId={contentId}
        open={dialogOpen}
        onClose={handleCloseDialog}
        content={content}
        revisionIndex={revisionIndex}
      />
    </>
  );
};

export default ContentEditProxy;
