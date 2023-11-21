import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BusinessIcon from "@mui/icons-material/Business";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DomainIcon from "@mui/icons-material/Domain";
import WebIcon from "@mui/icons-material/Web";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Typography from "@mui/material/Typography";
import SensorsIcon from '@mui/icons-material/Sensors';
import HubIcon from '@mui/icons-material/Hub';
import DataObjectIcon from '@mui/icons-material/DataObject';
const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      //backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      //backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    // marginLeft: 0,
    // "& $content": {
    //   paddingLeft: theme.spacing(2),
    // },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));
function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": "#1E1E1E",
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const data = {
  nodeId: "root",
  labelText: "Agent:TheCompany",
  labelIcon: BusinessIcon,

  children: [
    {
      nodeId: "1",
      labelText: "POD: POD-001",
      labelIcon: CloudQueueIcon,
      labelInfo: "POD",
      colorIndex: 0,
      bgColor: "#1E1E1E",

      children: [
        {
          nodeId: "10",
          labelText: "SITE-001",
          labelIcon: HomeWorkIcon,
          labelInfo: "architecture",
          colorIndex: 1,
          bgColor: "#1E1E1E",
        },
        {
          nodeId: "11",
          labelText: "SITE-002",
          labelIcon: HomeWorkIcon,
          labelInfo: "architecture",
          colorIndex: 1,
          bgColor: "#1E1E1E",
          children: [
            {
              nodeId: "21",
              labelText: "Building-1",
              labelIcon: DomainIcon,
              labelInfo: "architecture",
              colorIndex: 2,
              bgColor: "#1E1E1E",
              children: [
                {
                  nodeId: "212",
                  labelText: "GW-212",
                  labelIcon: HubIcon,
                  labelInfo: "point",
                  colorIndex: 2,
                  bgColor: "#1E1E1E",
                },
                {
                  nodeId: "221",
                  labelText: "GW-221",
                  labelIcon: HubIcon,
                  labelInfo: "point",
                  colorIndex: 3,
                  bgColor: "#1E1E1E",
                  children: [
                    {
                      nodeId: "22101",
                      labelText: "Sensor-22101",
                      labelIcon: SensorsIcon,
                      labelInfo: "point",
                      colorIndex: 4,
                      bgColor: "#1E1E1E",
                    },
                    {
                      nodeId: "22102",
                      labelText: "Sensor-22102",
                      labelIcon: SensorsIcon,
                      labelInfo: "point",
                      colorIndex: 4,
                      bgColor: "#1E1E1E",
                      children: [
                        {
                          nodeId: "221031",
                          labelText: "Parameter-221031",
                          labelIcon: DataUsageIcon,
                          labelInfo: "point",
                          colorIndex: 5,
                          bgColor: "#1E1E1E",
                          children: [
                            {
                              nodeId: "2210311",
                              labelText: "LastKnownValue",
                              labelIcon: DataObjectIcon,
                              labelInfo: "22.123123",
                              colorIndex: 6,
                              bgColor: "#1E1E1E",
                            },
                            {
                              nodeId: "2210312",
                              labelText: "LastKnownQuality",
                              labelIcon: DataObjectIcon,
                              labelInfo: "point",
                              colorIndex: 6,
                              bgColor: "#1E1E1E",
                            },
                          ],
                        },
                        {
                          nodeId: "221032",
                          labelText: "Parameter-221032",
                          labelIcon: DataUsageIcon,
                          labelInfo: "point",
                          colorIndex: 5,
                          bgColor: "#1E1E1E",
                          children: [
                            {
                              nodeId: "2210321",
                              labelText: "LastKnownValue",
                              labelIcon: DataObjectIcon,
                              labelInfo: "23.2311232",
                              colorIndex: 7,
                              bgColor: "#1E1E1E",
                            },
                            {
                              nodeId: "2210322",
                              labelText: "LastKnowQuality",
                              labelIcon: DataObjectIcon,
                              labelInfo: "20232",
                              colorIndex: 7,
                              bgColor: "#1E1E1E",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView() {
  const classes = useStyles();

  let nodeColor = [];

  nodeColor.push("#FF5C47");
  nodeColor.push("#FF8347");
  nodeColor.push("#FFAA47");
  nodeColor.push("#FFC847");
  nodeColor.push("#FFE447");
  nodeColor.push("#A8FF47");
  nodeColor.push("#55FF47");
  nodeColor.push("#47FF92");
  nodeColor.push("#47FFF6");
  nodeColor.push("#47A3FF");
  nodeColor.push("#4757FF");
  nodeColor.push("#6F47FF");
  nodeColor.push("#A747FF");

  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.nodeId}
      nodeId={nodes.nodeId}
      labelText={nodes.labelText}
      labelIcon={nodes.labelIcon}
      labelInfo={nodes.labelInfo}
      color={nodeColor[nodes.colorIndex]}
      bgColor={nodes.bgColor}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
