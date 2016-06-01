import axios from 'axios';
import { browserHistory } from 'react-router';
import {
	LOAD_DATA,
	LOAD_ECOMMERCE_DATA,
	LOAD_FORMS_DATA,
	AUTH_ERROR,
	AUTH_USER,
	SAVE_USER_DETAILS,
	SYNC_USER_DATA,

} from './types';

const ROOT_URL = require('../lib/config.json').ROOT_URL;

function transformToKeyedData(data) {
	let keyedData = [];
	for (let keyName in data) {
		const singleData = Object.assign({}, data[keyName], { _key: keyName });
		keyedData.push(singleData);
	}
	return keyedData;
}

export function fetchData() {
	const data = require('../lib/data.json');
	return {
		type: LOAD_DATA,
		payload: transformToKeyedData(data),
	};
}

export function fetchEcommerceData() {
	const data = require('../lib/ecommerce.json');
	return {
		type: LOAD_ECOMMERCE_DATA,
		payload: [data],
	};
}

export function fetchFormsData() {
	const data = require('../lib/forms.json');
	return {
		type: LOAD_FORMS_DATA,
		payload: [data],
	};
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error,
	};
}

export function createUser({
	email,
	firstname,
	surname,
	contactno,
	password,
	street,
	addressLine2,
	city,
	postcode,
	country,
}, previousRoute = '/checkout') {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email,
			firstname,
			surname,
			contactno,
			password,
			street,
			addressLine2,
			city,
			postcode,
			country,
		})
		.then(response => {
			dispatch({ type: AUTH_USER });
			dispatch({ type: SAVE_USER_DETAILS, payload: response.data.userDetails });
			localStorage.setItem('token', response.data.token);
			localStorage.setItem(SYNC_USER_DATA, JSON.stringify(response.data.userDetails));
			browserHistory.push(previousRoute);
		})
		.catch(response => dispatch(authError(response.data)));
	};
}

export function identifyUser({ email, password }, previousRoute = '/checkout') {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				dispatch({ type: SAVE_USER_DETAILS, payload: response.data.userDetails });
				localStorage.setItem('token', response.data.token);
				localStorage.setItem(SYNC_USER_DATA, JSON.stringify(response.data.userDetails));
				browserHistory.push(previousRoute);
			})
			.catch(response => dispatch(authError(response.data)));
	};
}

export function syncToLocalStorage(name, data) {
	localStorage.setItem(name, data);
}

export function checkIntegrity(dispatch, LOCAL_STORAGE_KEY, DISPATCH_ACTION, checkType) {
	let localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
	let parsedData;

	function isValid(data) {
		switch (checkType) {
		case 'isArray':
			return data instanceof Array;
		case 'string':
			return typeof data == 'string';
		case 'object':
			return typeof data == 'object';
		}

		return false;
	}

	if (typeof localStorageData == 'string') {
		try {
			parsedData = JSON.parse(localStorageData);
		} catch (e) {
			console.log('cannot parse data from localstorage', e);
		}
	}

	if (isValid(parsedData)) {
		dispatch({
			type: DISPATCH_ACTION,
			payload: parsedData,
		});
	}
}

