import React, { useState } from "react";
import {
  Chip,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const EditArticleCode = ({ existingCodes, onUpdate }) => {
  const [currentCode, setCurrentCode] = useState("");
  const [editIndex, setEditIndex] = useState(-1); // -1 for add mode, index for edit mode
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState(null);

  const handleAddOrUpdateCode = () => {
    if (currentCode.trim() === "") {
      alert("Code cannot be empty.");
      return;
    }
    const updatedCodes = [...existingCodes];
    if (editIndex >= 0) {
      // Update existing code
      updatedCodes[editIndex] = currentCode.toUpperCase();
    } else {
      // Add new code
      if (existingCodes.includes(currentCode.toUpperCase())) {
        alert("This code already exists.");
        return;
      }
      updatedCodes.push(currentCode.toUpperCase());
    }
    onUpdate(updatedCodes);
    setCurrentCode("");
    setEditIndex(-1); // Reset to add mode
  };

  const handleEdit = (code, index) => {
    setCurrentCode(code);
    setEditIndex(index); // Set index for edit mode
  };

  const handleDeleteConfirmation = (code) => {
    setCodeToDelete(code);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    const updatedCodes = existingCodes.filter((c) => c !== codeToDelete);
    onUpdate(updatedCodes);
    setDeleteConfirmOpen(false);
  };

  const handleCloseDeleteConfirmDialog = () => {
    setDeleteConfirmOpen(false);
    setCodeToDelete(null);
  };

  return (
    <>
      <Stack spacing={1} marginBottom={2}>
        {existingCodes.map((code, index) => (
          <Chip
            key={code}
            label={code}
            onClick={() => handleEdit(code, index)}
            onDelete={() => handleDeleteConfirmation(code)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value.toUpperCase())}
          label="Code"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddOrUpdateCode}
        >
          {editIndex >= 0 ? "Update" : "Add"}
        </Button>
      </Stack>
      <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteConfirmDialog}>
        <DialogTitle>{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this code? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditArticleCode;
