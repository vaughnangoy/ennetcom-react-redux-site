import { addToCart } from '../reducers/shared/shared_cart_operations';
import { ADD_TO_CART, SYNC_CART_DATA, REMOVE_FROM_CART, CHANGE_QTY, CLEAR_CART } from '../actions/types';

export default store => next => action => {
	let nextStoreUpdate;

	if (action.type == ADD_TO_CART) {
		nextStoreUpdate = addToCart(store.getState(), action, 'cart');
		localStorage.setItem(SYNC_CART_DATA, JSON.stringify(nextStoreUpdate));
	}

	if (action.type == REMOVE_FROM_CART) {
		nextStoreUpdate = store.getState().cart.filter((item) => item.id != action.payload.id);
		localStorage.setItem(SYNC_CART_DATA, JSON.stringify(nextStoreUpdate));

	}
	if (action.type == CHANGE_QTY) {
		debugger;
		nextStoreUpdate = store.getState().cart.map((item) => { return item.id == action.payload.id ? action.payload : item; });
		localStorage.setItem(SYNC_CART_DATA, JSON.stringify(nextStoreUpdate));
		}

	if (action.type == CLEAR_CART) {
		nextStoreUpdate = [];
		localStorage.setItem(SYNC_CART_DATA, JSON.stringify(nextStoreUpdate));
	}
	next(action);
};
