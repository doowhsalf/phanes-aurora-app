import React from "react";
import { mount } from "react-mounter";

import {
  LayoutDefault,
  LayoutForGuest,
  Simple,
} from "/client/configs/theme.jsx";

import Login from "./components/login/wrapper.jsx";
import Register from "./components/register/wrapper.jsx";
import Password from "./components/password/wrapper.jsx";
import SetPassword from "./components/password/setwrapper.jsx";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

export default function (injectDeps, { FlowRouter }) {
  const LayoutDefaultCtx = injectDeps(LayoutDefault);
  const LayoutForGuestCtx = injectDeps(LayoutForGuest);

  // FlowRouter.route("/register", {
  //   name: "users.register",
  //   action() {
  //     if (Meteor.userId()) {
  //       FlowRouter.go("/start");
  //     }

  //     mount(LayoutForGuestCtx, {
  //       content: () => <Register />,
  //     });
  //   },
  // });

  FlowRouter.route("/register/:token?", {
    name: "users.register",
    action(token) {
      if (Meteor.userId()) {
        FlowRouter.go("/start");
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
        FlowRouter.go("/start");
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
        FlowRouter.go("/start");
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
}
