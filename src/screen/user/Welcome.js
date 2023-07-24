// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import color from '../../component/color'
import { lightTheme } from '../../theme/colors';
import { auth_logo } from '../../assets';
import { font } from '../../constants';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }


  componentWillMount() {

  }

  render() {
    return (
      <ImageBackground
      source={require('../../assets/welcome.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
          <View style={styles.body}>
            <View style={styles.mainContent}>

              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                  <Image
                    style={styles.logo}
                    source={auth_logo}
                  />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ color: lightTheme.WHITE_COLOR, fontFamily: font.BOLD, fontSize: 26 }}>Welcome to Sendmonny</Text>
                  <Text style={{ color: lightTheme.WHITE_COLOR, fontFamily: font.MEDIUM, fontSize: 12, marginTop:15, marginHorizontal:20, textAlign:'center' }}>We bridge the gap between merchants and customers, revolutionizing payment experiences by simplifying the process and enhancing speed. </Text>
                </View>

              </View>

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.itemClicked("Customer")}  >
                <Text style={{ fontFamily: 'Poppins-SemiBold', color:  lightTheme.PRIMARY_COLOR, fontSize: 14 }}>Sign up</Text>
              </TouchableOpacity>


              <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' , marginBottom:20}}>

                <Text style={{ color:  lightTheme.WHITE_COLOR, fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Don't you have an accoount   </Text>

                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('login')}  style={{ alignItems: 'center' }}>
                  <Text style={{ color: lightTheme.WHITE_COLOR, fontFamily: font.BOLD, fontSize: 14, marginBottom: 7, marginTop: 7 }}>Log in   </Text>
                </TouchableOpacity>
              </View>
            </View>


          </View>
      </ImageBackground>

    );
  }
  itemClicked(type) {
    AsyncStorage.setItem('type', type);
    this.props.navigation.navigate('reg')

  }


  new() {
    <Button onPress={() => this.itemClicked('MERCHANT')} style={styles.transButtonContainer} block iconLeft>
      <Icon name='ios-home' style={{ color: color.slide_color_dark }} />
      <Text style={{ color: color.slide_color_dark, fontWeight: '400' }}>Merchant</Text>
    </Button>
  }

}
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
    justifyContent: 'center',

  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,


  },

  buttonContainer: {
    height: 55,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: lightTheme.WHITE_COLOR,
    justifyContent: 'center', alignItems: 'center',
  },

});

