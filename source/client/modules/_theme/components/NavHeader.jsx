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

export default class NavHeader extends React.Component {
  render() {
    const { brand, leftContent, rightContent } = this.props;

    return (
      <header className="main-header">
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-inverse-collapse"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/">
                {brand ? brand() : "logo"}
              </a>
            </div>

            <div className="navbar-collapse collapse navbar-inverse-collapse">
              {leftContent ? leftContent() : null}

              {rightContent ? rightContent() : null}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
