import React from 'react';
import { Link } from 'react-router';


export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Music Events</Link>
          </div>
          <div className="navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">View Events</Link></li>
              <li><Link to="/new">Create Event</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
