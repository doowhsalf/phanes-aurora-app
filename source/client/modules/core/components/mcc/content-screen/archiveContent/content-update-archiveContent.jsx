import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const RequestToArchive = ({
  contentId,
  open,
  onClose,
  status, // Added prop to determine current content status
}) => {
  const [confirmationStep, setConfirmationStep] = useState(false);
  const isArchived = status === "archived"; // Determine if content is already archived

  const handleConfirmAction = () => {
    setConfirmationStep(true);
  };

  const handleAction = () => {
    const fieldsToUpdate = { status: isArchived ? "active" : "archived" };
    // Update the content status based on current status
    Meteor.call(
      "content.update",
      contentId,
      "Update status to " + status,
      fieldsToUpdate,
      (error) => {
        if (error) {
          alert("Error updating content status.");
        } else {
          onClose(); // Close dialog after changing the status
        }
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isArchived ? "Reactivate Content" : "Archive Content"}
      </DialogTitle>
      <DialogContent>
        {!confirmationStep ? (
          <p>
            Are you sure you want to {isArchived ? "reactivate" : "archive"}{" "}
            this content?
          </p>
        ) : (
          <p>
            Are you really sure you want to{" "}
            {isArchived ? "reactivate" : "archive"} this content?
          </p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!confirmationStep ? (
          <Button onClick={handleConfirmAction}>Yes</Button>
        ) : (
          <>
            <Button onClick={() => setConfirmationStep(false)}>No</Button>
            <Button onClick={handleAction}>Yes, I'm sure</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RequestToArchive;
