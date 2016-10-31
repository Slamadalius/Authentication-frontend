import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from 'actions';

class Signup extends Component {
    render() {
        const {
            handleSubmit
        } = this.props;
        return (
            <form >
                <Field component={renderField} type="email" name="email" label="Email" />
                <Field component={renderField} type="password" name="password" label="Password" />
                <Field component={renderField} type="password" name="passwordConfirm" label="Confirm Password" />
                <button type="submit" className="btn btn-primary">Sign Up</button>

            </form>
        );
    }
}

const validate = (formProps) => {
    const errors = {};

    //Check email value for empty
	if (!formProps.email) {
		errors.email = 'Email is required'
	}

	//Check password value for empty
	if (!formProps.password) {
		errors.password = 'Password is required'
	}

    if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Cannot be empty'
	}

    if(formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords have to match';
    }

    console.log(formProps);
    console.log(errors.password);
    return errors;
}

const renderField = ({input, label, type, meta: {touched, error, invalid} }) => {
    const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';
    const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';

    return (
        <div className={groupClass}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type} className={inputClass}/>
            <div className="form-control-feedback">
                {touched ? <span>{error}</span>: ''}
            </div>
        </div>
    )
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default(Signup);
