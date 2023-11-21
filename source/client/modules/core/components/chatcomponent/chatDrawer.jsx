import React from "react";
import PropTypes from "prop-types";

import withStyles from '@mui/styles/withStyles';

import Drawer from "@mui/material/Drawer";
import ChatLineListComponentPreview from "../../containers/chatcomponent/chatlinelistcomponentpreview";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const styles = (theme) => ({});
class DrawerChat extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickAway = () => {
    this.props.setDrawerOpen(false);
  };
  render() {
    return (
      <ClickAwayListener
        onClickAway={() => {
          // this.props.setDrawerOpen(false);
        }}
      >
        <div className="mobile-canvas">
          <Drawer anchor={"right"} openSecondary={true} open={this.props.open}>
            <CardHeader
              styles={{ heigt: 100 }}
              onClick={() => this.props.setDrawerOpen(false)}
              title={this.props.title ? this.props.title : "- - -"}
              avatar={
                <Avatar aria-label="close">
                  <CloseIcon />
                </Avatar>
              }
            ></CardHeader>
            <ChatLineListComponentPreview
              channelId={this.props.channelId}
              limit={100}
            />
          </Drawer>
        </div>
      </ClickAwayListener>
    );
  }
}

DrawerChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerChat);

/*

  handleClickAway = () => {
    DEFCON7 && console.log("CLICK AWAY");
    this.setState({
      navigationOpen: false
    });
  };

  render() {
    const { docked, open, style, listElements } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Drawer
          style={style}
          open={open}
          onKeyDown={this.toggleDrawer("drawopen", false)}
          onClick={this.toggleDrawer("drawopen", false)}
        >
          <List onKeyDown={this.toggleDrawer("drawopen", false)}>
            {listElements}
          </List>
        </Drawer>
      </ClickAwayListener>
    );
  }
}*/
