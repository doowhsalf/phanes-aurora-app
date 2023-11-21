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
import i18n from "meteor/universe:i18n";

export default class extends React.Component {
  render() {
    const languages = ["English, Swedish"];
    languages.push({ locale: "en", name: "English" });
    languages.push({ locale: "sv", name: "Swedish" });
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          {" "}
          Language <b className="caret" />
        </a>
        <ul className="dropdown-menu">
          {languages.map((language, index) => {
            return (
              <li key={index}>
                <a onClick={this._onLocaleClicked.bind(this, language.locale)}>
                  {language.name}
                </a>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  _onLocaleClicked(locale, e) {
    i18n.setLocale(locale);
  }
}
