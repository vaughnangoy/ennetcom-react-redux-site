import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import site from './load_data';
import cart from './cart';
import ecommerce from './ecommerce_data';
import translations from './translations';
import auth from './auth';
import user_details from './user_details';

const rootReducer = combineReducers({ site, cart, ecommerce, translations, auth, user_details, form });

export default rootReducer;
