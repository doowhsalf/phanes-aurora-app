import React from "react";
import PropTypes from "prop-types";

import withStyles from '@mui/styles/withStyles';

import UnreadMessages from "../../containers/chatcomponent/chatunreadmessages";
import Fab from "@mui/material/Fab";

const styles = (theme) => ({
  chatButton: {
    position: "fixed",
    bottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    right: theme.spacing(1),
    margin: theme.spacing(1),
    zIndex: theme.zIndex.drawer-1,
  },
});
class DrawerChatFab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //take onchange to avoid overwrite by ...other
    const {} = this.props;
    return (
      <Fab
        onClick={() => this.props.setDrawerOpen(true)}
        size="medium"
        color="primary"
        aria-label="chat"
        className={this.props.classes.chatButton}
      >
        <UnreadMessages />
      </Fab>
    );
  }
}

DrawerChatFab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerChatFab);
