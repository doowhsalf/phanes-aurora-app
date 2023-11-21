import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import i18n from "meteor/universe:i18n";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/NavigateNext";
import CreateIcon from "@mui/icons-material/Create";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import sv from "../fields/timeagolive/timeagolive_sv";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import { renderLogo, _getLogoUrl } from "../helpers/app-logo";
import MccConfigTable from "./mcc_config_table";
import PodViewDashboard from "./mcc_podview_dashboardV3";
import PodViewDashboardV2 from "./mcc_podview_dashboardV2";
import PodViewDashboardV4 from "./mcc_podview_dashboardV4";
import PodViewDashboardSquare from "./mcc_podview_dashboardSquares";
import PodViewStart from "./start-screen/mcc_podview_start";
import PodViewPod from "./mcc_podview_pod";
import PodViewGateways from "./pod-gateways/pod-gw-main";
import PodViewSuspence from "./mcc_podview_suspence";
import PodViewAgents from "./mcc_podview_agents";
import PodScreen  from "./pod-screen/pod-main";
import PodExportCenter from "./pod-exportcenter/pod-exportcenter-main";
import Worldclock from "./worldclockV3";
// add icons for menu
import SuspenceMaster from "./mcc_podview_suspence_master";
import SensorMaster from "./mcc_podview_sensor_master";
import DataMaster from "./mcc_podview_data_master";
import OntologyMaster from "./mcc_podview_ontology_master";
import RouterIcon from "@mui/icons-material/Router";
import SensorIcon from "@mui/icons-material/SensorDoor";
import HouseIcon from "@mui/icons-material/House";
import CloudIcon from "@mui/icons-material/Cloud";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SettingsInputSvideoOutlinedIcon from "@mui/icons-material/SettingsInputSvideoOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import PowerIcon from "@mui/icons-material/Power";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";

import EditModel from "../../containers/edit_model_master.js";
import SensorMasterMaster from "./mcc_podview_sensormapping_master";
import MetersMaster from "./meters-table/mcc_podview_meters_master";
TimeAgo.locale(en);
const drawerWidth = 240;
function _uniqueKey() {
  return Math.random() * Math.random();
}
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.white,
  },
  inline: {
    display: "inline",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  BottomNavigation: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cardDark: {
    marginRight: theme.spacing(0),
    minHeight: 72,
    backgroundColor: "rgba(29, 30, 31,1)",
  },
  cardLight: {
    marginRight: theme.spacing(0),
    minHeight: 72,
  },

  MccWindow: { overflow: "auto" },
  MccLineText: {
    backgroundColor: theme.palette.secondary.light,
    padding: 0,
    marginLeft: 10,
    borderRadius: 5,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 50px)",
    backgroundColor: theme.palette.background.default,
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    borderRight: "1px solid",
    borderImage:
      "linear-gradient( to bottom, " +
      theme.palette.secondary.light +
      ", rgba(0, 0, 0, 0)) 1 100%",
    marginRight: 0,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xl")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 270,
      maxWidth: 270,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 270,
      maxWidth: 270,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  mcc: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardTransparent: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, " +
      "rgba(0,0,0,0.77) 34%, rgba(0,0,0,0.66) 55%)",
  },
  MccDark: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    backgroundColor: "rgba(29, 30, 31,1)",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },
  MccLight: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },

  textEditArea: {
    position: "fixed",
    // [theme.breakpoints.down("xs")]: {
    //   width: "calc(100vh - 290px)",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: "calc(100vh - 350px)",
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "calc(100vh - 350px)",
    //   width: "100%",
    // },
    width: "100%",

    bottom: 0,
    // backgroundColor: "red",
    padding: theme.spacing(1),
  },
});

