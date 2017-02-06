import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios'; // for AJAX with promises

// My Components
import Home from './components/home.jsx'; // eslint-disable-line
import IndividualEvent from './components/individualEvent.jsx'; // eslint-disable-line
import NewEvent from './components/newEvent.jsx'; // eslint-disable-line

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
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
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
    </Route>
  </Router>,
    document.getElementById('app'),
);
