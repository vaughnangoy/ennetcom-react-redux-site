import React, { Component } from 'react';
import { connect } from 'react-redux';

import MasterLayout from '../master_layout/masterLayout';
import CreateUserForm from '../forms/createUser';
import SignInForm from '../forms/identifyUser';
import styles from './styles.scss';

let heroImage;

class SignInUp extends Component {
	render() {
		return (
			<MasterLayout name="cart">
				<h1 dangerouslySetInnerHTML={{ __html: this.props.translations.title }}></h1>
				<div className="row">
					<div className="column medium-4">
						<CreateUserForm />
					</div>
					<div className="column medium-4">
						<SignInForm />
					</div>
				</div>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		translations: state.translations[0].signIn,
	};
}

export default connect(mapStateToProps)(SignInUp);
