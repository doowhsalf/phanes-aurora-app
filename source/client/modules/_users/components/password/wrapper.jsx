import React from 'react';
import i18n from "meteor/universe:i18n";
import dataComposer from '../../composers/account/password.jsx';
// import dataComposer from '../../composers/passwordForm.jsx';
import Component from './_form.jsx';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {
    return (
      <div className="tri-login">

        <div className="bs-docs-section clearfix">

          <div className="ibox-content">

            <h2 className="font-bold">{i18n.__('Header_ForgotPassword_Password')}</h2>
            <p>
              {i18n.__('Header_ForgotPassword_EnterHint')}
            </p>

            <Container/>

            <p className="text-muted text-center">
              <small>{i18n.__('Header_ForgotPassword_Remember')}</small>
            </p>
            <a className="btn btn-sm btn-white btn-block" href="/login">{i18n.__('Link_ForgotPassword_Login')} </a>

          </div>
          <hr/>
        </div>
      </div>

    );
  }
}
