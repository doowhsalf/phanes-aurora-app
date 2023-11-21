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
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  USER_ACTION_ACTIVATE,
  USER_ACTION_DEACTIVATE,
  USER_STATUS_ACTIVE,
  USER_STATUS_INACTIVE,
} from "/lib/constants";
import AdminsList from "./adminslist";
import MembersList from "./memberslist";
import AddUserForm from "./adduserform";

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
    margin: theme.spacing(1),
  },
  avatar: {},
});

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approveDialogVisible: false,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  onAddNewUser = (user, callback) => {
    //set temp uid
    const transformedUser = { mail: user.email, name: user.name, uid: "-1" };
    let stateBackupUsers = {};

    this.setState((prevState) => {
      const usersStateCopy = { ...prevState.users };
      stateBackupUsers.members = usersStateCopy && usersStateCopy.members;
      const users = prevState.users;
      if (transformedUser) {
        users.members = users.members
          ? [...users.members, transformedUser]
          : [transformedUser];
      }
      return { users };
    });

    const { addUser } = this.props;
    addUser(transformedUser, (err, response) => {
      if (err) {
        DEFCON5 && console.log("UsersList: Add user error:");
        DEFCON5 && console.log(err);
        if (callback) {
          callback(err);
        }

        this.setState({ users: stateBackupUsers });
      } else {
        this.getUsers();
        if (callback) {
          callback(null, response);
        }
      }
    });
  };

  onManageUser = (user) => {
    const id = user && user.uid;
    let stateBackupUsers = {};

    if (id) {
      let option =
        user && user.status === USER_STATUS_ACTIVE
          ? USER_ACTION_DEACTIVATE
          : USER_ACTION_ACTIVATE;

      //update state and then call method to do real stuff
      this.setState((prevState) => {
        const usersStateCopy = { ...prevState.users };
        stateBackupUsers.admins = usersStateCopy && usersStateCopy.admins;
        stateBackupUsers.members = usersStateCopy && usersStateCopy.members;

        const users = prevState.users;
        const userInState = users.members.find((u) => u.uid === id);
        if (userInState) {
          if (option === USER_ACTION_DEACTIVATE) {
            userInState.status = USER_STATUS_INACTIVE;
          } else if (option === USER_ACTION_ACTIVATE) {
            userInState.status = USER_STATUS_ACTIVE;
          }
        }
        return { users };
      });

      const { manageUser } = this.props;
      manageUser(id, option, (err, response) => {
        if (err) {
          DEFCON5 && console.log("UsersList: Manage user error:");
          DEFCON5 && console.log(err);
          if (stateBackupUsers) {
            this.setState({ users: stateBackupUsers });
          } else {
            this.getUsers();
          }
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { users } = this.state;
    let admins = users && users.admins ? users.admins : [];
    let members = users && users.members ? users.members : [];

    return (
      <div className={classes.root}>
        <AddUserForm
          addCompanyUser={(user, callback) => this.onAddNewUser(user, callback)}
        />
        <AdminsList users={admins} />
        <MembersList
          title={i18n.__("Entity_UsersList_MembersTitle")}
          actionName={i18n.__("Entity_UsersList_Deactivate")}
          users={members}
          onAction={(user) => this.onManageUser(user)}
        />
      </div>
    );
  }

  getUsers() {
    Meteor.call("_users.getCompanyUsers", (error, users) => {
      DEFCON5 && console.log("Result in client to handle ");
      DEFCON5 && console.log(users);
      this.setState({ users });
    });
  }
}

UsersList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersList);
