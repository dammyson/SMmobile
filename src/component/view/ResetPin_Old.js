// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TouchableOpacity, Dimensions, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { PulseIndicator } from 'react-native-indicators';
import URL from '../../component/server'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import color from '../../component/color'
import { getToken, processResponse } from '../../component/utilities';
import ActivityIndicator from '../../component/view/ActivityIndicator'
export default class ResetPin_Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  async componentDidMount() {
   
  }


  getCodeOne(code) {
    const { OnComplete,  } = this.props;
    if (code.length == 4) {
      OnComplete(code)
    }
  }



  render() {
    const { OnClose,  } = this.props;
      return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Content>
        <View style={styles.body}>
      <View style={{ height: 20 }}></View>
      <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 20 }}>
      <TouchableOpacity onPress={() => OnClose()} >
          <Icon
            name="arrowleft"
            size={30}
            type='antdesign'
            color={color.primary_color}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Old  Pin</Text>
        </View>
        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
      </View>


      <View style={styles.mainContent}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/garden.png')} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25, marginLeft: 25, marginRight: 25 }}>
          <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Enter Old Transaction  Pin </Text>
          <Text style={{ marginLeft: 25, marginRight: 25, textAlign: 'center', color: '#2E2E2E', fontFamily: 'Poppins-Light', fontSize: 12 }}>You will need will need to enter the current transaction pin.  </Text>
        </View>




        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
          <OTPInputView
            style={{
              width: '60%', height: 70, alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => { this.getCodeOne(code) }}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {
              // this.verifyOtp()
            })}
          />
        </View>
      </View>

    </View>
        </Content>
      </Container>

    );
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
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 29,
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

