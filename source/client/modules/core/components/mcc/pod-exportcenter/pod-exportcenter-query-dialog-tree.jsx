import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tree from "./pod-exportcenter-query-tree"; // Importing the treeview component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  minWidth: "480px", // Added this line
}));

export default function CustomizedDialogs({
  onSelectionChange,
  open,
  handleClose,
}) {
  const [tempSelectedItems, setTempSelectedItems] = useState([]);

  const handleTreeSelectionChange = (items) => {
    setTempSelectedItems(items);
  };

  const handleSaveChanges = () => {
    onSelectionChange(tempSelectedItems);
    handleClose();
  };

  return <>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{ style: { minWidth: "480px" } }} // Adjust the PaperProps
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Select Sensors
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        size="large">
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Tree onSelectionChange={handleTreeSelectionChange}></Tree>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  </>;
}
