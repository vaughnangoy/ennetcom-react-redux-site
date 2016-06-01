import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';

let hiddenFields;

class CheckoutButton extends Component {

	componentWillMount() {
		hiddenFields = this.props.filtered_state.checkout.hiddenFields.map((field) => {
			if (field.name == 'amount') {
				let total = this.props.cart.reduce((total, currentItem) => {

					let productItem = convertObjectValuesToArray(this.props.products).filter((product) => {
						return product.id == currentItem.id;
					})[0];

					return productItem.price + total;
				}, 0);

				return <input type="hidden" name={field.name} value={total.toFixed(2)} />;
			} else {
				return <input type="hidden" name={field.name} value={field.value} />;
			}
		});
	}

	render() {
		return (
			<form action={this.props.filtered_state.checkout.action} method="POST">
				{hiddenFields}
				<button onClick={this.props.onClick} className={this.props._className || ''}>{this.props.text || this.props.filtered_state.checkout.name}</button>
			</form>
		);
	}
}

CheckoutButton.propTypes = {
	_className: PropTypes.string,
	text: PropTypes.string,
};

function convertObjectValuesToArray(obj) {
	let convertedObj = [];

	for (let prop in obj) {
		convertedObj.push(obj[prop]);
	}

	return convertedObj;
}


function mapStateToProps(state) {
	return {
		filtered_state: state.ecommerce[0],
		products: state.site.filter((compData) => compData._key == 'products')[0],
		cart: state.cart,
	};
}

export default connect(mapStateToProps)(CheckoutButton);
