import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './styles.scss';

let numberOfCartItems;

class CartIndicator extends Component {

	componentWillMount() {
		numberOfCartItems = this.props.cart.length;
	}

	componentWillUpdate(nextProps) {
		numberOfCartItems = nextProps.cart.length;
	}

	render() {
		return (
			<div className="cart-indicator">
				<div>
					<Link to="/cart">
						<i className="fa fa-shopping-cart"></i>
						<span>{numberOfCartItems}</span>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	return {
		cart: state.cart
	};
};

export default connect(mapStateToProps)(CartIndicator);
