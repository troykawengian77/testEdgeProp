import React, { Component } from 'react';
import { AppRegistry, View, Alert, BackHandler } from 'react-native';
import Routes from './src/navigation/Base/base';
import { Provider } from "react-redux";
import { store, persistor } from './src/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>

    )
  }
}
