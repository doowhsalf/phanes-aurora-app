import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import i18n from 'meteor/universe:i18n';
import Log from '../../../../lib/log.js';

export default class LoginItemsList extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {itemKey} = this.props;

    return (
      <ListItem
        key={itemKey}
        button
        onClick={(event) => this.goToLogin()}
      >
        <ListItemText primary={i18n.__('Label_LoginListItem_Login')}/>
      </ListItem>)
  }

  goToLogin() {
    FlowRouter.go('/login')

  }
}
