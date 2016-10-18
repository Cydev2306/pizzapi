import Immutable from 'immutable';
import types from '../constants';

const {
  LIST_ORDERS_REQUEST,
  LIST_ORDERS_SUCCESS,
  LIST_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
} = types;


const defaultState = Immutable.fromJS({
  isFetching: false,
  error: '',
  entities: {},
  result: [],
});

export default function orderReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDER_REQUEST:
    case LIST_ORDERS_REQUEST:
      return state.set('isFetching', action.isFetching);
    case GET_ORDER_SUCCESS:
      return state
        .mergeDeepIn(['entities'], Immutable.fromJS(action.objectResponse.entities.order))
        .mergeDeepIn(['result'], Immutable.fromJS(action.objectResponse.result))
        .set('isFetching', false)
        .set('error', '');
    case LIST_ORDERS_SUCCESS:
      return state
        .set('entities', Immutable.fromJS(action.objectResponse.entities.order))
        .set('result', Immutable.fromJS(action.objectResponse.result))
        .set('isFetching', action.isFetching)
        .set('error', '');
    case GET_ORDER_FAILURE:
    case LIST_ORDERS_FAILURE:
      return state
        .set('isFetching', action.isFetching)
        .set('error', action.error);
    default:
      return state;
  }
}
