import React from "react";

import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ReactDom from "react-dom";
import Chatlinelist from "./chatlinelist";
import ChatEdit from "./chatedit";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
    left: 0,
    position: "absolute",
    marginTop: 50,
    maxHeight: `calc(100vh - 50px)`,
    width: "100%",
  },

  inline: {
    display: "inline",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  BottomNavigation: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 65px)",
    backgroundColor: theme.palette.background.default,
    padding: 0,
    margin: 0,
  },
  channelList: {
    padding: 0,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    // borderRight: "0.3px solid",
    // borderImage:
    //   "linear-gradient( to bottom, " +
    //   theme.palette.secondary.light +
    //   ", rgba(0, 0, 0, 0)) 1 100%",
    margin: 0,
    padding: theme.spacing(0),
    [theme.breakpoints.down('lg')]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 270,
      maxWidth: 270,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 320,
      maxWidth: 320,
    },
  },

  chatDark: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(29, 30, 31,1)",
    height: "100%",
  },
  chatLight: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },

  textEditArea: {
    position: "fixed",
    bottom: 10,
    padding: theme.spacing(1),
    width: "100%",
  },
  chat: {
    height: "100%",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  textEditArea: {
    bottom: 1,
    justifyContent: "flex-end",
    padding: theme.spacing(1),
    paddingBottom: 0,
    marginTop: theme.spacing(3),
    width: "100%",
  },
});

class ChatLineListComponentPreview extends React.Component {
  constructor() {
    super();
    this.state = {
      editorVisible: false,
    };
  }

  getAvatar(listItem) {
    return listItem.avatar ? (
      <Avatar src={listItem.avatar} />
    ) : (
      <Avatar>{listItem.createdByName.substring(0, 2)}</Avatar>
    );
  }

  render() {
    let themeModeDark = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : true;

    const {
      channelId,
      chatLineList,
      chatUsers,
      classes,
      readOnly,
      addChatLine,
    } = this.props;
    let chatLineWithAvatars = chatLineList.slice().map((line) => {
      let userWithAvatar = chatUsers.find(
        (user) => user._id === line.createdBy
      );
      return {
        _id: line._id,
        avatar: userWithAvatar.avatar_uri,
        createdByName: userWithAvatar.emails[0].address,
        text: line.text,
        createdBy: line.createdBy,
        createdAt: line.createdAt,
      };
    });

    return (
      <div
        style={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minWidth: 400,
          maxWidth: 400,
        }}
      >
        <div
          className={
            themeModeDark == true ? classes.chatLight : classes.chatDark
          }
        >
          <Chatlinelist
            className={classes.chat}
            chatLineList={chatLineList}
            chatUsers={chatUsers}
            closeEditMode={false}
            readOnly={true}
            addChatLine={null}
            channelId={channelId}
            preview={false}
          />
        </div>
        <div className={classes.textEditArea}>
          {chatLineList ? (
            <ChatEdit
              chatLineList={chatLineList}
              chatUsers={chatUsers}
              readOnly={readOnly}
              addChatLine={addChatLine}
              channelId={channelId}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

ChatLineListComponentPreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatLineListComponentPreview);
