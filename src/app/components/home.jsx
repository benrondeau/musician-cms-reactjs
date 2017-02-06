import React from 'react';

// My Components
import NavBar from './navbar.jsx';// eslint-disable-line
import EventsTable from './eventsTable.jsx';// eslint-disable-line

class Home extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <EventsTable />
      </div>
    );
  }
}

export default Home;
