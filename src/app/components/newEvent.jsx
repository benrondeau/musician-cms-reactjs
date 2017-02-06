import React from 'react';

import NavBar from './navbar.jsx';// eslint-disable-line

class NewEvent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <NavBar />
      <p>New Event Form Goes here.</p>
    </div>
    );
  }
}

export default NewEvent;
