import React from 'react';
import { Link } from 'react-router';

export default class EventsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  intToString(int) {
    return 'true';
  }

  render() {
    const individualEvent = this.props.events.map(event => <tr key={event.id}>
      <td key={event.id}>{event.id}</td>
      <td key={event.event_title}>{event.event_title}</td>
      <td key={event.featured_flag}>{event.featured_flag === 1 ? 'True' : 'False'}</td>
      <td><Link to={`/event/${event.id}`} className="btn btn-success btn-sm">View Event</Link></td>
    </tr>);

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
                  <th>Featured</th>
                  <th>Edit/View</th>
                </tr>
              </thead>
              <tbody>
                {individualEvent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
