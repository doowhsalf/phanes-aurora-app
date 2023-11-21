import React from 'react';
import i18n from "meteor/universe:i18n";
import dataComposer from '../../composers/account/setpassword.jsx';
// import dataComposer from '../../composers/passwordForm.jsx';
import Component from './_setform.jsx';
import _ from 'lodash';
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

    let user = Meteor.user();
    let email = _.get(user, 'emails[0].address', null);

    return (
      <div className="tri-login">

        <div className="bs-docs-section clearfix">

          <div className="ibox-content">

            <h2 className="font-bold">{i18n.__('Header_SetPassword_Password')}</h2>
            <p>
              {i18n.__('Header_SetPassword_EnterHint')}
            </p>
            {email ? <p>{email}</p> : null}
            <Container token={this.props.token}/>

            <a className="btn btn-primary block" href="/">{i18n.__('Link_SetPassword_Cancel')} </a>

          </div>
          <hr/>
        </div>
      </div>

    );
  }
}
