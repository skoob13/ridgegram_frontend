import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'splashscreen',
      index: 0,
    },
  ],
};

export default cardStackReducer(initialState);
