import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';
import styles from './styles.scss';

let fieldList = [
	{ name: 'email', validate: 'empty' },
	{ name: 'firstname', validate: 'empty' },
	{ name: 'surname', validate: 'empty' },
	{ name: 'contactno', validate: 'empty' },
	{ name: 'password', validate: 'empty' },
	{ name: 'passwordConfirmation', validate: 'empty' },
	{ name: 'street', validate: 'empty' },
	{ name: 'addressLine2', validate: 'empty' },
	{ name: 'city', validate: 'empty' },
	{ name: 'postcode', validate: 'empty' },
	{ name: 'country', validate: 'empty' },
	{ compare: 'password', to: 'passwordConfirmation' },
];

const lastRoute = '/checkout';

class CreateUser extends Component {
	handleFormSubmit(formProps) {
		this.props.createUser(formProps);
 	}

 	componentWillMount() {
		fieldList = fieldList.map((fieldObject) => {
			return Object.assign(fieldObject, { errorMessage: typeof fieldObject.name != 'undefined' ? this.props.translations.errors[fieldObject.name] : this.props.translations.errors[fieldObject.to] });
	});

 	}

		render() {
			const { handleSubmit, fields: { email, firstname, surname, contactno, password, passwordConfirmation, street, addressLine2, city, postcode, country } } = this.props;

			return (
		  <form className="standard" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			<fieldset className="form-group">
			  <label>{this.props.translations.firstname}:</label>
			  <input className="form-control" {...firstname} />
			  {firstname.touched && firstname.error && <div className="error">{firstname.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.surname}:</label>
			  <input className="form-control" {...surname} />
			  {surname.touched && surname.error && <div className="error">{surname.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.contactno}:</label>
			  <input className="form-control" {...contactno} />
			  {contactno.touched && contactno.error && <div className="error">{contactno.error}</div>}
			</fieldset>
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
			<fieldset className="form-group">
			  <label>{this.props.translations.passwordConfirmation}:</label>
			  <input className="form-control" {...passwordConfirmation} type="password" />
			  {passwordConfirmation.touched && passwordConfirmation.error && <div className="error">{passwordConfirmation.error}</div>}
			</fieldset>
			<hr />
			<fieldset className="form-group">
			  <label>{this.props.translations.street}:</label>
			  <input className="form-control" {...street} />
			  {street.touched && street.error && <div className="error">{street.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>&nbsp;</label>
			  <input className="form-control" {...addressLine2} />
			  {addressLine2.touched && addressLine2.error && <div className="error">{addressLine2.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.city}:</label>
			  <input className="form-control" {...city} />
			  {city.touched && city.error && <div className="error">{city.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.postcode}:</label>
			  <input className="form-control" {...postcode} />
			  {postcode.touched && postcode.error && <div className="error">{postcode.error}</div>}
			</fieldset>
			<fieldset className="form-group">
			  <label>{this.props.translations.country}:</label>
			  <input className="form-control" {...country} />
			  {country.touched && country.error && <div className="error">{country.error}</div>}
			</fieldset>

			<button action="submit" className="btn btn-primary">{this.props.translations.signUp}</button>
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
			else if (typeof field.compare == 'string' && typeof field.to == 'string' && formProps[field.compare] !== formProps[field.to]) {
				errors[field.to] = field.errorMessage;
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
}, mapStateToProps, actions)(CreateUser);
