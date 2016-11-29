import { combineReducers } from 'redux';

import auth from './auth';
import cardNavigation from './cardNavigation';
import signNavigation from './signNavigation';
import tabReducer from './tabs';
import feed from './feed';

export default combineReducers({
  auth,
  cardNavigation,
  feed,
  signNavigation,
  tabReducer,
});
