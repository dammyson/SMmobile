// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Icon, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import color from '../../component/color'


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
      <Container style={{ backgroundColor: 'transparent' }}>
        <Content>
          <View style={styles.body}>
            <View style={styles.mainContent}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:15, marginTop:15  }}>
                <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Register As…</Text>
              </View>
              <TouchableOpacity onPress={() => this.itemClicked('CUSTOMER')} style={{ flexDirection: 'row', backgroundColor: '#FFECB4', padding: 20, marginRight: 30, marginLeft: 30, borderRadius: 5 }}>
                <View style={{ justifyContent: 'center', alignItems:'flex-start', flex: 1 }}>
                  <Text style={{ color: '#FFC107', fontFamily: 'Poppins-Bold', fontSize: 16 }}>Customer</Text>
                  <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-Medium', fontSize: 12 }}>For Personal Use</Text>
                </View>
                <View style={{}}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../../assets/human_phone.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:10, marginTop:10 }}>
                <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Or</Text>
              </View>
              <TouchableOpacity onPress={() => this.itemClicked('MERCHANT')}  style={{ flexDirection: 'row', backgroundColor: '#D5D4E2', padding: 20, marginRight: 30, marginLeft: 30, borderRadius: 5 }}>
                <View style={{ justifyContent: 'center', alignItems:'flex-start', flex: 1 }}>
                  <Text style={{ color: '#2D2C71', fontFamily: 'Poppins-Bold', fontSize: 16 }}>Merchant </Text>
                  <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-Medium', fontSize: 12 }}>For Business Use </Text>
                </View>
                <View style={{}}>
                  <Image
                    style={{ width: 100, height: 100 }}
                    resizeMode='contain'
                    source={require('../../assets/house_human.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom:5, marginTop:15 }}>
                <Text style={{ color: '#0F0E4340', fontFamily: 'Poppins-Regular', fontSize: 14 }}>Already Have and Account</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}  style={{ justifyContent: 'center', alignItems: 'center', marginBottom:15, marginTop:1 }}>
                <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14, textDecorationLine: 'underline', }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
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
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff'

  },

});

