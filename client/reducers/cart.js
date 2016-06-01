import { addToCart } from '../reducers/shared/shared_cart_operations';

import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_QTY,
	CLEAR_CART,
	INIT_CART_DATA,
} from '../actions/types';

export default function (state = [], action) {

	switch (action.type) {
		case ADD_TO_CART:
			return addToCart(state, action);
		case REMOVE_FROM_CART:
			return state.filter((item) => item.id != action.payload.id);
		case CHANGE_QTY:
			return state.map((item) => { return item.id == action.payload.id ? action.payload : item; });
		case CLEAR_CART:
			return [];
		case INIT_CART_DATA:
			return [...action.payload];
		default:
			return state;
	}
}

