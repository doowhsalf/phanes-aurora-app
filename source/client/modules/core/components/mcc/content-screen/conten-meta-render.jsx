import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { forEach, isObject, last } from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import MatrixRender from "../matrix_render";
import Divider from "@mui/material/Divider";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";
import { Avatar } from "@mui/material";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import CardHeader from "@mui/material";
import {
  getField,
  getFieldBoolean,
  getFieldDate,
} from "../../helpers/getField";
import LanguageAvatar from "./languageAvatar";

const DocumentRenderer = ({ contentNode, title, suppress, force }) => {
  const theme = useTheme();
  const labelColor = theme.palette.text.primary;
  const valueColor = theme.palette.success.main;
  const secondaryLightColor = theme.palette.success.light;
  const secondaryLightColorError = theme.palette.error.light;
  const headerColor = theme.palette.primary.light;
  const secondaryLightColorInfo = theme.palette.info.light;

  let lastTimestamp =
    contentNode.updatedAt !== undefined
      ? contentNode.updatedAt
      : new Date().toISOString();

  DEFCON7 && console.log(lastTimestamp);
  // set TimeAgoDate to CET
  let timeAgoDate = new Date(lastTimestamp);

  let suppressDefault = [];
  let forceDefault = [];
  if (suppress) {
    suppressDefault = suppress;
  }

  if (suppressDefault.includes("*")) {
    suppressDefault = Object.keys(order);
  }

  if (force) {
    forceDefault = force;
  }

  let stateColor = secondaryLightColorError;

  suppressDefault = suppressDefault.filter(
    (key) => !forceDefault.includes(key)
  );

  let matrixDataBlock1 = {
    labels: [
      "Id",
      "Version",
      "Type of article",
      "Master Language",
      "Publish status",
      "Status",
    ],
    values: [
      getField(contentNode, "_id"),
      getField(contentNode, "version"),
      getField(contentNode, "typeOfArticle"),
      <LanguageAvatar languageCode={contentNode.masterLanguage} small />,
      getField(contentNode, "publish_status"),
      getField(contentNode, "status"),
    ],
  };
  let matrixDataBlock2 = {
    labels: ["Created by", "Updated by", "Created at", "Updated at"],
    values: [
      getField(contentNode, "createdBy"),
      getField(contentNode, "updatedBy"),
      getFieldDate(contentNode, "createdAt"),
      getFieldDate(contentNode, "updatedAt"),
    ],
  };

  // render language avatar for each language, store it in a horizontal flexbox
  const languageRender = contentNode.languages.map((language, outerIndex) => (
    // Split the code into an array of strings separated by a comma
    <React.Fragment key={outerIndex}>
      <LanguageAvatar languageCode={language.code} small />
    </React.Fragment>
  ));

  return (
    <>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={(event) => handleClick(event, contentNode._id)}
      >
        <MatrixRender data={matrixDataBlock1} />{" "}
        <Divider
          style={{
            marginTop: 4,
            marginBottom: 4,
            borderTop: "dotted 1px",
            borderColor: "rgba(128, 128, 128, 0.55)",
          }}
        />
        <div>
          <MatrixRender data={matrixDataBlock2} />
        </div>
        <Divider
          style={{
            marginTop: 4,
            marginBottom: 4,
            borderTop: "dotted 1px",
            borderColor: "rgba(128, 128, 128, 0.55)",
          }}
        />
        <Typography
          styles={{ fontSize: "8px", marginBottom: "4px" }}
          variant="caption"
          component="div"
          gutterBottom
        >
          Supported languages
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {languageRender}
        </div>
        <Typography
          styles={{ fontSize: "8px" }}
          variant="caption"
          component="div"
        >
          <TimeAgoLive dateToProcess={timeAgoDate} /> -{" "}
          {lastTimestamp.substring(0, 16)}
        </Typography>
      </Box>
    </>
  );
};

export default DocumentRenderer;
