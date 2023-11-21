import React from 'react';
import i18n from "meteor/universe:i18n";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

export default class extends React.Component {

  constructor() {
    super();
    this.state = {
      disabled: false,
      canSubmit: false,
      password: '',
      passwordError: '',
      passwordConfirmation: '',
      passwordConfirmationError: '',

    };
  }


  handleChange = name => event => {
    const errorField = name + 'Error';
    this.setState({
      [name]: event.target.value,
      [errorField]: event.target.value !== '' ? '' : this.state[errorField]
    });
  };


  isFormValid() {
    let formValid = true;
    if (this.state.password === ''
      || this.state.password.trim() === ''
      || this.state.password.length < 8
    ) {
      this.setState({
        passwordError: i18n.__('Error_RegisterForm_Password'),
        passwordConfirmationError: ''
      });
      formValid = false;
    }

    if (this.state.passwordConfirmation !== this.state.password) {
      this.setState({passwordConfirmationError: i18n.__('Error_RegisterForm_PasswordMatch')});
      formValid = false;
    }

    return formValid;
  }

  render() {

    const {error} = this.props;
    return (

      <form>
        <fieldset>
          <TextField
            name="password"
            value={this.state.password}
            label={i18n.__('Label_RegisterForm_Password')}
            type="password"
            placeholder={i18n.__('Tooltip_RegisterForm_Password')}
            helperText={this.state.passwordError}
            error={this.state.passwordError !== ''}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange('password')}
          />

          <TextField
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            label={i18n.__('Label_RegisterForm_PasswordConfirm')}
            type="password"
            placeholder={i18n.__('Tooltip_RegisterForm_PasswordConfirm')}
            helperText={this.state.passwordConfirmationError}
            error={this.state.passwordConfirmationError !== ''}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange('passwordConfirmation')}
          />
        </fieldset>
        <Button className="btn btn-primary block full-width m-b"
                onClick={() => this.validateAndSet()}>
          {i18n.__('Button_ForgotPassword_Save')}</Button>
      </form>

    );

  }

  validateAndSet() {
    if (this.isFormValid() && this.props.submitAction) {
      let token = this.props.token;
      this.props.submitAction(token, this.state.password);
    }


    //);
  }
};
