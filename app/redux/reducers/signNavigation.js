import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'signNavigator',
  index: 0,
  routes: [
    {
      key: 'sign',
      index: 0,
    },
  ],
};

module.exports = cardStackReducer(initialState);
