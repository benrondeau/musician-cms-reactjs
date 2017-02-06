import React from 'react';

class IndividualEvent extends React.Component {

  render() {
    return (
      <tr>
        <td>1</td>
        <td>Column content</td>
        <td>Column content</td>
        <td><button className="btn btn-success btn-sm">View Event</button></td>
        { /* Making the view button work: https://youtu.be/A71aqufiNtQ?t=42m55s */ }
      </tr>
        // How to loop through data https://youtu.be/A71aqufiNtQ?t=29m01s
    );
  }
}

export default IndividualEvent;
