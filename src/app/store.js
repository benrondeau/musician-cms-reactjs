import { createStore } from 'redux';
import _ from 'lodash';

const initialState = {
  theBigEventStore: [],
};

function updateEvents(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SINGLE_EVENT':
      // var action = {
      //   type: 'ADD_SINGLE_EVENT',
      //   event: {id: '1', event_title : 'Hey'}
      // };
      //
      // Add the new event onto the end of the array
      const newSingleEvent = {
        theBigEventStore: state.theBigEventStore.concat([action.event])
      };
      return newSingleEvent;
    case 'POPULATE_EVENT_LIST':
      // var action = {
      //   type: 'POPULATE_EVENT_LIST',
      //   event: [...all the events]
      // };
      //
      // Just dump the new array of events into the store
      const allNewEvents = {
        theBigEventStore: action.event,
      };
      return allNewEvents;
    case 'UPDATE_EVENT':
      // var action = {
      //   type: 'UPDATE_EVENT',
      //   event: {id: '1', event_title : 'Hey'}
      // };
      //
      // Remove event with the id of the updated event, so it an be replaced.
      let updateEvent = _.filter(state.theBigEventStore, event => event.id !== action.event.id);
      // add the updated event as if it was new
      updateEvent[action.event.id] = action.event;
      return updateEvent;
    case 'REMOVE_EVENT':
      // var action = {
      //   type: 'REMOVE_EVENT',
      //   event: {id: '1', event_title : 'Hey'}
      // };
      // Filters through current events and removes the one that matches the id of one passed in.
      const eventsMinusOne = _.filter(state.theBigEventStore, event => event.id !== action.event.id);
      return Object.assign({}, state, { theBigEventStore: eventsMinusOne });
    default:
      return state;
  }
}

const store = createStore(updateEvents);
export default store;
