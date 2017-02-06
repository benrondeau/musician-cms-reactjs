import React from 'react';
import axios from 'axios'; // for AJAX with promises

// My Components
import EventsTable from './eventsTable.jsx';// eslint-disable-line
import NavBar from './navbar.jsx';// eslint-disable-line


class Home extends React.Component {

  constructor() {
    super();
      // AJAX call for data: https://youtu.be/A71aqufiNtQ?t=50m45s
    axios.get('api/event')
          .then((response) => {
            this.state.events = response.data;
            console.log(this.state);
          })
          .catch((error) => {
            alert('Error retrieving events from API. See browser console for details.');
            console.log(error);
          });
    this.state = {
      events: [],
    };
  }


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
