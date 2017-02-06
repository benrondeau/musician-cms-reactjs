import React from 'react';
import { Link } from 'react-router';


class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Music Events</a>
          </div>
          <div className="collapse navbar-collapse">
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

export default NavBar;
