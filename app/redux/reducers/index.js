import { combineReducers } from 'redux';

import cardNavigation from './cardNavigation';
import tabReducer from './tabs';

export default combineReducers({
  cardNavigation,
  tabReducer
});
