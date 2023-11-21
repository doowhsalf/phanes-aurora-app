import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { DEFCON5, DEFCON3 } from "/debug.json";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import { DatePicker } from "@material-ui/pickers";
import dateFormat from "dateformat";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Constants from "/lib/constants";
import InputMask from "react-input-mask";
import Clock from "react-clock";
//import "react-clock/dist/Clock.css";

import moment from "@date-io/moment";
const styles = (theme) => ({});

class WorldClock extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: new Date(),
      cities: {
        "San Mateo": {
          weatherId: 5391959,
          timeZone: "America/Los_Angeles",
        },
        Toronto: {
          weatherId: 6167865,
          timeZone: "America/Toronto",
        },
        Paris: {
          weatherId: 2988507,
          timeZone: "Europe/Paris",
        },
        Sydney: {
          weatherId: 2147714,
          timeZone: "Australia/Sydney",
        },
      },
    };
  }
  componentDidMount() {
    window.setInterval(() => this.setState({ currentTime: new Date() }), 1000);
  }
  render() {
    const { cities, currentTime } = this.state;
    console.log(currentTime);
    return (
      <div>
        <Clock value={currentTime} />
      </div>
    );
  }
}

WorldClock.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(WorldClock);
