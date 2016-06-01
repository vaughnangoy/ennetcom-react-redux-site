import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import syncStoreToLocalStorage from './middlewares/syncStoreToLocalStorage';
import reducer from './reducers';
import { LOAD_DATA, AUTH_USER, SYNC_CART_DATA, INIT_CART_DATA, SYNC_USER_DATA, INIT_USER_DATA } from './actions/types';
import { fetchData, fetchFormsData, fetchEcommerceData, checkIntegrity } from './actions';
import RequireAuth from './components/auth/require_auth';

import App from './components/app';
import Home from './components/layouts/index';
import Blackberry from './components/layouts/blackberry-product';
import Markets from './components/layouts/markets';
import About from './components/layouts/about';
import Solutions from './components/layouts/solutions';
import Platform from './components/layouts/platform';
import MacbookLayout from './components/layouts/macbook';
import Cart from './components/layouts/cart';
import Checkout from './components/layouts/checkout';
import SignInUp from './components/layouts/signInUp';

const store = createStore(reducer, {}, compose(applyMiddleware(syncStoreToLocalStorage, reduxThunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
const token = localStorage.getItem('token');

store.dispatch(fetchData());
store.dispatch(fetchFormsData());
store.dispatch(fetchEcommerceData());
checkIntegrity(store.dispatch, SYNC_CART_DATA, INIT_CART_DATA, 'isArray');
checkIntegrity(store.dispatch, SYNC_USER_DATA, INIT_USER_DATA, 'object');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store} >
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/products/encrypted-blackberry" component={Blackberry} />
      		<Route path="/markets" component={Markets} />
      		<Route path="/about" component={About} />
      		<Route path="/business-solutions" component={Solutions} />
      		<Route path="/blackberry-platform" component={Platform} />
          <Route path="/products/:id" component={MacbookLayout} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={RequireAuth(Checkout)} />
      		<Route path="/signin" component={SignInUp} />
        </Route>
      </Router>
  </Provider>
  , document.querySelector('.container')
);
