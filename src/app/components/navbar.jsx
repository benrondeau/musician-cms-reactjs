import React from 'react';

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
              <li><a href="/">View Events</a></li>
              <li><a href="/new">Create Event</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
