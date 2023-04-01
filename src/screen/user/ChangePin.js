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
import ResetPinOne from '../../component/view/ResetPin_First'
import ResetPinTwo from '../../component/view/ResetPin_Second'
import ResetPinOld from '../../component/view/ResetPin_Old';
export default class ChangePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      auth: "",
      type: "",
      pin: "",
      pin_confirmation: '',
      loading: false,
      ccode: false,
      confirm: false,
      done: false,
    };
  }


  async componentDidMount() {
    this.setState({ auth: await getToken() })
  }


  changePinRequest(new_pin_confirmation) {

    const { old_pin, new_pin, auth, type } = this.state
    if (new_pin == "" || new_pin_confirmation == "" || old_pin == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } else {

      if (new_pin == new_pin_confirmation) {

      } else {
        Alert.alert('Validation failed', 'Pin are not the same pls enter them again', [{ text: 'Okay' }])
        return
      }


    }

    const formData = new FormData();
    formData.append('old_pin', old_pin);
    formData.append('new_pin', new_pin);
    formData.append('new_pin_confirmation', new_pin_confirmation);


    this.setState({ loading: true })
    fetch(URL.url + '/transaction-pin/update?old_pin=' + old_pin + '&new_pin=' + new_pin + '&new_pin_confirmation=' + new_pin_confirmation, {
      method: 'PUT', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data);
        if (statusCode === 201) {
          this.setState({  ccode: false , confirm: false, done: true  })
        } else {
          this.setState({  ccode: false , confirm: false })
          Alert.alert('Operarion failed', 'Please check your phone network and retry', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false , ccode: false , confirm: false})
      });

  }

oldPin(data){
  this.setState({old_pin: data,ccode: true })
}
  firstPin(data){
    this.setState({new_pin: data, ccode: false , confirm: true })
  }
  seconePin(data){
    this.changePinRequest(data)
  }

  render() {
      return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Content>
         {this.state.ccode ?
         this.renderCcode()
         : this.state.confirm ?
           this.renderConfirm()
         : this.state.done ?
           this.renderDone()
         : this.renderBody() 
        }
        </Content>
        {this.state.loading ? <ActivityIndicator /> : null}
      </Container>

    );
  }


  renderBody() {
    return(  <ResetPinOld OnClose={()=> this.props.navigation.goBack()}   OnComplete={(data)=> this.oldPin(data)} />
)
  }


  renderCcode() {
    return(  <ResetPinOne  OnClose={()=> this.setState({ccode:false})}  OnComplete={(data)=> this.firstPin(data)} />
)
  }
  renderConfirm() {
    return(  <ResetPinTwo OnClose={()=> this.setState({confirm:false})}  OnComplete={(data)=> this.seconePin(data)} />)
  }

  renderDone() {
    return( <View style={styles.body}>
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/correct.png')} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Transaction  Pin </Text>
          <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Light', fontSize: 12 }}>Your Transaction  Pin has been Changed  </Text>
        </View>



        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.props.navigation.goBack()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </View>
)
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

