import React from 'react';
import { Link } from 'react-router';


class IndividualEvent extends React.Component {

  render() {
    return (
      <tr>
        <td>1</td>
        <td>Column content</td>
        <td>Column content</td>
        <td><Link to="/event/12" className="btn btn-success btn-sm">View Event</Link></td>
        { /* Making the view button work: https://youtu.be/A71aqufiNtQ?t=42m55s */ }
      </tr>
        // How to loop through data https://youtu.be/A71aqufiNtQ?t=29m01s
    );
  }
}

export default IndividualEvent;
