import React, { useState } from "react";
import {
  Dialog,
  Button,
  Typography,
  Checkbox,
  Divider,
  CardActions,
  FormControlLabel,
} from "@mui/material";
import TreeViewComponent from "./pod-exportcenter-query-tree"; // Importing the treeview component
import TreeDialog from "./pod-exportcenter-query-dialog-tree"; // Importing the treeview component

function QueryContainer() {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectionChange = (items) => {
    setSelectedItems(items);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Typography variant="body1" gutterBottom>
          Selected Meters:
        </Typography>

        <Typography variant="body2" gutterBottom>
          {selectedItems.join(", ")}
        </Typography>
        <Divider />
      </div>
      <CardActions style={{ marginTop: "auto", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleOpen}>
          Select Meters
        </Button>
      </CardActions>
      <TreeDialog
        styles={{ minWidth: "500px" }}
        open={open}
        handleClose={handleClose}
        onSelectionChange={handleSelectionChange}
      ></TreeDialog>
    </div>
  );
}

export default QueryContainer;
