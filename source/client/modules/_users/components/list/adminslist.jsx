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
import withStyles from '@mui/styles/withStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";

import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

const styles = (theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  avatar: {},
});

class AdminsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approveDialogVisible: false,
      selectedUser: null,
      updateTime: Date.now(),
    };
  }

  render() {
    const { classes, users } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.paper}>
          <CardHeader
            title={
              <Typography variant="h5" id="adminsListTitle">
                {i18n.__("Entity_UsersList_AdminsTitle")}
              </Typography>
            }
          />
          <CardContent>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    {i18n.__("Entity_UserList_Pic")}
                  </TableCell>
                  <TableCell align="left">
                    {i18n.__("Entity_UsersList_Email")}
                  </TableCell>
                  <TableCell align="left">
                    {i18n.__("Entity_UsersList_Name")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell padding="checkbox" align="left">
                      <Avatar alt="uri" src={user.uri} />
                    </TableCell>

                    <TableCell padding="checkbox" align="left">
                      {user.mail}
                    </TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AdminsList.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

export default withStyles(styles)(AdminsList);
