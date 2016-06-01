import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MasterLayout from '../master_layout/masterLayout';
import CheckoutButton from '../buttons/checkoutButton';
import CartList from '../cart/cartList';
import styles from './styles.scss';

let heroImage;

class Checkout extends Component {

	componentWillMount() {
		const image = this.props.filtered_state.heroImage ? this.props.filtered_state.heroImage : 'Slide1_Ennetcom_Business_Solutions.jpg';
		heroImage = ['/build/assets/images/', image].join('');
	}
	
	render() {
		return (
		<MasterLayout name="checkout">
			<div data-type="background" style={{ background: ['url(', heroImage, ')'].join(''), backgroundSize: 'cover' }}></div>
			<div className="row">
				<div className="column medium-8">
					<CartList readonly />
				</div>
				<div className="column medium-4">
					<ul className="user-details">
						<li>{this.props.user.firstname} {this.props.user.surname}</li>
						<li>{this.props.user.street}</li>
						{this.props.user.addressLine2 && this.props.user.addressLine2 != '' && <li>{this.props.user.addressLine2}</li>}
						<li>{this.props.user.city}</li>
						<li>{this.props.user.postcode}</li>
						<li>{this.props.user.country}</li>
					</ul>
				</div>
			</div>
			<div className="row">
				<CheckoutButton />
			</div>
		</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		filtered_state: state.site.filter((compData) => compData._key == 'about')[0],
		ecommerce: state.ecommerce[0],
		user: state.user_details,
	};
}

export default connect(mapStateToProps)(Checkout);