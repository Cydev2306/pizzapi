import keyMirror from 'keymirror';

export default keyMirror({
  LIST_ALL_PIZZAS_REQUEST: null,
  LIST_ALL_PIZZAS_SUCCESS: null,
  LIST_ALL_PIZZAS_FAILURE: null,
  ORDER_PIZZA_REQUEST: null,
  ORDER_PIZZA_SUCCESS: null,
  ORDER_PIZZA_FAILURE: null,
  GET_ORDER_REQUEST: null,
  GET_ORDER_SUCCESS: null,
  GET_ORDER_FAILURE: null,
  LIST_ORDERS_REQUEST: null,
  LIST_ORDERS_SUCCESS: null,
  LIST_ORDERS_FAILURE: null,
});

export const CALL_API = Symbol('CALL_API');
