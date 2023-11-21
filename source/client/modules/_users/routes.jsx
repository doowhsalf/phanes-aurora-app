import React from "react";
import { mount } from "react-mounter";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

import {
  LayoutDefault,
  LayoutForGuest,
  Simple,
} from "/client/configs/theme.jsx";
import Reset from "./components/resetprocess/wrapper.jsx";
import Login from "./components/login/wrapper.jsx";
import Register from "./components/onboarding/wrapper.jsx";
import Password from "./components/password/wrapper.jsx";
import SetPassword from "./components/password/setwrapper.jsx";
import UsersList from "./composers/list/userslist.jsx";

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(LayoutDefault);
  const LayoutForGuestCtx = injectDeps(LayoutForGuest);

  DEFCON3 && console.log("Setting up flowRouter stuff in users module");

  FlowRouter.route("/register", {
    name: "users.register",
    action() {
      if (Meteor.userId()) {
        FlowRouter.go("/");
      }

      mount(LayoutForGuestCtx, {
        content: () => <Register />,
      });
    },
  });

  DEFCON3 && console.log("Setting up the Rest route...");

  FlowRouter.route("/reset", {
    name: "users.register",
    action() {
      if (Meteor.userId()) {
        DEFCON3 && console.log("User is logged in so we can not reset pw");
        FlowRouter.go("/");
      }
      DEFCON3 && console.log("Ok, go to reset form");

      mount(LayoutForGuestCtx, {
        content: () => <Reset />,
      });
    },
  });

  FlowRouter.route("/register/:token?", {
    name: "users.register",
    action(token) {
      if (Meteor.userId()) {
        FlowRouter.go("/");
      }

      mount(LayoutForGuestCtx, {
        content: () => <Register token={token} />,
      });
    },
  });

  FlowRouter.route("/password", {
    name: "users.password",
    action() {
      if (Meteor.userId()) {
        FlowRouter.go("/");
      }

      mount(LayoutForGuestCtx, {
        content: () => <Password />,
      });
    },
  });

  FlowRouter.route("/reset-password/:token?", {
    name: "users.reset-password",
    action({ token }) {
      mount(LayoutForGuestCtx, {
        content: () => <SetPassword token={token} />,
      });
    },
  });

  FlowRouter.route("/login", {
    name: "users.login",
    action() {
      if (Meteor.userId()) {
        FlowRouter.go("/");
      }

      mount(LayoutForGuestCtx, {
        content: () => <Login />,
      });
    },
  });

  FlowRouter.route("/logout", {
    name: "users.logout",
    action() {
      // Accounts.logout();
      Meteor.logout(() => {
        FlowRouter.go("/start");
      });
    },
  });

  FlowRouter.route("/admin/users", {
    name: "admin.users",
    action() {
      mount(MainLayoutCtx, {
        content: () => <UsersList />,
      });
    },
  });
}
