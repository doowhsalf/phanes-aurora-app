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
import withStyles from '@mui/styles/withStyles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    marging: theme.spacing(4),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
  dialog: {
    fullWidth: "100%",
  },
  textFieldInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iframeBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    height: 600,
  },
  iframe: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    filter: "grayscale(3)",
  },
  textFieldMulti: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  button: {},
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  logo: {
    float: "right",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});

function _uniqueKey() {
  return Math.random() * Math.random();
}
const initialState = {
  article: [],
  themeModeState: localStorage.getItem("themeMode")
    ? JSON.parse(localStorage.getItem("themeMode"))
    : true,
};

class SetTheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (name) => (event) => {
    DEFCON4 && console.log("handleChange...");
    DEFCON4 && console.log(event.target.checked);
    DEFCON4 && console.log(name);
    this.setState({
      [name]: event.target.checked,
    });

    // this.setState({
    //   themeModeState: !this.state.themeModeState
    // });
    localStorage.setItem(
      "themeMode",
      JSON.stringify(!this.state.themeModeState)
    );
    if (Meteor.userId()) {
      DEFCON4 && console.log("setTheme ");
      Meteor.call(
        "_users.setTheme",
        Meteor.userId(),
        this.state.themeModeState
      );
    }
    DEFCON4 && console.log("Set the theme");
    DEFCON4 && console.log(!this.state.themeModeState);
    FlowRouter.reload();
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    let themeIcon = [];

    if (this.state.themeModeState) {
      themeIcon = [
        <Tooltip key={_uniqueKey()} title={i18n.__("Label_Tooltip_ThemeDark")}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.themeModeState}
                onChange={this.handleChange("themeModeState")}
                value={!this.state.themeModeState}
              />
            }
            label={i18n.__("Label_Tooltip_ThemeDark")}
          />
        </Tooltip>,
      ];
    } else {
      themeIcon = [
        <Tooltip key={_uniqueKey()} title={i18n.__("Label_Tooltip_ThemeLight")}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.themeModeState}
                onChange={this.handleChange("themeModeState")}
                value={!this.state.themeModeState}
              />
            }
            label={i18n.__("Label_Tooltip_ThemeLight")}
          />
        </Tooltip>,
      ];
    }
    DEFCON4 && console.log("Render theme mode changer...");
    return (
      <Card className={classes.paper} key="CardRender">
        <CardHeader title={i18n.__("Nav_DropDownItem_Darkmode")} />
        <CardContent>
          {themeIcon}
          {/* <FormControlLabel
            control={
              <Switch
                checked={this.state.themeModeState}
                onChange={this.handleChange("themeModeState")}
                value={!this.state.themeModeState}
              />
            }
            label="Secondary"
          /> */}
        </CardContent>
      </Card>
    );
  }
}

SetTheme.propTypes = {};

export default withStyles(styles)(SetTheme);
