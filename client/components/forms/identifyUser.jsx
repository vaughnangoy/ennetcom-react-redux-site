import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import styles from './styles.scss';

let fieldList = [
	{ name: 'email', validate: 'empty' },
	{ name: 'password', validate: 'empty' },
];

const lastRoute = '/checkout';

class IdentifyUser extends Component {
	handleFormSubmit(formProps) {
		this.props.identifyUser(formProps);
	}

	componentWillMount() {
		fieldList = fieldList.map((fieldObject) => {
			return Object.assign(fieldObject, { errorMessage: typeof fieldObject.name != 'undefined' ? this.props.translations.errors[fieldObject.name] : this.props.translations.errors[fieldObject.to] });
		});
	}

	render() {
		const { handleSubmit, fields: { email, password } } = this.props;

		return (
		  <form className="standard" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			<fieldset className="form-group">
			  <label>{this.props.translations.email}:</label>
			  <input className="form-control" {...email} />
			  {email.touched && email.error && <div className="error">{email.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.password}:</label>
			  <input className="form-control" {...password} type="password" />
			  {password.touched && password.error && <div className="error">{password.error}</div>}
			</fieldset>

			<button action="submit" className="btn btn-primary">{this.props.translations.signIn}</button>
		  </form>
		);
	}
}

function validate(formProps) {
	const errors = {};

	for (var field of fieldList) {
		if (typeof field.name == 'string' && !formProps[field.name]) {
			errors[field.name] = field.errorMessage;
		}
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error || '',
		translations: state.translations[0].forms,
		auth: state.auth,
	};
}

export default reduxForm({
	form: 'createUser',
	fields: fieldList.filter((field) => field.name).map((field) => field.name),
	validate,
}, mapStateToProps, actions)(IdentifyUser);