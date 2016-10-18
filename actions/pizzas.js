import { Schemas } from '../middleware/api';

import types, { CALL_API } from '../constants';
const {
  LIST_ALL_PIZZAS_REQUEST,
  LIST_ALL_PIZZAS_SUCCESS,
  LIST_ALL_PIZZAS_FAILURE,
  ORDER_PIZZA_REQUEST,
  ORDER_PIZZA_SUCCESS,
  ORDER_PIZZA_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAILURE,
} = types;

/*
  Get all the orders
  @returns object
*/
export function listOrders() {
  return {
    [CALL_API]: {
      types: [
        LIST_ORDERS_REQUEST,
        LIST_ORDERS_SUCCESS,
        LIST_ORDERS_FAILURE,
      ],
      method: 'get',
      endpoint: 'orders',
      schema: Schemas.ORDER_ARRAY,
    },
  };
}

/*
  Get a single order
  @params id:number
  @returns object
*/
export function getOrder(id) {
  return {
    [CALL_API]: {
      types: [
        GET_ORDER_REQUEST,
        GET_ORDER_SUCCESS,
        GET_ORDER_FAILURE,
      ],
      method: 'get',
      endpoint: `orders/${id}`,
      schema: Schemas.ORDER,
    },
  };
}
/*
  List pizzas
  @returns object
*/
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

/*
  Order a pizza
  @params id:number
  @returns object
*/
export function orderPizza(id) {
  return {
    [CALL_API]: {
      types: [
        ORDER_PIZZA_REQUEST,
        ORDER_PIZZA_SUCCESS,
        ORDER_PIZZA_FAILURE,
      ],
      method: 'post',
      endpoint: 'orders',
      body: {
        id,
      },
    },
  };
}

/*
  Dispatch the list pizza action
  @returns function (thunk)
*/
export function fetchListPizzas() {
  return dispatch => dispatch(listPizzas());
}

/*
  Dispatch the order pizza action
  @returns function (thunk)
*/
export function dispatchOrderPiza(id) {
  console.log('id :', id);
  return dispatch => dispatch(orderPizza(id));
}

/*
  Dispatch list Order action
  @returns function (thunk)
*/
export function fetchOrderList() {
  return dispatch => dispatch(listOrders());
}

/*
  Dispatch  getOrder action
  @params id:number
  @returns function (thunk)
*/
export function fetchSingleOrder(id) {
  return dispatch => dispatch(getOrder(id))
}
