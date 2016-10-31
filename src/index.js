import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from 'app';
import Welcome from 'welcome';
import Signin from 'auth/signin';
import Signout from 'auth/signout';
import Signup from 'auth/signup';
import Feature from 'feature';
import RequireAuth from 'auth/require_auth.js'
import reducers from 'reducers';
import { AUTH_USER } from 'types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token');
//if we have a token consider user to be signed in
if(token) {
  //we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin}></Route>
        <Route path="signout" component={Signout}></Route>
        <Route path="signup" component={Signup}></Route>
        <Route path="feature" component={RequireAuth(Feature)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
