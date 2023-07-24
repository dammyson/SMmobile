/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React, {Component, AppRegistry} from 'react';
import Main from './src/navigation/app-stack';

import { Provider } from 'react-redux';
import store from './src/store';
import Loader from './src/component/Loader';

export default class App extends Component{
 
  render() {
    return (
      <Provider store={store}>
      <Main/>
      <Loader />
      </Provider>
    );
  }
}