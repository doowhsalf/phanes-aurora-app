import React from 'react';

export default class extends React.Component {

  render () {
    const {name, url} = this.props;
    return (
      <li><a href={url}>{name}</a></li>
    )
  }
}
