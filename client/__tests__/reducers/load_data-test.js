jest.unmock('../../reducers/load_data');
import reducer from '../../reducers/load_data';

import { LOAD_DATA } from '../../actions/types';

describe('Site Data reducer', () => {

	const data = [{_key:'cart', data:'123'}, {_key:'checkout', data:''}];
	const data2 = [{_key:'test', data:'456'}, {_key:'user', data:'abc'}];


	it('should return the initial blank state', () => {
		let operation = reducer(undefined, []);
		expect(operation).toEqual([]);
	});

	it('should load the data', () => {
		let operation = reducer([], {type: LOAD_DATA, payload: data });
		expect(operation).toEqual(data);
	});

	it('should append the data', () => {
		let operation = reducer(data, {type: LOAD_DATA, payload: data2 });
		expect(operation).toEqual([...data, ...data2]); 
	});

});