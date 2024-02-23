import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditArticleCode from "./editArticleCode"; // Adjust the import path as needed

const ParentComponent = ({ initialCodes }) => {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState(initialCodes);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateCodes = (updatedCodes) => {
    setCodes(updatedCodes);
    // You can also close the dialog after updating the codes
    // handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Codes
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Article Codes</DialogTitle>
        <DialogContent>
          <EditArticleCode existingCodes={codes} onUpdate={handleUpdateCodes} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParentComponent;
