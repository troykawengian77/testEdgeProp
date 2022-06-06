import React, { Component } from 'react';
import { AppRegistry, View, Alert, BackHandler, StyleSheet, Text } from 'react-native';
import Routes from './src/navigation/Base/base';
import { Provider } from "react-redux";
import { store, persistor } from './src/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

const toastConfig = {
  success: ({ text1, props, ...rest }) => (
    <View style={[styles.container_toast, styles.success]}>
      <Text style={styles.text_toast}>{text1}</Text>
    </View>
  ),
  error: ({ text1, props, ...rest }) => (
    <View style={[styles.container_toast, styles.error]}>
      <Text style={styles.text_toast}>{text1}</Text>
    </View>
  ),
  info: ({ text1, props, ...rest }) => (
    <View style={[styles.container_toast, styles.info]}>
      <Text style={styles.text_toast}>{text1}</Text>
    </View>
  ),
  warning: ({ text1, props, ...rest }) => (
    <View style={[styles.container_toast, styles.warning]}>
      <Text style={styles.text_toast}>{text1}</Text>
    </View>
  ),
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <Toast
            // ref={ref => Toast.setRef(ref)} 
            config={toastConfig} />
        </PersistGate>
      </Provider>

    )
  }
}

const styles = StyleSheet.create({
  container_toast: {
    height: 54,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  success: {
    backgroundColor: '#28a745',
  },
  info: {
    backgroundColor: '#17a2b8',
  },
  error: {
    backgroundColor: '#dc3545',
  },
  warning: {
    backgroundColor: '#ffc107',
  },
  text_toast: {
    color: '#fff',
  },
});
