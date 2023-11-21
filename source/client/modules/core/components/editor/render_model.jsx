import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MatrixRender from "./matrix_render";
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

const CustomAvatar = ({ icon: IconComponent }) => {
  return (
    <Avatar>
      <IconComponent />
    </Avatar>
  );
};
export default function RenderNode({ node }) {
  const [newNode, setNewNode] = useState({ node });
  DEFCON2 && console.log("RenderNode node", node);
  let matrixDataBlock1 = {
    labels: ["Name", "ID", "Info"],
    values: [
      node.labelText !== undefined ? node.labelText : "Name missing",
      node.nodeId !== undefined ? node.nodeId : "No nodeId",
      node.labelInfo,
    ],
  };

  return (
    <div>
      <CustomAvatar icon={node.labelIcon} />
      <MatrixRender data={matrixDataBlock1} />
    </div>
  );
}
