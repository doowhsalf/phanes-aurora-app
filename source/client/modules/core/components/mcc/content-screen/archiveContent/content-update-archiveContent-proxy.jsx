import React, { useState } from "react";
import Button from "@mui/material/Button";
import RequestToArchive from "./content-update-archiveContent"; // Adjust the import path as needed
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
// Assuming this component now triggers archive/reactivate dialog
const ContentStatusToggleProxy = ({
  contentId,
  status, // Current status of the content
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const actionLabel =
    status === "archived" ? "Reactivate Content" : "Archive Content";

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog } startIcon={status === "archived" ? <UnarchiveIcon /> : <ArchiveIcon />}>
        {actionLabel}
      </Button>
      <RequestToArchive
        contentId={contentId}
        open={dialogOpen}
        onClose={handleCloseDialog}
        status={status}
      />
    </>
  );
};

export default ContentStatusToggleProxy;
