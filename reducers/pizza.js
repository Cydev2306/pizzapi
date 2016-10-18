import types from '../constants';
import Immutable from 'immutable';

const {
  LIST_ALL_PIZZAS_REQUEST,
  LIST_ALL_PIZZAS_SUCCESS,
  LIST_ALL_PIZZAS_FAILURE,
} = types;

const defaultState = Immutable.fromJS({
  isFetching: false,
  entities: {},
  result: [],
  error: '',
});

export default function pizzaReducer(state = defaultState, action) {
  switch (action.type) {
    case LIST_ALL_PIZZAS_REQUEST:
      return state.set('isFetching', action.isFetching);
    case LIST_ALL_PIZZAS_SUCCESS:
      return state
        .set('isFetching', action.isFetching)
        .set('entities', Immutable.fromJS(action.objectResponse.entities.pizza))
        .set('result', Immutable.fromJS(action.objectResponse.result));
    case LIST_ALL_PIZZAS_FAILURE:
      return state
        .set('isFetching', action.isFetching)
        .set('error', action.error);
    default:
      return state
  }
}
