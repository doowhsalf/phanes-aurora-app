import React, { useState } from "react";
import { Dialog, DialogTitle, Button, IconButton } from "@mui/material";
import ExportTable from "./export-data";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const TableDialog = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
 
  //   Sample data
  //   const data = [
  //     { name: "Alice", age: 25, city: "New York" },
  //     { name: "Bob", age: 30, city: "Chicago" },
  //     { name: "Charlie", age: 35, city: "San Francisco" },
  //   ];

  console.log("Export");
  console.log("data", data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const transformData = (data) => {
    if (!data || !data.dates || !data.values) {
      console.error("Data, dates, or values is undefined");
      return [];
    }

    let transformedData = [];

    for (let i = 0; i < data.dates.length; i++) {
      transformedData.push({
        date: data.dates[i],
        value: data.values[i],
      });
    }

    return transformedData;
  };

  return (
    <div>
      <Button
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={handleClickOpen}
      >
        Export
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
        // PaperProps={{
        //   style: {
        //     height: "90%",
        //     width: "90%",
        //     maxHeight: "none",
        //     maxWidth: "none",
        //   },
        // }}
      >
        <DialogTitle>
          Export Data
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {data ? (
          <ExportTable data={transformData(data)} />
        ) : (
          <div>Loading data...</div>
        )}
      </Dialog>
    </div>
  );
};

export default TableDialog;
