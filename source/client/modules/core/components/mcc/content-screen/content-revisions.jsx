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
} from "@mui/material";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";
import LanguageAvatar from "./languageAvatar";
import ChangeRevisionLanguage from "./changeRevisionLanguage/content-update-RevisionLanguage-proxy";
import EditContent from "./editContent/content-update-editContent-proxy";
import {
  getField,
  getFieldObject,
  getFieldDate,
  getFieldDateTime,
  getFieldBoolean,
} from "../../helpers/getField";


const DocumentRevisions = ({ contentNode, onSelect }) => {
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("version");

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

  const handleRowClick = (revision) => {
    if (onSelect) onSelect(revision);
  };

  return (
    <Paper style={{ height: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Version",
              "Language",
              "Update mode",
              "Translation status",
              "Updated At",
              "Edit ",
              "Switch language",
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
          {stableSort(contentNode.revisions, getComparator(order, orderBy)).map(
            (revision, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleRowClick(revision)}
              >
                <TableCell>{revision.version}</TableCell>
                <TableCell>
                  <LanguageAvatar languageCode={revision.language} small />
                </TableCell>
                <TableCell>{getField(revision, "updateMode")}</TableCell>
                <TableCell>{revision.translationStatus}</TableCell>
                <TableCell>
                  <TimeAgoLive
                    dateToProcess={formatTimeAgo(revision.updatedAt)}
                  />
                </TableCell>
                {/* make edit possible if the revision langauge is equal with the masterlanguage */}
                <TableCell>
                  {revision.language === contentNode.masterLanguage ? (
                    <EditContent
                      contentId={contentNode._id}
                      content={revision}
                      revisionIndex={index}
                    ></EditContent>
                  ) : null}
                </TableCell>
                <TableCell>
                  <ChangeRevisionLanguage
                    contentId={contentNode._id}
                    currentLanguage={revision.language}
                    languages={contentNode.languages}
                    onLanguageChange={(newLanguage) => {
                      console.log("newLanguage", newLanguage);
                    }}
                    revisonIndex={index}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DocumentRevisions;
