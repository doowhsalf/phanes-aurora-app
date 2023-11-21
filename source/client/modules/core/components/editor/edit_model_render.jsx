import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GetIcon from "./treeIcons";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
// import RenderModel from "./archive/render_model";
// import NodeRender from "./archive/node_render";
import NodeRenderCard from "../editor/node_render_card";
import NodeRenderAgentCard from "../editor/node_render_agent_card";
import TempSensorCardMaster from "../mcc/sensor_cards/temperature-sensor-card/temperature-sensor-card-master";
import HumiditySensorCardMaster from "../mcc/sensor_cards/humidity-sensor-card/humidity-sensor-card-master";
import PowerSensorCardMaster from "../mcc/sensor_cards/combined-power-sensor-card/combined-power-sensor-card-master";

import Container from "@mui/material/Container";
import Card from "@mui/material";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import { Paper } from "@mui/material";
import { Person } from "@mui/icons-material";

const nodeColorBasic = [
  "#FF5C47",
  "#FF8347",
  "#FFAA47",
  "#FFC847",
  "#FFE447",
  "#A8FF47",
  "#55FF47",
  "#47FF92",
  "#47FFF6",
  "#47A3FF",
  "#4757FF",
  "#6F47FF",
  "#A747FF",
];

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView(data) {
  const collectNodeIds = (nodes) => {
    let ids = [];
    ids.push(nodes.nodeId);

    if (Array.isArray(nodes.children)) {
      nodes.children.forEach((node) => {
        ids = ids.concat(collectNodeIds(node));
      });
    }
    return ids;
  };
  const classes = useStyles();
  const [expanded, setExpanded] = useState(collectNodeIds(data));

  // Add a useEffect hook to update the expanded state whenever data changes

  // useEffect(() => {
  //   if (expanded.length > 0) {
  //     setExpanded(collectNodeIds(data));
  //   }
  // }, [data]);
  // ... (rest of your code remains the same)
  const [selectedNode, setSelectedNode] = useState(null); // Initialize as null

  const handleNodeSelect = (node) => {
    // New function to set selected node
    setSelectedNode(node);
    DEFCON2 && console.log("handleNodeSelect node", node);
    // update the expanded nodes
  };

  // const handleExpandClick = () => {
  //   setExpanded((oldExpanded) =>
  //     oldExpanded.length === 0 ? collectNodeIds(data) : []
  //   );
  // };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const addNewNode = () => {
    console.log("addNewNode");
  };
  const handleExpandClick = () => {
    console.log("Before click, expanded:", expanded);

    if (expanded.length === 0) {
      const allNodeIds = collectNodeIds(data);
      console.log("Expanding all, node IDs:", allNodeIds);
      setExpanded(allNodeIds);
    } else {
      console.log("Collapsing all");
      setExpanded([]);
    }

    console.log("After click, expanded:", expanded);
  };

  const findNode = (tree, nodeId) => {
    if (tree.nodeId === nodeId) return tree;

    if (Array.isArray(tree.children)) {
      for (let i = 0; i < tree.children.length; i++) {
        const found = findNode(tree.children[i], nodeId);
        if (found) return found;
      }
    }

    return null;
  };

  const renderStandardCard = (node) => {
    return (
      <NodeRenderCard
        title={selectedNode.entity_class}
        description={selectedNode.description?selectedNode.description:"---"}
        body={selectedNode.body?selectedNode.body:"---"}
        node={selectedNode}
      />
    );
  };

  const renderAgentCard = (node) => {
    return (
      <NodeRenderAgentCard
        title={selectedNode.entity_class}
        description={
          selectedNode.description ? selectedNode.description : "---"
        }
        body={selectedNode.body ? selectedNode.body : "---"}
        node={selectedNode}
      />
    );
  };

  const renderModelCard = (node) => {
    // check if node or node.labelInfo is null or undefined
    DEFCON2 && console.log("renderModelCard node", node);
    if (node === null) {
      DEFCON2 && console.log("No value so we return null ");

      return null;
    }

    switch (node.entity_class) {
      case "person":
        return renderAgentCard(node);
        break;

      case "organisation":
        return renderStandardCard(node);
        break;

      case "temperature_meter":
        return <TempSensorCardMaster nodeId={node.nodeId} />;
        break;

      case "humidity_meter":
        return <HumiditySensorCardMaster nodeId={node.nodeId} />;
        break;

      case "combined_power_meter":
      case "energy_meter":
        return <PowerSensorCardMaster nodeId={node.nodeId} />;
        break;

      default:
        return renderStandardCard(node);
    }
  };

  const renderTree = (nodes, level = 0) => (
    <StyledTreeItem
      level={level} // Pass down the level as a prop
      key={nodes.nodeId}
      nodeId={nodes.nodeId}
      labelText={nodes.name}
      labelIcon={GetIcon(nodes.labelIcon)}
      labelInfo={nodes.description}
      // color={nodeColor[level % nodeColor.length]} // Here we set the color based on the level
      // bgColor={nodes.bgColor}
      // colorForDarkMode={nodeColor[level % nodeColor.length]}
      onClick={() => handleNodeSelect(nodes)} // Set the selected node when clicked
      sx={{
        paddingLeft: `${level * 8}px`,
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node, level + 1))
        : null}
    </StyledTreeItem>
  );
  DEFCON5 && console.log("data", data);
  DEFCON2 && console.log("selectedNode", selectedNode);
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      style={{ width: "auto", height: "100%", padding: theme.spacing(1) }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
          <Button onClick={addNewNode}>Add Node</Button>
          <TreeView
            expanded={expanded} // Use the 'expanded' state here
            defaultExpanded={expanded}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            onNodeToggle={handleToggle}
            onNodeSelect={(event, nodeId) => {
              // Find the node in your data.tree structure and set it
              // Assume findNode is a function that finds the node by nodeId
              const node = findNode(data, nodeId);
              handleNodeSelect(node);
            }}
          >
            {renderTree(data.tree)}
          </TreeView>
        </Grid>
        <Grid item xs={7}>
          {selectedNode === undefined ? null : renderModelCard(selectedNode)}
          {/* Add your EditModel or any other component to show the editing form here */}
        </Grid>
      </Grid>
    </Paper>
  );
}
