import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Meteor } from "meteor/meteor";

const CloneDocumentButton = ({ contentId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloneDocument = () => {
    // Call the Meteor method to clone the document
    Meteor.call("content.cloneArticle", contentId, "Cloned a document", (error, response) => {
      if (error) {
        console.error("Error cloning the article:", error);
      } else {
        console.log("Article cloned successfully, new article ID:", response);
        handleCloseDialog();
        // got to the new article
        window.location.href = "/content/" + response;
      }
    });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Clone Document
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Clone Document</DialogTitle>
        <DialogContent>
          Are you sure you want to clone this document?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloneDocument}>Clone</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CloneDocumentButton;
