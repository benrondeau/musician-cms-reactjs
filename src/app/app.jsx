import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

// My Components
import Home from './components/home.jsx'; // eslint-disable-line
import NewEvent from './components/newEvent.jsx'; // eslint-disable-line
import EditEvent from './components/editEvent.jsx'; // eslint-disable-line

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewEvent} />
      <Route path="/event/:id" component={EditEvent} />
    </Router>
  </Provider>,
    document.getElementById('app'),
);
