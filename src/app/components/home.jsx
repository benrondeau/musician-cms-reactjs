import React from 'react';
import axios from 'axios';

// My Components
import EventsTable from './eventsTable.jsx';// eslint-disable-line
import NavBar from './navbar.jsx';// eslint-disable-line

export default class Home extends React.Component {

  constructor(props) {
    super();
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios.get('api/event')
        .then((response) => {
          this.setState({ events: response.data });
        })
        .catch((error) => {
          alert('Error retrieving events from API. See browser console for details.');
          console.log(error);
        });
  }

  updateEvents(newEvents) {
    this.setState({ events: newEvents });
  }


  render() {
    return (
      <div>
        <NavBar />
        <EventsTable
          events={this.state.events}
          updateEvents={this.updateEvents.bind(this)}
        />
      </div>
    );
  }
}
