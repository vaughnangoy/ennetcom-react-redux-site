import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { ADD_TO_CART } from '../../actions/types';

class CartButton extends Component {

	componentWillMount() {

	}

	render() {
		return <button onClick={this.props.onClick} className={this.props._className || ''}>{this.props.text || this.props.filtered_state.addtoCartName}</button>;
	}
}

CartButton.propTypes = {
	_className: PropTypes.string,
	text: PropTypes.string,
	productId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
	return {
		filtered_state: state.ecommerce[0].cart,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {

			dispatch({
				type: ADD_TO_CART,
				payload: {
					id: ownProps.productId,
					qty: 1,
				},
			});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
