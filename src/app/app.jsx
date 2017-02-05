import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TableOfEvents from './table.component';

injectTapEventPlugin(); // Needed for onTouchTap, http://stackoverflow.com/a/34015469/988941

const App = () => (
  <MuiThemeProvider>
    <TableOfEvents />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
    document.getElementById('app'),
);
