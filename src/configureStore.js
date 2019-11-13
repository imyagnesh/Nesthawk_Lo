import {createStore, applyMiddleware, compose} from 'redux';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {persistStore, persistReducer} from 'redux-persist';
import RNFetchBlob from 'rn-fetch-blob';
import createExpirationTransform from 'redux-persist-transform-expire';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let middleware = [
  sagaMiddleware,
  createReactNavigationReduxMiddleware(state => state.nav),
];

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middleware = [...middleware];
} else {
  middleware = [...middleware];
}

const expireTransform = createExpirationTransform();

FilesystemStorage.config({
  storagePath: `${RNFetchBlob.fs.dirs.DocumentDir}/persistStore`,
});

const persistConfig = {
  key: 'root',
  keyPrefix: '',
  storage: FilesystemStorage,
  blacklist: ['loading', 'error', 'nav', 'cart', 'network'],
  transforms: [expireTransform],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
}
