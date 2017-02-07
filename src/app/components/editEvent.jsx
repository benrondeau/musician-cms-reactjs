import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../store';


import NavBar from './navbar.jsx';// eslint-disable-line

class EditEvent extends React.Component {

  constructor(props) {
    super(props);
    // binding 'this'
    this.handleChange = this.handleChange.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    // Storing event in state to be used by AJAX call
    const rawEvent = _.filter(this.props.events.theBigEventStore, _.matches({ id: parseInt(this.props.params.id, 10) }));
    this.state = rawEvent[0];
  }
  updateEvent(event) {
    event.preventDefault();
    const eventID = this.state.id;
    const eventMinusID = new Object(this.state);
    delete eventMinusID.id;
    delete eventMinusID.updated_at;
    if (eventMinusID.start_date !== null) {
      eventMinusID.start_date = eventMinusID.start_date.slice(0, 10);
    }
    if (eventMinusID.end_date !== null) {
      eventMinusID.end_date = eventMinusID.end_date.slice(0, 10);
    }
    if (eventMinusID.created_at !== null) {
      eventMinusID.created_at = eventMinusID.created_at.slice(0, 10);
    }
    const apiQueryString = `../api/event/${eventID}?${qs.stringify(eventMinusID)}`;
    if (this.state.event_title === undefined) {
      alert('Event title is required!');
    } else {
      axios.put(apiQueryString)
          .then((response) => {
            // console.log(response);
            alert('Success updating event!');
          })
          .catch((error) => {
            alert('Error! See browser console for details.');
            console.log(error);
          });
    }
  }

  deleteEvent(event) {
    event.preventDefault();
    const apiQueryString = `../api/event/${this.props.params.id}`;
    const answer = confirm('Are you sure?');
    if (answer === true) {
      axios.delete(apiQueryString)
          .then((response) => {
            console.log(response);
            alert('Event Deleted!');
            store.dispatch({
              type: 'REMOVE_EVENT',
              event: { id: `${this.props.params.id}` },
            });
            browserHistory.push('/');
          })
          .catch((error) => {
            alert('Error! See browser console for details.');
            console.log(error);
          });
    }
  }

  handleChange(event) {
    const key = event.target.id;
    const value = event.target.value;
    this.setState({
      [key]: value,
    });
  }

  render() {
    const myStyles = {
      titleText: {
        marginBottom: '35px',
      },
      updateBTN: {
        marginRight: '15px',
      },
    };

    console.log(this.state);

    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          { /* <!--Heading Text-->*/ }
          <div className="row">
            <div className="col-md-offset-4 col-md-4">
              <h3 className="text-center" style={myStyles.titleText}>View, Edit or Delete Event</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <div className="well">
                <form className="form-horizontal">
                  <fieldset>
                    {/* <!--Event ID-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="id" className="col-lg-2 control-label"
                      >Event ID (read-only)</label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          value={this.props.params.id}
                          className="form-control"
                          id="id"
                          disabled
                        />
                      </div>
                    </div>
                    {/* <!--Event Title-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="event_title" className="col-lg-2 control-label"
                      >Event Title (required)</label>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          onChange={this.handleChange}
                          className="form-control"
                          id="event_title"
                          defaultValue={this.state.event_title}
                        />
                      </div>
                    </div>
                    {/* <!--Description-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="description" className="col-lg-2 control-label"
                      >Description</label>
                      <div className="col-lg-9">
                        <textarea
                          className="form-control" onChange={this.handleChange} rows="3" id="description"
                        >{this.state.description}</textarea>
                      </div>
                    </div>
                    {/* <!--Start Date-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="start_date" className="col-lg-2 control-label"
                      >Start Date</label>
                      <div className="col-lg-9">
                        <input type="date" onChange={this.handleChange} defaultValue={(this.state.start_date === null || this.state.start_date === undefined) ? '' : this.state.start_date.slice(0, 10)} className="form-control" id="start_date" placeholder="YYYY/MM/DD" />
                      </div>
                    </div>
                    {/* <!--End Date-->*/}
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-lg-2 control-label">End Date</label>
                      <div className="col-lg-9">
                        <input type="date" onChange={this.handleChange} defaultValue={(this.state.end_date === null || this.state.end_date === undefined) ? '' : this.state.end_date.slice(0, 10)} className="form-control" id="end_date" placeholder="YYYY/MM/DD" />
                      </div>
                    </div>
                    {/* <!--Category-->*/}
                    <div className="form-group">
                      <label htmlFor="category" className="col-lg-2 control-label">Category</label>
                      <div className="col-lg-9">
                        <input
                          type="text" className="form-control" defaultValue={this.state.category} onChange={this.handleChange} id="category"
                        />
                      </div>
                    </div>
                    {/* <!--Featured-->*/}
                    <div className="form-group">
                      <label htmlFor="featured_flag" className="col-lg-2 control-label">Featured?</label>
                      <div className="col-lg-9">
                        <select onChange={this.handleChange} className="form-control" id="featured_flag">
                          <option value="null" />
                          <option selected={this.state.featured_flag === 1 ? 'selected' : ''} value="1">True</option>
                          <option selected={this.state.featured_flag === 0 ? 'selected' : ''} value="0">False</option>
                        </select>
                      </div>
                    </div>
                    {/* <!--Submit BTN-->*/}
                    <div className="form-group">
                      <div className="col-lg-10 col-lg-offset-2">
                        <button onClick={this.updateEvent.bind(this)} type="submit" style={myStyles.updateBTN} className="btn btn-primary">Update</button>
                        <button onClick={this.deleteEvent.bind(this)} type="button" className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    events: store,
  };
};

export default connect(mapStateToProps)(EditEvent);
