import { LOAD_ECOMMERCE_DATA } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
  case LOAD_ECOMMERCE_DATA:
    return [...state, ...action.payload];
  }

  return state;
}
