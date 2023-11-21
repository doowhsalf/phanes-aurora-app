import React from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import AppConfig from "./chatversion";
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
        {/* <Divider /> */}
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className={classes.textField}
        >
          {AppConfig.name}
        </Typography>
        {/* <Divider /> */}
      </div>
    );
  }
}

export default withStyles(styles)(AppVersionDisplay);
