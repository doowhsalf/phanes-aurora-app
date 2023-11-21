import React from 'react';

import dataComposer from '../../composers/account/login.jsx';
import Component from './_NOTUSED_form.jsx';

const Container = dataComposer(Component);

export default class extends React.Component {

  render() {
    return (
      <div className="tri-login">

        <div className="bs-docs-section clearfix">

          <div className="ibox-content">

            <h2 className="font-bold">Login</h2>
            <p>
              Enter your email address and your password.
            </p>

            <Container/>

            <a href="/password">
              <small>Forgot password?</small>
            </a>

            <p className="text-muted text-center">
              <small>Do not have an account?</small>
            </p>
            <a className="btn btn-sm btn-white btn-block" href="/register">Create an account</a>

          </div>
          <hr/>
        </div>
      </div>
    );
  }
}
