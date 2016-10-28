import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from 'actions';

class Signin extends Component {
  handleFormSubmit ({ email, password }) {
    console.log(email, password);
    this.props.signinUser({ email, password} );
  }

  render () {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

Signin = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin);

export default Signin = connect(null, actions)(Signin);
