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
import withStyles from "@mui/styles/withStyles";

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

class BackdroundImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      DEFCON9 && console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
    }, 1000);
  }

  _getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
    });
    // open the request with the verb and the url
    xhr.open("GET", "https://sycorax.tritonite.io/phanes-aurora");
    // send the request
    xhr.send();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    DEFCON9 && console.log("In BackdroundImage...");

    const { classes } = this.props;
    return (
      <div
        style={{
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 80%), 
                     url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed`,
          backgroundSize: "cover",
          position: "fixed",
          minWidth: "100%",
          minHeight: "100%",
          right: 0,
          bottom: 0,
          zIndex: -10000,
          left: 0,
          top: 0,
          opacity: this.state.loading ? 0 : 1,
          transition: "opacity 2s ease-in-out",
        }}
      ></div>
    );
  }
}

BackdroundImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackdroundImage);
/*

componentWillMount() {
    this.getData()
  }

  getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'https://dog.ceo/api/breeds/list/all')
    // send the request
    xhr.send()
  }





*/
