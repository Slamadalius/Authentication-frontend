import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; //renaming reducer to form

const rootReducer = combineReducers({
  form
});

export default rootReducer;
