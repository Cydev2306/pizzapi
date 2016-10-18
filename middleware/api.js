import { CALL_API } from '../constants';
import apiConstants from '../constants/api';
import { normalize, Schema, arrayOf, valuesOf } from 'normalizr';
import decode from 'jwt-decode';
import 'isomorphic-fetch';
import _ from 'lodash';
import { camelizeKeys } from 'humps';
import urlencoded from 'form-urlencoded';
const { API_URL } = apiConstants;
const API_ROOT = `${API_URL}/v1`;


function callApi(endpoint, method, schema, body = {}) {

  const fullUrl = `${API_ROOT}/${endpoint}`;
  // const jwtToken = (typeof localStorage !== 'undefined')?localStorage.getItem('jwt-token'):'';

  const headers = {
    Accept: 'application/json, text/plain',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'luc.cyril',
  };

  const fetchParameters = {
    method,
    headers,
  };

  return fetch(fullUrl, fetchParameters)
      .then(response =>
          response.json().then(json => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        const camelizedJson = camelizeKeys(json);
        if (!_.isEmpty(schema)) {
          return Object.assign({},
            normalize(camelizedJson, { data: schema })
          );
        }
        return camelizedJson;
      });
}

//MODIFY HERE
// example : const b2bClientSchema = new Schema('b2bClient');
export const Schemas = {
  // export example -> B2B_CLIENT: b2bClientSchema
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
