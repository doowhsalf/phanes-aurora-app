import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { isObject, last } from "lodash";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import MatrixRender from "./matrix_render";
import Divider from "@mui/material/Divider";
// import TimeAgoLive from "../../fields/timeagolive/timeagolive";
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

const CustomAvatar = ({ icon: IconComponent }) => {
  const theme = useTheme();

  return (
    <Avatar
      style={{
        backgroundColor: theme.palette.primary.light,
        marginRight: theme.spacing(1),
        height: theme.spacing(4.5),
        width: theme.spacing(4.5),
      }}
    >
      <IconComponent />
    </Avatar>
  );
};

const DocumentRenderer = ({ node, title, suppress, force }) => {
  const theme = useTheme();
  const labelColor = theme.palette.text.primary;
  const valueColor = theme.palette.success.main;
  const secondaryLightColor = theme.palette.success.light;
  const secondaryLightColorError = theme.palette.error.light;
  const headerColor = theme.palette.primary.light;
  const secondaryLightColorInfo = theme.palette.info.light;

  // make sure ActionLog is not undefined
  if (node.labelText === undefined || node === undefined) {
    return (
      <div>
        <Typography
          style={{ color: secondaryLightColor }}
          variant="caption"
          display="block"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          No data to render
        </Typography>
      </div>
    );
  }

  if (!isObject(node) || Object.keys(node).length === 0) {
    return (
      <div>
        <Typography
          style={{ color: secondaryLightColor }}
          variant="caption"
          display="block"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          No data to render
        </Typography>
      </div>
    );
  }

  let matrixDataBlock1 = {
    labels: ["Name", "ID", "Info"],
    values: [
      node.labelText !== undefined ? node.labelText : "Name missing",
      node.nodeId !== undefined ? node.nodeId : "No nodeId",
      node.labelInfo,
    ],
  };

  let matrixDataBlock2 = {
    labels: ["Publish id", "nodeid"],
    values: [node.nodeId, node.labelInfo],
  };

  // set cardHeader to template name,
  return (
    <Box
      sx={{ cursor: "pointer" }}
      onClick={(event) => handleClick(event, node._id)}
    >
      <div style={{ display: "flex", alignItems: "left" }}>
        <CustomAvatar icon={node.labelIcon}></CustomAvatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            style={{ color: secondaryLightColor }}
            variant="caption"
            component="div"
          >
            {node.labelText}
          </Typography>
          <Typography
            style={{ color: headerColor }}
            variant="caption"
            component="div"
          >
            {node.labelInfo}
          </Typography>
        </div>
      </div>
      <Typography
        style={{ color: secondaryLightColor }}
        variant="caption"
        component="div"
      >
        {node.labelInfo}
      </Typography>
      <Divider
        style={{
          marginTop: 4,
          marginBottom: 4,
          bnodeTop: "dotted 1px",
          bnodeColor: "rgba(128, 128, 128, 0.55)",
        }}
      />
      <div>
        <MatrixRender data={matrixDataBlock1} />
      </div>{" "}
      <div>
        <MatrixRender data={matrixDataBlock2} />
      </div>
      <Divider
        style={{
          marginTop: 4,
          marginBottom: 4,
          bnodeTop: "dotted 1px",
          bnodeColor: "rgba(128, 128, 128, 0.55)",
        }}
      />
    </Box>
  );
};

export default DocumentRenderer;
