import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//import "react-clock/dist/Clock.css";

// import moment from "@date-io/moment";
const styles = (theme) => ({
  label: {
    fontFamily: "Poppins",

    marginTop: -28,
    [theme.breakpoints.down('md')]: {
      marginTop: -26,
    },
  },
  clock: {
    fontFamily: "Poppins",

    [theme.breakpoints.down('md')]: {
      fontSize: "2rem",
    },
  },

  colorstandard: {
    color: theme.palette.text.primary,
  },
  title: {
    fontFamily: "Poppins",

    [theme.breakpoints.down('md')]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  timer: {
    fontFamily: "Poppins",

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text1: {
    color: "white",
    [theme.breakpoints.down('md')]: { paddingTop: 0, fontSize: "1rem" },
  },
  text2: {
    fontFamily: "Poppins",

    paddingTop: 22,
    paddingLeft: 4,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      paddingLeft: 4,
      fontSize: "1rem",
    },
  },
});

// function that return the time for a given timezone
function _getCurrentTimeInTimezone(timezone) {
  const now = new Date();
  const options = {
    timeZone: timezone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = now.toLocaleString("en-US", options);
  return formattedTime;
}

function _getCurrentDate() {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", options);
  return formattedDate;
}

class WorldClock extends React.Component {
  constructor() {
    super();
    let currentDate = new Date();
    // write date as dd of month, yyyy
    let currentDateString = _getCurrentDate();

    this.state = {
      currentTime: new Date(),
      currentDateString: currentDateString,
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
    const { classes, color } = this.props;

    const { cities, currentTime, timeZone } = this.state;
    // console.log(currentTime);
    let dynamicStyle = {};
    dynamicStyle = this.props.color !== undefined ? { color: color } : {};

    let thisTz = timeZone !== undefined ? timeZone : "Europe/Stockholm";

    // get date from current time as

    return (
      // <div >
      //   <Clock format={"HH:mm:ss"} ticking={true} timezone={thisTz} />
      // </div>
      <div>
        <Box
          styles={{ padding: 0, margin: 0 }}
          display="flex"
          justifyContent="flex-end"
          m={1}
          p={1}
        >
          <Typography
            style={dynamicStyle}
            className={classes.clock}
            variant="h2"
          >
            {/* <Clock format={"HH:mm"} ticking={true} timezone={thisTz} /> */}
            {this.getTimeString(thisTz)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" m={1} p={1}>
          <Typography
            style={dynamicStyle}
            className={classes.label}
            variant="body2"
          >
            {this.state.currentDateString}
          </Typography>
        </Box>
      </div>
    );
  }

  // get current time in a given timezone as a string in format hh:mm
  getTimeStringOld(timezone) {
    const now = new Date();
    const options = {
      timeZone: timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedTime = now.toLocaleString("en-US", options);
    // make sure the time is never more than 23:59

    return formattedTime;
  }
  getTimeString(timezone) {
    const now = new Date();
    const options = {
      timeZone: timezone,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    };
    const formattedTime = now.toLocaleString("en-US", options);

    // Split the formatted time into hours and minutes
    let [hour, minute] = formattedTime.split(":");

    // Limit the hours to 0-23
    hour = hour % 24;

    // Convert the hours and minutes to strings and add leading zeros if necessary
    hour = hour.toString().padStart(2, "0");
    minute = minute.toString().padStart(2, "0");

    // Return the formatted time with hours and minutes always displayed with leading zeros
    return `${hour}:${minute}`;
  }
}

WorldClock.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(WorldClock);
