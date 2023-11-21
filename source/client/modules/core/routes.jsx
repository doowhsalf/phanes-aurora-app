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
import { mount } from "react-mounter";

import { LayoutDefault, LayoutForGuest } from "/client/configs/theme.jsx";

import Login from "../_users/components/login/wrapper";
import Chatlines from "./containers/chatcomponent/chatlinelistcomponent";
import ClientSearch from "./containers/clientsearch";
import ClientSearchDetailsRelations from "./containers/clientsearchdetailsrelations";
import About from "./containers/about";
import Dox from "./containers/dox";

import Start from "./containers/start";
import Filearea from "./containers/filearea";
import MccMaster from "./containers/mcc_master";
import Facilityroom from "./containers/facility";
import Reset from "../_users/components/resetprocess/wrapper";
import Settings from "./containers/settings";
import EditModel from "./containers/edit_model_master.js";

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(LayoutDefault);
  const LayoutForGuestCtx = injectDeps(LayoutForGuest);
  const ls = "discussion01";

  DEFCON5 && console.log("Setting up flowRouter stuff");
  DEFCON3 && console.log("Setting up the Rest route...");

  FlowRouter.notFound = {
    name: "notfound",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Start />,
      });
    },
  };

  FlowRouter.route("/", {
    name: "root",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Start />,
      });
    },
  });

  // FlowRouter.route("/livestream", {
  //   name: "livestream",
  //   action() {
  //     mount(MainLayoutCtx, {
  //       content: () => <Chatlines channelId={ls} />
  //     });
  //   }
  // });
  FlowRouter.route("/livestream/:channel", {
    name: "livestream",
    action({ channel }) {
      mount(MainLayoutCtx, {
        content: () => <Chatlines channelId={channel} />,
      });
    },
  });

  FlowRouter.route("/chatlines/:channel", {
    name: "livestream",
    action({ channel }) {
      mount(MainLayoutCtx, {
        content: () => <Chatlines channelId={channel} />,
      });
    },
  });

  // FlowRouter.route("/person/:personId", {
  //   name: "person.single",
  //   action({ personId }) {
  //     mount(MainLayoutCtx, {
  //       content: () => {
  //         return <Person personId={personId} />;
  //       },
  //     });
  //   },
  // });

  FlowRouter.route("/mcc", {
    name: "MccMaster",
    action() {
      mount(MainLayoutCtx, {
        content: () => <MccMaster />,
      });
    },
  });

  FlowRouter.route("/chatlines2/", {
    name: "chatlines",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Chatlines />,
      });
    },
  });

  FlowRouter.route("/facility/:facilityId", {
    name: "facilityId",
    action({ facilityId }) {
      mount(MainLayoutCtx, {
        content: () => <Facilityroom facilityId={facilityId} />,
      });
    },
  });

  FlowRouter.route("/about", {
    name: "about",
    action() {
      mount(MainLayoutCtx, {
        content: () => <About />,
      });
    },
  });

  FlowRouter.route("/dox", {
    name: "dox",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Dox />,
      });
    },
  });

  FlowRouter.route("/start", {
    name: "start",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Start />,
      });
    },
  });

  FlowRouter.route("/settings", {
    name: "settings",
    action() {
      mount(MainLayoutCtx, {
        content: () => <Settings />,
      });
    },
  });

  FlowRouter.route("/edit", {
    name: "edit",
    action({ nodeId }) {
      mount(MainLayoutCtx, {
        content: () => <EditModel nodeId={nodeId} />,
      });
    },
  });
}
