import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/reduxNavigation';
import configureStore from './src/configureStore';
import Loading from './src/components/loading/Loading';
import Login from './src/screens/login/Login';

const {store, persistor} = configureStore();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    const handleChange = () => {
      const currentValue = store.getState().login.USERNAME;
      if (currentValue !== loggedIn) {
        if (currentValue) {
          setLoggedIn(currentValue);
        } else {
          setLoggedIn(false);
        }
      }
    };
    store.subscribe(handleChange);
  }, [loggedIn]);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {loggedIn ? <Navigation /> : <Login />}
      </PersistGate>
    </Provider>
  );
};

export default App;
