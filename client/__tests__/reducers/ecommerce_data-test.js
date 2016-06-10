jest.unmock('../../reducers/ecommerce_data');
import reducer from '../../reducers/ecommerce_data';

import { LOAD_ECOMMERCE_DATA } from '../../actions/types';

describe('Ecommerce reducer', () => {

	const data = [{_key:'cart', data:'123'}, {_key:'checkout', data:''}];
	const data2 = [{_key:'test', data:'456'}, {_key:'user', data:'abc'}];


	it('should return the initial blank state', () => {
		let operation = reducer(undefined, []);
		expect(operation).toEqual([]);
	});

	it('should load the data', () => {
		let operation = reducer([], {type: LOAD_ECOMMERCE_DATA, payload: data });
		expect(operation).toEqual(data);
	});

	it('should append the data', () => {
		let operation = reducer(data, {type: LOAD_ECOMMERCE_DATA, payload: data2 });
		expect(operation).toEqual([...data, ...data2]);
	});

});