import { tabReducer } from 'react-native-navigation-redux-helpers';

const tabs = {
  routes: [
    { key: 'feed' },
    { key: 'profile' },
  ],
  key: 'HomeTabs',
  index: 0,
};

export default tabReducer(tabs);
