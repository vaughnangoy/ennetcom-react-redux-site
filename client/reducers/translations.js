import { LOAD_FORMS_DATA } from '../actions/types';

export default function (state = [], action) {
  	switch (action.type) {
  		case LOAD_FORMS_DATA:
    	return [...state, ...action.payload];
  	}

  	return state;
}
