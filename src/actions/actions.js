import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from 'types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function (dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password }) // {email:email, password:password}
      .then(response => {
        //if request is good...
        //- Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        //- Save the JWT token
        localStorage.setItem('token', response.data.token);
        //- Redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        //if request is bad...
        //- Show an error to the user
        dispatch(authError('Bad login info'));
      });
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    //Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password }) // {email:email, password:password}
      .then(response => {
        dispatch({ type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error));
      });
  };
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
