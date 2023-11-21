import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupAdd from "@mui/icons-material/GroupAdd";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Group from "@mui/icons-material/Group";
import GroupWork from "@mui/icons-material/GroupWork";
import Person from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { renderLogo, _getLogoUrl } from "../helpers/app-logo";
import Badge from "@mui/material/Badge";
import { getField, getFieldHtml } from "../helpers/getField";
import ChannelCard from "./channelcard";
import TimeAgo from "javascript-time-ago";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import ChatSearch from "../../containers/chatcomponent/online";
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const styles = (theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  card: {
    // marginTop: theme.spacing(0),
    // marginBottom: theme.spacing(0),
    // maxHeight: 72,
  },
  header: {
    padding: theme.spacing(1),
    display: "flex",
    // justifContent: "space-between",
    // width:"100%"
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  renderTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    fontSize: "0.8em",
  },
  renderColumn: {
    fontSize: "0.8em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  renderRowDetailed: {
    fontSize: "0.8em",
    // textTransform: "uppercase",
    marginTop: -theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
  },
  renderRowDetailedContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  renderRowDetailedContentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -theme.spacing(1.5),
  },
  renderRowDetailedContentObject: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  renderRowDetailedContentSender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -theme.spacing(1.5),
  },
  avatar_small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginBottom: 0,
    marginLeft: 8,
    marginRight: 8,
    fontSize: "0.7em",
  },
});

export class ChatlineChannels extends React.Component {
  constructor(props) {
    super(props);
    const { chatRooms } = this.props;
    DEFCON5 && console.log("Chatroom Inital data ");
    DEFCON5 && console.log(chatRooms);

    // onClick={(event) =>}
    // let lastChatRoomID = localStorage.getItem("oberonLastChatRoomID")
    //   ? JSON.parse(localStorage.getItem("oberonLastChatRoomID"))
    //   : true;

    // let selectedChatRoomId =
    //   props.channelId !== undefined ? props.channelId : lastChatRoomID;

    // let startIndex = 0;
    // chatRooms.map((listItem, index, array) => {
    //   DEFCON5 && console.log(listItem);

    //   if (listItem.channelId === selectedChatRoomId) {
    //     startIndex = index;
    //   }
    // });

    // this.state = {
    //   line: "",
    //   selectedIndex: startIndex,
    // };
    this.handleListItemClick(this._getCurrentChannel());
    //FlowRouter.go("/chatlines/" + );
  }
  // handleChange = (event) => {
  //   const text = event.target.value;
  //   DEFCON7 && console.log("New data ");
  //   DEFCON7 && console.log(text);

  //   this.setState({ line: text });
  // };

  handleListItemClick = (index) => {
    const { chatRooms, handleSelectEdit } = this.props;
    DEFCON5 && console.log("Select channel x");
    DEFCON5 && console.log("Select CLICK MASTER");
    // DEFCON5 && console.log(handleSelectEdit);

    FlowRouter.go("/chatlines/" + chatRooms[index].channelId);
    this.setState({ selectedIndex: index });
    localStorage.setItem(
      "lastChatRoomID",
      JSON.stringify(chatRooms[index].channelId)
    );
    DEFCON5 && console.log("channel done... ");
    this.props.handleSelectEdit();
  };

  render() {
    //take onchange to avoid overwrite by ...other
    const { chatRooms, classes, chatUser, handleSelectEdit } = this.props;
    DEFCON5 && console.log("Chatroom data ");
    DEFCON5 && console.log(chatRooms);
    DEFCON5 && console.log(chatUser);

    return (
      <div className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              src={chatUser[0].avatar_uri}
            ></Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => this.props.handleSelectEdit}
              size="large">
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
          }
          title={<Typography variant="h6">{chatUser[0].name}</Typography>}
        ></CardHeader>
        {/* <Divider /> */}

