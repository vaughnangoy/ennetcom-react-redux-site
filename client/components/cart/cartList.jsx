import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { CHANGE_QTY, REMOVE_FROM_CART } from '../../actions/types';

let cartDisplay;

class CartList extends Component {

	renderTable(props) {
		let listHeader = <thead><tr><th></th><th>{props.translations.itemName}</th><th>{props.translations.itemQty}</th><th>{props.translations.itemPrice}</th>{!props.readonly && <th></th>}</tr></thead>;
		let cartList = props.cart.map((cartItem, i) => {
			let productItem = convertObjectValuesToArray(props.products).filter((product) => { return product.id == cartItem.id; })[0];
			let price = productItem.price * cartItem.qty;
			return (<tr key={i}>
				<td><img src={productItem.image} /></td>
				<td>{productItem.title}</td>
				<td>{props.readonly ? cartItem.qty : <input type="text" name={['product-id_', productItem.id].join('')} onChange={props.onChange.bind(this)} value={cartItem.qty} />}</td>
				<td>{price.toFixed(2)}</td>
				{!props.readonly && <td><a className="remove" data-id={['product-id_', productItem.id].join('')} onClick={props.onClickRemove.bind(this)}>{props.translations.remove}</a></td>}
			</tr>);
		});

		let total = props.cart.reduce((total, currentItem) => {
			let productItem = convertObjectValuesToArray(props.products).filter((product) => { return product.id == currentItem.id; })[0];

			return productItem.price + total;
		}, 0);

		let colspan = !props.readonly ? 3 : 2;
		cartDisplay = cartList.length == 0 ? <p>{props.translations.noItems}</p> : <table>{listHeader}<tbody>{[...cartList, <tr key={9999}><td colSpan={colspan}></td><td className="alignRight" dangerouslySetInnerHTML={{ __html: [props.translations.total, ':'].join('') }}></td><td dangerouslySetInnerHTML={{ __html: [props.translations.currencySymbol, total.toFixed(2)].join('') }}></td></tr>]}</tbody></table>;
	}

	componentWillMount() {
		this.renderTable(this.props);
	}

	componentWillUpdate(nextProps) {
		this.renderTable(nextProps);
	}

	render() {
		return (
				<section className="cart-list">
					{cartDisplay}
				</section>
			);
	}
}

function convertObjectValuesToArray(obj) {
	let convertedObj = [];

	for (let prop in obj) {
		convertedObj.push(obj[prop]);
	}

	return convertedObj;
}

function mapStateToProps(state) {
	return {
		cart: state.cart,
		products: state.site.filter((compData) => compData._key == 'products')[0],
		translations: state.ecommerce[0].cart,
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: (event) => {
			dispatch({
				type: CHANGE_QTY,
				payload: {
					id: event.target.name.split('product-id_')[1],
					qty: event.target.value,
				},
			});
		},
		onClickRemove: (event) => {
			dispatch({
				type: REMOVE_FROM_CART,
				payload: {
					id: event.target.getAttribute('data-id').split('product-id_')[1],
				},
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartList);