// make a json object with the menu items that stores the menu item name, icon, and the component to render
// make menu elements for dasboard, POD, gateways, sensor, energy, power and volume
const menuItems = [
  {
    id: 0,
    name: "Nav_DropDownItem_MCCDashBoard",
    icon: <DashboardRoundedIcon />,
    component: <PodViewStart />,
    link: "/mcc",
    method: "internal",
  },
  { divider: true },

  {
    id: 2,
    name: "Nav_DropDownItem_MCCPOD",
    icon: <SettingsInputSvideoOutlinedIcon />,
    component: <PodScreen />,
    link: "/mcc/pod",
    method: "internal",
  },
  {
    id: 3,
    name: "Nav_DropDownItem_MCCGateways",
    icon: <RouterIcon />,
    component: <PodViewGateways />,
    link: "/mcc/gateways",
    method: "internal",
  },
  {
    id: 4,
    name: "Nav_DropDownItem_EditModel",
    icon: <CloudIcon />,
    component: <EditModel embedded={true} />,
    link: "/edit",
    method: "internal",
  },
  {
    id: 5,
    name: "Nav_DropDownItem_MCCSensors",
    icon: <SensorIcon />,
    component: <SensorMaster />,
    link: "/mcc/events",
    method: "internal",
  },
  {
    id: 6,
    name: "Nav_DropDownItem_Events",
    icon: <BatteryChargingFullIcon />,
    component: <DataMaster />,
    link: "/mcc/energy",
    method: "internal",
  },
  {
    id: 7,
    name: "Nav_DropDownItem_Suspence",
    icon: <PowerIcon />,
    component: <SuspenceMaster />,
    link: "/mcc/power",
    method: "internal",
  },

  {
    id: 8,
    name: "Nav_DropDownItem_Ontology",
    icon: <AccountBoxIcon />,
    component: <OntologyMaster />,
    link: "/mcc/agent",
    method: "internal",
  },

  {
    id: 9,
    name: "Nav_DropDownItem_Agents",
    icon: <AccountBoxIcon />,
    component: <PodViewAgents />,
    link: "/mcc/agent",
    method: "internal",
  },

  {
    id: 10,
    name: "Nav_DropDownItem_SensorMapping",
    icon: <EditIcon />,
    component: <SensorMasterMaster />,
    link: "/sensormapping",
    method: "internal",
  },
  {
    id: 11,
    name: "Nav_DropDownItem_ExportCenter",
    icon: <ImportExportIcon />,
    component: <PodExportCenter />,
    link: "/podexportdCenter",
    method: "internal",
  },
  {
    id: 12,
    name: "Nav_DropDownItem_Meters",
    icon: <DataObjectIcon />,
    component: <MetersMaster />,
    link: "/meters",
    method: "internal",
  }
];

class MccMaster extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In McclistComponent constructor...");
    super(props);
    this.state = {
      line: "",
      error: undefined,
      saving: false,
      selectedIndex: 1,
    };
  }

  getAvatar(listItem) {
    return listItem.avatar ? (
      <Avatar src={listItem.avatar} />
    ) : (
      <Avatar>{listItem.name ? listItem.name.substring(0, 2) : "xx"}</Avatar>
    );
  }

  handleNotification(error) {
    if (error === undefined) {
      error = "";
    } else {
      error = error.toString();
    }
    //console.error(error);
    this.setState({ error });
  }

  menuElementClicked = (value, index) => {
    if (menuItems[index].method === "external") {
      FlowRouter.go(menuItems[index].link);
    } else {
      this.setState({ selectedIndex: index });
    }
  };

  render() {
    const { classes } = this.props;

    let item = [
      <div className={classes.mcc}>
        {menuItems[this.state.selectedIndex].component}
      </div>,
    ];
    DEFCON5 && console.log("Render dashboard");
    DEFCON5 && console.log("selectedIndex: " + this.state.selectedIndex);

    return (
      <div style={{ marginTop: 64 }}>
        <div className={classes.container}>
          {this.renderDrawer()}
          <div className={classes.mcc}>{item}</div>
          <Worldclock className={classes.mcc}></Worldclock>
        </div>
      </div>
    );
  }

  renderDrawer() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {menuItems.map((item) =>
              item.divider !== undefined ? (
                item.divider ? (
                  <Divider />
                ) : null
              ) : (
                <ListItem
                  key={_uniqueKey()}
                  button={true}
                  selected={this.state.selectedIndex === item.id}
                  onClick={() => this.menuElementClicked(item.link, item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={i18n.__(item.name)} />
                </ListItem>
              )
            )}
          </List>
        </div>
      </Drawer>
    );
  }
}

MccMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MccMaster);
