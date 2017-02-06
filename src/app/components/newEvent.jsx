import React from 'react';
import axios from 'axios';

import NavBar from './navbar.jsx';// eslint-disable-line

export default class NewEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: {},
    };
  }
  submitEvent() {
    axios.post('api/event', {})
        .then((response) => {
          this.setState({ events: response.data });
        })
        .catch((error) => {
          alert('Error retrieving events from API. See browser console for details.');
          console.log(error);
        });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          { /* <!--Heading Text-->*/ }
          <div className="row">
            <div className="col-md-offset-4 col-md-4">
              <h3 className="text-center">Create New Event</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-offset-2 col-md-8">
              <div className="well">
                <form className="form-horizontal">
                  <fieldset>
                    {/* <!--Event Title-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="event_title" className="col-lg-2 control-label"
                      >Event Title (required)</label>
                      <div className="col-lg-9">
                        <input type="text" className="form-control" id="event_title"/>
                      </div>
                    </div>
                    {/* <!--Description-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="description" className="col-lg-2 control-label"
                      >Description</label>
                      <div className="col-lg-9">
                        <textarea
                          className="form-control" rows="3" id="description"
                        />
                      </div>
                    </div>
                    {/* <!--Start Date-->*/}
                    <div className="form-group">
                      <label
                        htmlFor="start_date" className="col-lg-2 control-label"
                      >Start Date</label>
                      <div className="col-lg-9">
                        <input type="date" className="form-control" id="start_date" value="" />
                      </div>
                    </div>
                    {/* <!--End Date-->*/}
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-lg-2 control-label">End Date</label>
                      <div className="col-lg-9">
                        <input type="date" className="form-control" id="end_date" value="" />
                      </div>
                    </div>
                    {/* <!--Category-->*/}
                    <div className="form-group">
                      <label htmlFor="category" className="col-lg-2 control-label">Category</label>
                      <div className="col-lg-9">
                        <input
                          type="text" className="form-control" id="category" placeholder="Festival"
                        />
                      </div>
                    </div>
                    {/* <!--Featured-->*/}
                    <div className="form-group">
                      <label htmlFor="featured" className="col-lg-2 control-label">Featured?</label>
                      <div className="col-lg-9">
                        <select className="form-control" id="featured">
                          <option value="1">True</option>
                          <option value="0">False</option>
                        </select>
                      </div>
                    </div>
                    {/* <!--Submit BTN-->*/}
                    <div className="form-group">
                      <div className="col-lg-10 col-lg-offset-2">
                        <button onClick={this.submitEvent} className="btn btn-primary">Submit</button>
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
