// import {Accounts} from 'meteor/meteor';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default {
  login({ Meteor, LocalState, FlowRouter }, email, password) {
    if (!email || !password) {
      return LocalState.set("LOGIN_ERROR", "Login & Password are required!");
    }

    LocalState.set("LOGIN_ERROR", null);

    Meteor.loginWithPassword(email, password, (err) => {
      if (err && err.reason) {
        return LocalState.set("LOGIN_ERROR", err.reason);

        // Meteor.loginWithAdminPassword(email, password, (err) => {
        //     if (err && err.reason) {
        //         return LocalState.set('LOGIN_ERROR', err.reason);
        //     }
        //     if (FlowRouter.current().path === '/') {
        //         FlowRouter.reload();
        //     } else {
        //         FlowRouter.go('/start');
        //     }
        // });
      }
      if (FlowRouter.current().path === "/") {
        FlowRouter.reload();
      } else {
        FlowRouter.go("/");
      }
    });
  },

  loginAdmin({ Meteor, LocalState, FlowRouter }, email, password) {
    if (!email || !password) {
      return LocalState.set("LOGIN_ERROR", "Login & Password are required!");
    }

    LocalState.set("LOGIN_ERROR", null);

    Meteor.loginWithAdminPassword(email, password, (err) => {
      if (err && err.reason) {
        return LocalState.set("LOGIN_ERROR", err.reason);
      }
      if (FlowRouter.current().path === "/") {
        FlowRouter.reload();
      } else {
        FlowRouter.go("/");
      }
    });
  },

  loginErrorClear({ LocalState }) {
    return LocalState.set("LOGIN_ERROR", null);
  },

  register(
    { Meteor, LocalState, FlowRouter },
    email,
    password1,
    password2,
    voucher,
    name,
    token
  ) {
    //TODO remove email in case of provided token
    if (!email || !password1 || !password2) {
      return LocalState.set(
        "REGISTER_ERROR",
        "Please fill out all the required fields!"
      );
    }

    if (password1 !== password2) {
      return LocalState.set("REGISTER_ERROR", "Passwords do not match!");
    }

    DEFCON2 && console.log("Create user with token: " + token);
    Accounts.createUser(
      { email, password: password1, voucher, name, token },
      (err) => {
        if (err && err.reason) {
          DEFCON5 && console.log(err);
          return LocalState.set("REGISTER_ERROR", err.reason);
        } else {
          FlowRouter.go("/");
        }
      }
    );
  },

  registerErrorClear({ LocalState }) {
    return LocalState.set("REGISTER_ERROR", null);
  },
};
