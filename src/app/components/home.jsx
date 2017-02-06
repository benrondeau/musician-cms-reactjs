import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../store';

// My Components
import EventsTable from './eventsTable.jsx';// eslint-disable-line
import NavBar from './navbar.jsx';// eslint-disable-line

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    axios.get('api/event')
        .then((response) => {
          store.dispatch({
            type: 'POPULATE_EVENT_LIST',
            event: response.data,
          });
        })
        .catch((error) => {
          alert('Error retrieving events from API. See browser console for details.');
          console.log(error);
        });
  }

  render() {
    // Handle case where the response is not here yet
    if (!this.props.events.theBigEventStore) {
      <div>
        <NavBar />
        <EventsTable events={[]} />
      </div>
    }

    return (
      <div>
        <NavBar />
        <EventsTable events={this.props.events.theBigEventStore} />
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    events: store,
  };
};

export default connect(mapStateToProps)(Home);
