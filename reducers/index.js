import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import pizza from './pizza';
import order from './order';

const rootReducer = combineReducers({
  routing,
  pizza,
  order,
});

export default rootReducer;
