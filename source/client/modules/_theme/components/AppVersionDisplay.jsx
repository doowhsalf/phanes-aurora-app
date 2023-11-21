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
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Log from "../../../../lib/log.js";
import LanguageItemsList from "./LanguageItemsList";
import AppConfig from "/client/configs/app";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
});
class AppVersionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  render() {
    const { itemKey, themeIconClicked, classes } = this.props;
    const userLoggedIn = !!Meteor.userId();

    return (
      <div key={"AppVersion"}>
        <Divider />
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className={classes.textField}
        >
          {AppConfig.name}
        </Typography>
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles)(AppVersionDisplay);
