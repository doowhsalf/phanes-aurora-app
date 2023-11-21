import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import makeStyles from '@mui/styles/makeStyles';
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
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { renderLogo, _getLogoUrl } from "../helpers/app-logo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  card: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    maxHeight: 72,
  },
  list: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    FlowRouter.go("/livestream/miclab_202005_ekurs");
  };

  return (
    <div className={classes.root}>
      <Paper square variant="outlined" elevation={0}>
        <Fade in={true}>
          <List
            className={classes.list}
            component="nav"
            dense={true}
            aria-label="main mailbox folders"
          >
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemAvatar>
                <Avatar alt="Kurs" src={_getLogoUrl()} />
              </ListItemAvatar>
              <ListItemText primary="Facility" secondary={null} />
            </ListItem>
          </List>
        </Fade>
      </Paper>
    </div>
  );
}
