import { Schemas } from '../middleware/api';

import types, { CALL_API } from '../constants';
const {
  LIST_ALL_PIZZAS_REQUEST,
  LIST_ALL_PIZZAS_SUCCESS,
  LIST_ALL_PIZZAS_FAILURE,
} = types;

export function listPizzas() {
  return {
    [CALL_API]: {
      types: [
        LIST_ALL_PIZZAS_REQUEST,
        LIST_ALL_PIZZAS_SUCCESS,
        LIST_ALL_PIZZAS_FAILURE,
      ],
      method:'get',
      endpoint: 'pizzas',
      schema: Schemas.PIZZA_ARRAY,
    },
  };
}

//Return thunk
export function fetchListPizzas() {
  return dispatch => dispatch(listPizzas());
}
