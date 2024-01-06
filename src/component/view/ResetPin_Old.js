// React native and others libraries imports
import React, { useState } from 'react';
import { Alert, ImageBackground, TouchableOpacity, Dimensions, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import CodeInput from './CodeInput';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';
import { Icon } from 'react-native-elements';





const ResetPinFirst = ({ OnClose, OnComplete }) => {

  const [code, setCode] = useState("")


  const getCodeOne = (code) => {

    if (code.length == 4) {
      setCango(true)
    }
  }



  return (
    <Container style={{ backgroundColor: '#fff' }}>
      <Content>
        <View style={styles.body}>
          <View style={{ height: 20 }}></View>
          <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 2 }}>
      <TouchableOpacity onPress={() => OnClose()} >
          <Icon
            name="arrowleft"
            size={30}
            type='antdesign'
            color={lightTheme.PRIMARY_COLOR}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
         
        </View>
        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
      </View>
          <View style={styles.mainContent}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 10, marginTop: 25, marginLeft: 25, marginRight: 25 }}>
              <Text style={{ color: '#0F0E43', fontFamily: font.BOLD, fontSize: 20 }}>Change Pin </Text>
              <Text style={{ marginRight: 25, color: lightTheme.BLACK_TEXT_COLOR, fontFamily: 'Poppins-Light', fontSize: 16 }}>Let’s change your PIN for all your transactions.  </Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
              <Text style={{ color: '#0F0E43', fontFamily: font.BOLD, fontSize: 20, marginBottom: 20 }}>Enter Old Pin </Text>
              <CodeInput onChangeText={(txt) => setCode(txt)} />
            </View>

            <TouchableOpacity style={[styles.buttonContainer, code.length == 4? { backgroundColor: lightTheme.PRIMARY_COLOR,}:{ backgroundColor: "#ADADAD"} ]} onPress={() => OnComplete(code)}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 16 }}>CONTINUE</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Content>
    </Container>

  );
}
export default ResetPinFirst

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mainContent: {
    flex: 1,


  },
  sideContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff'
  },
  title: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 15,
    color: '#2D2C71',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold'
  },
  textInputContainer: {
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    height: 65,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12,
    flexDirection: 'row'
  },
  actionbutton: {
    marginTop: 7,
    marginBottom: 2,
    opacity: 0.5,
    fontSize: 14,
    color: '#0F0E43',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular'
  },
  buttonContainer: {
    height: 55,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    borderRadius: 25,
    marginBottom: 10,
   
    justifyContent: 'center', alignItems: 'center',
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#d1d1d1",
    margin: 3,
    color: 'black'
  },

  underlineStyleHighLighted: {
    borderColor: "#d1d1d1",
  },

});