        <ChatSearch />
        {/* <Divider /> */}
        <Fade in={true}>
          <List dense={true} className={classes.selected}>
            {chatRooms
              ? chatRooms.map((listItem, index, array) => {
                  let fixedDate =
                    listItem.modifiedAt !== undefined
                      ? new Date(listItem.modifiedAt)
                      : new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 1,
                          new Date().getDate()
                        );

                  const timeStuffx = (
                    <div className={classes.renderTime}>
                      <TimeAgoLive
                        dateToProcess={fixedDate}
                        renderFormat="short"
                      />
                    </div>
                  );
                  const ChatroomTypeAvatar =
                    listItem.chatRoomType === "article" ? (
                      <GroupWork className={classes.avatar_small} />
                    ) : listItem.chatRoomType === "workgroup" ? (
                      <Group className={classes.avatar_small} />
                    ) : (
                      <Person className={classes.avatar_small} />
                    );
                  const avatarVariant =
                    listItem.chatRoomType === "article"
                      ? "circular"
                      : listItem.chatRoomType === "workgroup"
                      ? "rounded"
                      : "square";
                  return (
                    <div>
                      <ListItem
                        className={classes.listItem}
                        key={index}
                        button
                        selected={this._getCurrentChannel() === index}
                        onClick={(event) => this.handleListItemClick(index)}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar alt="url" src={listItem.url} />
                            }
                          >
                            <Avatar
                              variant={avatarVariant}
                              src={listItem.userUrl}
                            />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <div className={classes.renderRowDetailedContent}>
                              <Typography
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  marginLeft: 0,
                                  width: "60%",
                                }}
                                noWrap
                                variant="overline"
                              >
                                {listItem.title}
                              </Typography>
                              <Typography
                                style={{
                                  padding: 0,
                                  marginTop: 3,
                                  width: "40%",
                                }}
                                variant="overline"
                              >
                                {timeStuffx}
                              </Typography>
                            </div>
                          }
                          secondary={
                            <div
                              className={
                                classes.renderRowDetailedContentDetails
                              }
                            >
                              <Typography
                                noWrap
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  marginTop: 4,
                                  fontSize: "0.8em",
                                }}
                                variant="body2"
                              >
                                {listItem.lastAction
                                  ? listItem.lastAction
                                  : listItem.subtitle}
                              </Typography>

                              <Badge
                                style={{
                                  marginBottom: 4,
                                  marginLeft: 8,
                                  marginRight: 8,
                                  fontSize: "0.7em",
                                }}
                                color={"secondary"}
                                badgeContent={this.getUserUnreads(
                                  listItem,
                                  chatUser
                                )}
                                // overlap="circular"
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                              ></Badge>
                            </div>
                          }
                        />
                        {/* <div className={classes.renderRowDetailedContent}>
                          <Typography
                            style={{
                              padding: 0,
                              margin: 0,
                            }}
                            variant="overline"
                          >
                            {timeStuffx}
                          </Typography>
                        </div> */}
                      </ListItem>
                      {/* <ChannelCard channelItem={listItem}></ChannelCard> */}
                    </div>
                  );
                })
              : null}
          </List>
        </Fade>
      </div>
    );
  }

  getUserUnreads = (item, chatUser) => {
    DEFCON5 && console.log("listItem");
    DEFCON5 && console.log(item);
    DEFCON5 && console.log(chatUser[0]);

    let unread = 0;
    if (item.userActiveList !== undefined) {
      item.userActiveList.map((activeUser, index, array) => {
        DEFCON5 && console.log(activeUser);

        if (activeUser.userId === chatUser[0]._id) {
          unread = activeUser.unReadMessages;
        }
      });
    }

    return unread;
  };
  _getCurrentChannel = () => {
    const { channelId, chatRooms } = this.props;

    let lastChatRoomID = localStorage.getItem("oberonLastChatRoomID")
      ? JSON.parse(localStorage.getItem("oberonLastChatRoomID"))
      : true;

    let selectedChatRoomId =
      channelId !== undefined ? channelId : lastChatRoomID;

    let startIndex = 0;
    chatRooms.map((listItem, index, array) => {
      DEFCON5 && console.log(listItem);

      if (listItem.channelId === selectedChatRoomId) {
        startIndex = index;
      }
    });
    return startIndex;
  };
}
ChatlineChannels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatlineChannels);
