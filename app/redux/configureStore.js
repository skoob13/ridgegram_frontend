import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import devTools from 'remote-redux-devtools';
import reducer from './reducers';
import promise from '../helpers/promise';

export default function configureStore(onCompletion: () => void):any {
  const enhancer = compose(
    applyMiddleware(promise),
    devTools({
      name: 'Ridgegram', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
