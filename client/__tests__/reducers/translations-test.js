jest.unmock('../../reducers/translations');
import reducer from '../../reducers/translations';

import { LOAD_FORMS_DATA } from '../../actions/types';

describe('Translations reducer', () => {

	const data = [{_key:'english', data:'123'}, {_key:'french', data:''}];
	const data2 = [{_key:'german', data:'456'}, {_key:'user', data:'abc'}];


	it('should return the initial blank state', () => {
		let operation = reducer(undefined, []);
		expect(operation).toEqual([]);
	});

	it('should load the data', () => {
		let operation = reducer([], {type: LOAD_FORMS_DATA, payload: data });
		expect(operation).toEqual(data);
	});

	it('should append the data', () => {
		let operation = reducer(data, {type: LOAD_FORMS_DATA, payload: data2 });
		expect(operation).toEqual([...data, ...data2]); 
	});

});