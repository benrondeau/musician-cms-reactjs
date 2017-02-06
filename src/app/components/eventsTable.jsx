import React from 'react';
import IndividualEvent from './individualEvent.jsx'; // eslint-disable-line

class EventsTable extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <h3 className="text-center">Music Events</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID #</th>
                  <th>Event Title</th>
                  <th>Featured?</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <IndividualEvent />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsTable;
