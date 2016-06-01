import { SAVE_LOCATION, REMOVE_LOCATION, SAVE_USER_DETAILS, INIT_USER_DATA } from '../actions/types';

export default function (state = {}, action) {
  	switch (action.type) {
  		case SAVE_LOCATION:
			return Object.assign({}, state, { lastLocation: action.payload });
  		case REMOVE_LOCATION:
			return Object.assign({}, state, { lastLocation: null });
  		case SAVE_USER_DETAILS:
			return Object.assign({}, state, action.payload);
  		case INIT_USER_DATA:
			return Object.assign({}, state, action.payload);
  	}

  return state;
}
