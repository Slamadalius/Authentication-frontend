import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; //renaming reducer to form
import authReducer from 'auth_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;
