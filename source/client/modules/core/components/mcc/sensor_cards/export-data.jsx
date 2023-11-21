import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  DialogActions,
  DialogContent,
} from "@mui/material";

import PublishDataDialog from "./publish-data-dialog";

const ExportTable = ({ data }) => {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  const openPublishDialog = () => {
    setPublishDialogOpen(true);
  };

  const closePublishDialog = () => {
    setPublishDialogOpen(false);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataBlob, fileName + fileExtension);
  };

  const exportToJSON = (jsonData, fileName) => {
    const dataStr = JSON.stringify(jsonData);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    FileSaver.saveAs(dataBlob, fileName + ".json");
  };

  const exportToCSV = (csvData, fileName) => {
    const csv = convertToCSV(csvData);
    const dataBlob = new Blob([csv], { type: "text/csv" });
    FileSaver.saveAs(dataBlob, fileName + ".csv");
  };

  const exportToXML = (xmlData, fileName) => {
    const xml = convertToXML(xmlData);
    const dataBlob = new Blob([xml], { type: "application/xml" });
    FileSaver.saveAs(dataBlob, fileName + ".xml");
  };

  const convertToCSV = (arr) => {
    const header = Object.keys(arr[0]).join(",");
    const rows = arr.map((row) => Object.values(row).join(",")).join("\n");
    return header + "\n" + rows;
  };

  const convertToXML = (json) => {
    let xml = '<?xml version="1.0" encoding="UTF-8" ?><root>';
    json.forEach((item) => {
      xml += "<item>";
      for (let key in item) {
        xml += `<${key}>${item[key]}</${key}>`;
      }
      xml += "</item>";
    });
    xml += "</root>";
    return xml;
  };

  return (
    <div>
      <DialogContent dividers style={{ overflow: "hidden" }}>
        <div style={{ maxHeight: "80vh", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, i) => (
                    <TableCell key={i}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => exportToExcel(data, "data")}>
          Export to Excel
        </Button>
        <Button variant="outlined" onClick={() => exportToJSON(data, "data")}>
          Export to JSON
        </Button>
        <Button variant="outlined" onClick={() => exportToCSV(data, "data")}>
          Export to CSV
        </Button>
        <Button variant="outlined" onClick={() => exportToXML(data, "data")}>
          Export to XML
        </Button>
        <Button variant="outlined" onClick={openPublishDialog}>
          Publish to channel
        </Button>
      </DialogActions>
      <PublishDataDialog
        open={publishDialogOpen}
        onClose={closePublishDialog}
      />
    </div>
  );
};

export default ExportTable;
