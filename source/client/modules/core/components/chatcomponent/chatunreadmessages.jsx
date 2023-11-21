import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

import withStyles from '@mui/styles/withStyles';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";
const styles = (theme) => ({});
class ChatUnreadMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line: "",
    };
  }
  handleClick = (event) => {
    const { classes, unreadMessages, openChatOnClick } = this.props;

    if (openChatOnClick) FlowRouter.go("/chatlines/master");
  };

  render() {
    //take onchange to avoid overwrite by ...other
    const { classes, unreadMessages, noAction } = this.props;

    let numOfMsg = unreadMessages ? parseInt(unreadMessages) : 0;
    return (
      <IconButton onClick={this.handleClick} color="inherit" size="large">
        <Badge color="secondary" badgeContent={numOfMsg}>
          <ChatIcon />
        </Badge>
      </IconButton>
    );
  }
}

ChatUnreadMessages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatUnreadMessages);

/* 
if (event.keyCode === 13 && !event.shiftKey) {
              if (event && event.preventDefault) {
                event.preventDefault();
                this.addLine();
              }*/
