jest.unmock('../../reducers/auth');
import reducer from '../../reducers/auth';

import {
	AUTH_USER,
  	UNAUTH_USER,
  	AUTH_ERROR
} from '../../actions/types';

describe('Auth reducer', () => {

	it('should return the initial blank state', () => {
		let operation = reducer(undefined, {});
		expect(operation).toEqual({});
	});

	it('should update the authenticated property to true', () => {
		let operation = reducer({}, {type: AUTH_USER});
		expect(operation).toEqual({error: '', authenticated: true});
	});

	it('should update the authenticated property to false', () => {
		let operation = reducer({}, {type: UNAUTH_USER});
		expect(operation).toEqual({authenticated: false});
	});

	it('should update the error property with error text', () => {
		let operation = reducer({}, {type: AUTH_ERROR, payload: 'there was an error'});
		expect(operation).toEqual({error: 'there was an error'});
	});

	it('should update the error property to blank string when authenticated', () => {
		let operation = reducer({error: 'there was an error'}, {type: AUTH_USER});
		expect(operation).toEqual({authenticated: true, error: ''});
	});

});