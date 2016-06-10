jest.unmock('../../reducers/user_details');
import reducer from '../../reducers/user_details';

import { SAVE_LOCATION, REMOVE_LOCATION, SAVE_USER_DETAILS, INIT_USER_DATA } from '../../actions/types';

describe('User details reducer', () => {

	const data = {firstname: "Test", surname: "User", email: "Test@user.local"};
	const data2 = {firstname: "New", surname: "UserTester", email: "UserTester@myuser.dev"};

	it('should return the initial blank state', () => {
		let operation = reducer(undefined, {});
		expect(operation).toEqual({});
	});

	it('should save last location', () => {
		let operation = reducer([], {type: SAVE_LOCATION, payload: '/cart' });
		expect(operation).toEqual({ lastLocation: '/cart' });
	});

	it('should set the location to null', () => {
		let operation = reducer({ lastLocation: '/cart' }, {type: REMOVE_LOCATION });
		expect(operation).toEqual({ lastLocation: null }); 
	});

	it('should save the user details', () => {
		let operation = reducer({}, {type: SAVE_USER_DETAILS, payload: data });
		expect(operation).toEqual( data ); 
	});

	it('should update the user details', () => {
		let operation = reducer(data, {type: SAVE_USER_DETAILS, payload: data2 });
		expect(operation).toEqual( data2 ); 
	});

	it('should save the initial user details', () => {
		let operation = reducer({}, {type: INIT_USER_DATA, payload: data });
		expect(operation).toEqual( data ); 
	});

});