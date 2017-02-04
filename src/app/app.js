import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component

injectTapEventPlugin(); // Needed for onTouchTap, http://stackoverflow.com/a/34015469/988941

render(<Main />, document.getElementById('app'));
