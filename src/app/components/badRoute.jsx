import React from 'react';
import { Link } from 'react-router';


export default class BadRoute extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-4 col-lg-4">
            <h4 className="text-center">404!</h4>
            <p><Link to="/" className="navbar-brand">Head back to homepage!</Link></p>
          </div>
        </div>
      </div>
    );
  }
}
