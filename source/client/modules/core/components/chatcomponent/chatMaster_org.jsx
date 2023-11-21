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
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import i18n from "meteor/universe:i18n";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/NavigateNext";
import CreateIcon from "@mui/icons-material/Create";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import sv from "../fields/timeagolive/timeagolive_sv";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chatlinelist from "./chatlinelist";
import Grid from "./chatlinelist";
import ChatEdit from "./chatedit";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import ChatlineChannels from "../../containers/chatcomponent/chatlinechannels";
import { renderLogo, _getLogoUrl } from "../helpers/app-logo";
import AvatarGroup from '@mui/material/AvatarGroup';
import { getField, getFieldHtml } from "../helpers/getField";
import Link from "@mui/material/Link";
import Gravatar from "react-gravatar";
import ChatEngineVersion from "./chatVersionEngine";
TimeAgo.locale(en);

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
    borderRight: "0.1px solid",
    borderImage:
      "linear-gradient( to bottom, " +
      "rgba(29, 30, 31,1)" +
      ", rgba(0, 0, 0, 0)) 1 100%",
    margin: 0,
    padding: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 320,
      maxWidth: 320,
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
  },
  chatLight: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(230, 230, 230)",
  },

  textEditArea: {
    position: "fixed",
    bottom: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100vw - 320px)`,
    },
  },
  versionArea: {
    position: "fixed",
    bottom: 1,
    paddingBottom: 0,
  },
  chat: {
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),

    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
});

class ChatLineListComponent extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In ChatlistComponent constructor...");
    super(props);
    this.state = {
      line: "",
      error: undefined,
      saving: false,
    };
  }

  // getAvatar(listItem) {
  //   return listItem.avatar ? (
  //     <Avatar src={listItem.avatar} />
  //   ) : (
  //     <Avatar>{listItem.name ? listItem.name.substring(0, 2) : "xx"}</Avatar>
  //   );
  // }

  getAvatar(user) {
    const { classes } = this.props;
    DEFCON7 && console.log("Listitem to render as Avatar ");
    DEFCON7 && console.log(listItem);

    //TODO: make gravatar, get it once
    return user.avatar_uri ? (
      <Avatar src={user.avatar_uri} />
    ) : (
      <Avatar>
        {user.emails[0].address ? (
          <Gravatar email={user.emails[0].address} />
        ) : user.name ? (
          user.name.substring(0, 2)
        ) : (
          "--"
        )}
      </Avatar>

      // <Avatar className={classes.chatAvatar}>
      //   {listItem.name ? listItem.name.substring(0, 2) : "xx"}
      // </Avatar>
    );
  }

  handleNotification(error) {
    if (error === undefined) {
      error = "";
    } else {
      error = error.toString();
    }
    //console.error(error);
    this.setState({ error });
  }

  // handleChange = (event, newValue) => {
  //   //setValue(newValue);
  // };

  // handleChange = (event) => {
  //   const text = event.target.value;
  //   this.setState({ line: text });
  // };

  render() {
    const { classes } = this.props;
    const iconButtonElement = (
      <IconButton tooltip="more" tooltipPosition="bottom-left" size="large">
        <MoreVertIcon nativecolor={grey[400]} />
      </IconButton>
    );

    const rightIconMenu = null;

    const {
      channelId,
      chatLineList,
      chatUsers,
      close,
      readOnly,
      chatRooms,
      closeEditMode,
      addChatLine,
    } = this.props;

    DEFCON5 && console.log("In chatLine list component ");
    DEFCON5 && console.log(chatRooms);
    DEFCON5 && console.log(chatUsers);
    DEFCON5 && console.log(chatLineList);

    let themeModeDark = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : true;

    let chatRoom = { ...chatRooms[0] };

    let avatarGroup = [];
    let userNames = "";
    let first = true;
    chatUsers.map((user, index, array) => {
      // let item = (
      //   <Avatar
      //     key={getField(user, "_id")}
      //     alt={getField(user, "name")}
      //     src={user.avatar_uri > "" ? getField(user, "avatar_uri") : " "}
      //   />
      // );
      let item = this.getAvatar(user);
      if (!first) {
        userNames = userNames + ", ";
      } else {
        first = false;
      }
      userNames = userNames + getField(user, "name") + avatarGroup.push(item);
    });

    const canBeClosed = closeEditMode !== null && closeEditMode !== undefined;
    let createdAtLocal = "";
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.channelList}>
            <ChatlineChannels channelId={channelId} />
          </div>
          <div className={classes.versionArea}>
            <ChatEngineVersion></ChatEngineVersion>
          </div>
          <div
            className={
              themeModeDark == true ? classes.chatLight : classes.chatDark
            }
          >
            <div
              className={
                themeModeDark == true ? classes.cardLight : classes.cardDark
              }
            >
              <CardHeader
                avatar={
                  <AvatarGroup small="true" max={4}>
                    {avatarGroup}
                  </AvatarGroup>
                }
                action={
                  <IconButton aria-label="settings" size="large">
                    <MoreVertIcon></MoreVertIcon>
                  </IconButton>
                }
                title={
                  <Link
                    href={"/article/" + getField(chatRoom, "channelId")}
                    // onClick={preventDefault}
                    variant="body2"
                  >
                    {getField(chatRoom, "title")}
                  </Link>
                }
                subheader={userNames}
              ></CardHeader>
            </div>
            {channelId ? (
              <Chatlinelist
                className={classes.chat}
                chatLineList={chatLineList}
                chatUsers={chatUsers}
                closeEditMode={closeEditMode}
                readOnly={readOnly}
                addChatLine={addChatLine}
                channelId={channelId}
              />
            ) : (
              <div className={classes.chat} />
            )}
            <div className={classes.textEditArea}>
              {channelId ? (
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
        </div>
      </div>
    );
  }
}

ChatLineListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatLineListComponent);

/*
<Card
          style={{position: "fixed", zIndex: 5, width: "100%" }}
        >
          <CardHeader
            avatar={<Avatar className={classes.avatar}>My</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Mitt Chattfönster"
            subheader={channelId}
          />
        </Card>
        <Chatlinelist
          chatLineList={chatLineList}
          chatUsers={chatUsers}
          closeEditMode={closeEditMode}
          readOnly={readOnly}
          addChatLine={addChatLine}
          channelId={channelId}
        />*/
