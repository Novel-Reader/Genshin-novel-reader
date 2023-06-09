import { combineReducers } from 'redux';
import { NUM_ADD, NUM_REDUCE, NUM_CHANGE } from './reducer-types';

// for class component
function numReducer(state = 0, action) {
  switch (action.type) {
    case NUM_ADD: {
      return state + action.payload;
    }
    case NUM_REDUCE: {
      return state - action.payload;
    }
    case NUM_CHANGE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({ numReducer });
