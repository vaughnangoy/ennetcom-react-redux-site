import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MasterLayout from '../master_layout/masterLayout';
import CartList from '../cart/cartList';
import styles from './styles.scss';

let heroImage;

class Checkout extends Component {

	render() {
		return (
			<MasterLayout name="cart" headerClass="bottom-margin" >
				<h1 dangerouslySetInnerHTML={{ __html: this.props.translations.cart.title }}></h1>
				<div className="row column">
					<CartList />
				</div>
				<div className="row clearfix">
					<span className="cta-container primary"><Link to="/checkout">{this.props.translations.checkout.name}</Link></span>
				</div>
			</MasterLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		translations: state.ecommerce[0],
	};
}

export default connect(mapStateToProps)(Checkout);
