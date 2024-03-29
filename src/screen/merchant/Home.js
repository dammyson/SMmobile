/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, KeyboardAvoidingView, View} from 'react-native';

import AppNavigatori from '../../navigation/HomeTabsNavigation';



export default class Landing extends Component{
 
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior="height" enabled>
       <AppNavigatori/>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});