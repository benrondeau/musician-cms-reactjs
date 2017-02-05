import React from 'react';

class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Music Events</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
