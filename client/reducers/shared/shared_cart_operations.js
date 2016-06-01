import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_QTY,
	CLEAR_CART,
	SYNC_CART_DATA,
} from '../../actions/types';

export function addToCart(state, action, explicitReducer) {

	let composedState = typeof explicitReducer == 'string' ? state[explicitReducer] : state;
	let cartItem = composedState.filter((item) => item.id == action.payload.id);

	if (cartItem.length == 0) {
		return [...composedState, action.payload];
	}

	return composedState;
}
