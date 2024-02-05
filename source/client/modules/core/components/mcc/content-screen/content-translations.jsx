import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Tab,
} from "@mui/material";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";

const DocumentTranslations = ({ contentNode }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("version");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const formatTimeAgo = (dateString) => {
    let lastTimestamp =
      dateString !== undefined ? dateString : new Date().toISOString();
    return new Date(lastTimestamp);
  };

  return (
    <Paper style={{ height: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "version",
              "language",
              "title",
              "updatedAt",
              "updatedBy",
              "translation_status",
            ].map((headCell) => (
              <TableCell
                key={headCell}
                sortDirection={orderBy === headCell ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell}
                  direction={orderBy === headCell ? order : "asc"}
                  onClick={() => handleRequestSort(headCell)}
                >
                  {headCell}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(
            contentNode.translations,
            getComparator(order, orderBy)
          ).map((translation, index) => (
            <TableRow key={index}>
              <TableCell>{translation.version}</TableCell>{" "}
              <TableCell>{translation.language}</TableCell>
              <TableCell>{translation.title}</TableCell>
              <TableCell>
                <TimeAgoLive
                  dateToProcess={formatTimeAgo(translation.updatedAt)}
                />
                
              </TableCell>
              <TableCell>{translation.updatedBy}</TableCell>
              <TableCell>{translation.translation_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DocumentTranslations;
