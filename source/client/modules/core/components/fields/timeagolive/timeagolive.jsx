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
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from '@mui/styles/withStyles';
import TimeAgo from "javascript-time-ago";
//import sv from "javascript-time-ago/locale/sv";
//import en from "javascript-time-ago/locale/sv";
var TimerMixin = require("react-timer-mixin");
import sv from "./timeagolive_sv";

const styles = (theme) => ({
  container: {
    display: "flex",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  avatar: {
    marginRight: 10,
    marginTop: 5,
  },
  row: {
    display: "flex",
    justifyContent: "marginLeft",
    marginTop: 19,
  },
});

class TimeAgoLive extends React.Component {
  constructor(props) {
    DEFCON9 && console.log("In FieldDateTextfield...");
    DEFCON9 && console.log("dateToProcess");
    DEFCON9 && console.log(props.dateToProcess);

    super(props);
    this.state = { number: 1 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      DEFCON9 && console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    DEFCON9 && console.log("In TimeAgoLive...");

    const { classes, dateToProcess } = this.props;
    TimeAgo.locale(sv);
    const timeAgo = new TimeAgo("sv");
    DEFCON9 && console.log(dateToProcess);
    const createdAt = timeAgo.format(dateToProcess);
    // Check if data is defined and if not just return
    if (dateToProcess === undefined) {
      return " X ";
    }
    return createdAt;
  }
}

TimeAgoLive.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeAgoLive);
