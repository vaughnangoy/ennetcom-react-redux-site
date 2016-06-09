jest.unmock('../../reducers/cart');
import reducer from '../../reducers/cart';

import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_QTY,
	CLEAR_CART,
	INIT_CART_DATA,
} from '../../actions/types';

describe('Cart reducer', () => {
	let item1 = {id: 'test123', qty: 1};
	let item2 = {id: 'my__book', qty: 4};

	it('should return the initial blank state', () => {
		let operation = reducer(undefined, {});
		expect(operation).toEqual([]);
	});

	it('should return the initial filled state', () => {
		let operation = reducer([], {type: INIT_CART_DATA, payload: [item1, item2]});
		expect(operation).toEqual([item1, item2]);
	});

	it('should clear the cart', () => {
		let operation = reducer([item1, item2], {type: CLEAR_CART});
		expect(operation).toEqual([]);
	});

	describe('adding cart items', () => {
		it('should add a new cart item', () => {
			let operation = reducer([], { type: ADD_TO_CART, payload: item1 });
			expect(operation).toEqual([item1]);
		});

		it('should append a different cart item', () => {
			let operation = reducer([item1], { type: ADD_TO_CART, payload: item2 });
			expect(operation).toEqual([item1, item2]);
		});

		it('should adjust the quantity of the same cart item', () => {
			let operation = reducer([item2], { type: ADD_TO_CART, payload: item2 });
			expect(operation).toEqual([{id: 'my__book', qty: 8}]);
		});
	});

	describe('removing cart items', () => {
		it('should remove the correct cart item', () => {
			let operation = reducer([item1, item2], { type: REMOVE_FROM_CART, payload: {id: item1.id} });
			expect(operation).toEqual([item2]);
		});

		it('should still hiold the exisiting cart item if id does not match', () => {
			let operation = reducer([item1, item2], { type: REMOVE_FROM_CART, payload: {id: 1234} });
			expect(operation).toEqual([item1, item2]);
		});
	});

	describe('changing quantity of the cart item', () => {
		it('should change the quanity to 8 from 1', () => {
			let operation = reducer([item1, item2], { type: CHANGE_QTY, payload: {id: item1.id, qty: 8} });
			expect(operation).toEqual([{id: 'test123', qty: 8}, item2]);
		});

		it('should change the quanity to 100 from 8', () => {
			let operation = reducer([item1, item2], { type: CHANGE_QTY, payload: {id: item1.id, qty: 100} });
			expect(operation).toEqual([{id: 'test123', qty: 100}, item2]);
		});
	});


	
});