import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import pizza from './pizza';

const rootReducer = combineReducers({
  routing,
  pizza,
});

export default rootReducer;
