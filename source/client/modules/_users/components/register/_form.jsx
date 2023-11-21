import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import withStyles from '@mui/styles/withStyles';
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
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      passwordConfirmation: '',
      passwordConfirmationError: '',
      name: '',
      nameError: '',
      voucher: '',
      voucherError: ''
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
    if (this.state.email === '' || this.state.email.trim() === '') {
      this.setState({emailError: i18n.__('Error_RegisterForm_Email')});
      formValid = false;
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({emailError: i18n.__('Error_RegisterForm_Email')});
      formValid = false;
    }

    if (this.state.name === '' || this.state.name.trim() === '') {
      this.setState({nameError: i18n.__('Error_RegisterForm_Name')});
      formValid = false;
    }

    if (this.state.password === ''
      || this.state.password.trim() === ''
      || this.state.password.length < 8
    ) {
      this.setState({passwordError: i18n.__('Error_RegisterForm_Password')});
      formValid = false;
    }

    if (this.state.passwordConfirmation !== this.state.password) {
      this.setState({passwordConfirmationError: i18n.__('Error_RegisterForm_PasswordMatch')});
      formValid = false;
    }


    if (!this.props.token) {
      if (this.state.voucher === '' || this.state.voucher.trim() === '') {
        this.setState({voucherError: i18n.__('Error_RegisterForm_Voucher')});
        formValid = false;
      }
    }
    return formValid;
  }

  render() {
    const {error, token} = this.props;
    return (

      <form>
        <fieldset>
          {error ?
            <div className="alert alert-danger">
              <span className="octicon octicon-megaphone"/>
              {error}
            </div> : null}

          <TextField
            name="email"
            value={this.state.email}
            label={i18n.__('Label_RegisterForm_Email')}
            type="email"
            placeholder={i18n.__('Tooltip_RegisterForm_Email')}
            helperText={this.state.emailError}
            error={this.state.emailError !== ''}
            autoComplete="off"
            fullWidth={true}
            validations="isEmail"
            onChange={this.handleChange('email')}

          />
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

          <TextField
            name="name"
            value={this.state.name}
            label={i18n.__('Label_RegisterForm_Name')}
            type="text"
            placeholder={i18n.__('Tooltip_RegisterForm_Name')}
            helperText={this.state.nameError}
            error={this.state.nameError !== ''}
            autoComplete="off"
            fullWidth={true}
            onChange={this.handleChange('name')}
          />

          {!token
            ?
            <TextField
              name="voucher"
              value={this.state.voucher}
              label={i18n.__('Label_RegisterForm_Voucher')}
              type="text"
              placeholder={i18n.__('Tooltip_RegisterForm_Voucher')}
              helperText={this.state.voucherError}
              error={this.state.voucherError !== ''}
              autoComplete="off"
              fullWidth={true}
              onChange={this.handleChange('voucher')}
            />
            : null
          }

        </fieldset>
        <Button className="btn btn-primary block full-width m-b"
                onClick={() => this.validateAndSubmit()}>
          {i18n.__('Button_RegisterForm_Register')}</Button>
      </form>
    );
  }

  validateAndSubmit() {
    if (this.isFormValid() && this.props.submitAction) {
      this.props.submitAction(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.voucher, this.state.name, this.props.token);
    }
  }

  renderOld() {

    let formClassName = 'vertical m-t';

    var sharedProps = {
      layout: this.state.layout,
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled
    };

    const {error, token} = this.props;

    return (

      <Formsy.Form className={formClassName}
                   onValidSubmit={this.validSubmit}
                   onInvalidSubmit={this.invalidSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}
                   onChange={this.onChange}
                   ref="form">

        <fieldset>
          {error ?
            <div className="alert alert-danger" onClick="">
              <span className="octicon octicon-megaphone"></span>
              {error}
            </div> : null}

          {/*<Input*/}
          {/*{...sharedProps}*/}
          {/*name="email"*/}
          {/*value=""*/}
          {/*label={i18n.__('Label_RegisterForm_Email')}*/}
          {/*type="email"*/}
          {/*placeholder={i18n.__('Tooltip_RegisterForm_Email')}*/}

          {/*autoComplete="off"*/}

          {/*validations="isEmail"*/}
          {/*validationError={i18n.__('Error_RegisterForm_Email')}*/}

          {/*/>*/}


          {/*<Input*/}
          {/*{...sharedProps}*/}
          {/*name="password1"*/}
          {/*value=""*/}
          {/*label={i18n.__('Label_RegisterForm_Password')}*/}
          {/*type="password"*/}

          {/*validations="minLength:8"*/}
          {/*validationError={i18n.__('Error_RegisterForm_Password')}*/}
          {/*placeholder={i18n.__('Tooltip_RegisterForm_Password')}*/}
          {/*/>*/}
          {/*<Input*/}
          {/*{...sharedProps}*/}
          {/*name="password2"*/}
          {/*value=""*/}
          {/*label={i18n.__('Label_RegisterForm_PasswordConfirm')}*/}
          {/*type="password"*/}


          {/*validations="equalsField:password1"*/}
          {/*validationErrors={{*/}
          {/*equalsField: i18n.__('Error_RegisterForm_PasswordMatch')*/}
          {/*}}*/}

          {/*placeholder={i18n.__('Tooltip_RegisterForm_PasswordConfirm')}*/}
          {/*/>*/}

          {/*<Input*/}
          {/*{...sharedProps}*/}
          {/*name="name"*/}
          {/*value=""*/}
          {/*label={i18n.__('Label_RegisterForm_Name')}*/}
          {/*type="text"*/}
          {/*required*/}
          {/*validationErrors={i18n.__('Error_RegisterForm_Name')}*/}
          {/*placeholder={i18n.__('Tooltip_RegisterForm_Name')}*/}
          {/*/>*/}

          {/*{!token ? <Input*/}
          {/*{...sharedProps}*/}
          {/*name="voucher"*/}
          {/*value=""*/}
          {/*label={i18n.__('Label_RegisterForm_Voucher')}*/}
          {/*type="text"*/}
          {/*required*/}
          {/*validationErrors={i18n.__('Error_RegisterForm_Voucher')}*/}
          {/*placeholder={i18n.__('Tooltip_RegisterForm_Voucher')}*/}
          {/*/> : null}*/}

        </fieldset>

        {/*<Row layout={this.state.layout}>*/}

        {/*<input className="btn btn-primary block full-width m-b"*/}
        {/*formNoValidate={true}*/}
        {/*disabled={!this.state.canSubmit}*/}
        {/*type="submit"*/}
        {/*defaultValue={i18n.__('Button_RegisterForm_Register')}/>*/}

        {/*</Row>*/}

      </Formsy.Form>

    );
  }
};
