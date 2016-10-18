import { CALL_API } from '../constants';
import apiConstants from '../constants/api';
import { normalize, Schema, arrayOf, valuesOf } from 'normalizr';
import decode from 'jwt-decode';
import 'isomorphic-fetch';
import _ from 'lodash';
import { camelizeKeys } from 'humps';
import urlencoded from 'form-urlencoded';
const { API_URL } = apiConstants;
const API_ROOT = `${API_URL}`;


function callApi(endpoint, method, schema, body = {}, url = API_ROOT) {
  const fullUrl = `${API_ROOT}/${endpoint}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `luc.cyril`,
  };

  const fetchParameters = {
    method,
    headers,
  };

  if (method === 'post') {
    fetchParameters.body = JSON.stringify(body);
  }

  return fetch(fullUrl, fetchParameters)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      if (!_.isEmpty(schema)) {
        const camelizedJson = camelizeKeys(json);
        return Object.assign({},
          normalize(camelizedJson, schema)
        );
      }
      return json;
    });
}

//MODIFY HERE
// example : const b2bClientSchema = new Schema('b2bClient');
const pizzaSchema = new Schema('pizza');
const orderSchema = new Schema('order');

export const Schemas = {
  PIZZA: pizzaSchema,
  PIZZA_ARRAY: arrayOf(pizzaSchema),
  ORDER: orderSchema,
  ORDER_ARRAY: arrayOf(orderSchema)
};

// Curryfied middleware function for readability
export default store => next => action => { // eslint-disable-line no-unused-vars
  const apiCall = action[CALL_API];
  if (typeof apiCall === 'undefined') {
    return next(action);
  }

  const { endpoint } = apiCall;
  let { url } = apiCall;
  const { types, schema, method } = apiCall;
  if (!url) {
    url = API_ROOT;
  }

  let body;
  if (method === 'post') {
    body = apiCall.body;
  }

  let payload = {};
  if (apiCall.payload) {
    payload = apiCall.payload;
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string as endpoint');
  }

  // Transform the action created by the actionCreator into an usable action for the reducer
  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType, isFetching: true }));

  // Make API call and dispatch action according to the promise state
  return callApi(endpoint, method, schema, body).then(
      (response) => {
        let objectResponse = {};
        if (typeof response === 'string') {
          objectResponse = JSON.parse(response);
        } else {
          objectResponse = response;
        }
        next(actionWith({ objectResponse, isFetching: false, type: successType }));

        if (Object.keys(payload).length > 0) {
          next(payload.action(...payload.success));
        }
      },
      (error) => {
        next(actionWith({
          type: failureType,
          isFetching: false,
          error: error.message || 'Une erreur est survenue',
        }));

        if (Object.keys(payload).length > 0) {
          next(payload.action(...payload.error, `Erreur : ${error.message}`));
        }
      }
  );
};
