// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Toast, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col, } from 'native-base';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import color from '../../component/color'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from '../../component/view/ActivityIndicator'
import { getFmc } from '../../component/utilities';
import { baseUrl,  storePhone,  storeToken, storeType, storeUser } from '../../utilities';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      phone: '',
      loading: false,
      type: '',
      gender: '',
      actual_code: '',
      view_otp_input: false,
      done: false,
      display_phone_number: '',
      incoming_code: '',
      pin_id: ''
    };
  }


  async componentDidMount() {
    this.setState({ token: await getFmc() })

    AsyncStorage.getItem('type').then((value) => {
      value == '' ? this.setState({ type: "null" }) : this.setState({ type: value })
      console.warn(value);
    })


  }

  setGender(data) {
    var index = data.value
    console.warn(index)
    this.setState({
      gender: index,
    })
  };


  registrationRequest() {

    const { phone, type, token } = this.state
    console.warn(phone, type);
    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 11) {

      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }
    this.setState({ loading: true, view_otp_input: false, })
    var phonenumber = 234 + phone.substr(phone.length - 10);


    let formData = JSON.stringify({
      phone_number: phonenumber,
      user_type: type,
      mobile_token: token
      })

    this.setState({ loading: true })
    fetch(baseUrl() + '/register', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(data);
        if (statusCode === 201) {
          storeToken(data.token.toString())
          storeUser(JSON.stringify(data.data))
          storeType(data.data.roles[0].name.toString())
          storePhone(phonenumber)
          AsyncStorage.setItem('step', 'one');
          this.props.navigation.navigate('complete')
        } else if (statusCode === 422) {
          Alert.alert('Validation failed', 'Phone number already exits', [{ text: 'Okay' }])
        } else {
          Alert.alert('Operarion failed', 'Please check your phone number and retry', [{ text: 'Okay' }])
        }
      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });
  }

  sendOtpRequest() {

    const { phone } = this.state

    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 15 || phone.length == 11) {
      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }

    this.setState({ loading: true })
    var phonenumber = 234 + phone.substr(phone.length - 10);


    let formData = JSON.stringify({
      phone_number: phonenumber
      })

    this.setState({ loading: true })
    fetch(baseUrl()+ '/otp/generate', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(data, statusCode);
        if (statusCode == 201) {
          this.setState({ loading: false, view_otp_input: true, pin_id: data.data.pinId, })
        } else {
          this.setState({ loading: false })
          Alert.alert('Operation failed', 'Please check you phone number and network and try again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert('Something went wrong please try again');
        this.setState({ loading: false })
      });
  }


  getCodeOne(code) {
    if (code.length == 6) {
      this.verifyOtp(code)
    }
  }


  verifyOtp(incoming_code) {
    const { phone, actual_code } = this.state
    console.warn(incoming_code, actual_code)

    this.setState({ loading: true })

    var phonenumber = 234 + phone.substr(phone.length - 10);
    let formData = JSON.stringify({
      phone_number: phonenumber,
      otp: incoming_code
    })


    this.setState({ loading: true })
    fetch(baseUrl()+ '/otp/verify', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(data, statusCode);
        this.setState({ loading: false, view_otp_input: false, })

        if (statusCode == 201) {

         if (data.data.is_verified) {
            this.setState({ done: true, view_otp_input: false, })
          } else if (data.data.verified == 'Expired') {
            this.setState({ loading: false, view_otp_input: false, })
            Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
          }

        } else {
          this.setState({ loading: false, view_otp_input: false, })
          Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert('Something went wrong please try again');
        this.setState({ loading: false })
      });



  }



  resendSendOtpRequest() {

    const { phone } = this.state

    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 15 || phone.length == 11) {
      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }

    this.setState({ loading: true })
    var phonenumber = 0 + phone.substr(phone.length - 10);
    const formData = new FormData();
    formData.append('phone', phonenumber);
    formData.append('type', 'registration')

    this.setState({ loading: true })
    fetch(URL.url + '/otp/generate', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(data, statusCode);
        if (statusCode == 200) {
          Toast.show({
            text: 'Otp resent successfully !',
            position: 'bottom',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });
          this.setState({ loading: false, view_otp_input: true, pin_id: data.data.pinId })
        } else {
          this.setState({ loading: false })
          Alert.alert('Operation failed', 'Please check you phone number and network and try again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert('Something went wrong please try again');
        this.setState({ loading: false })
      });
  }

  processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Content>
          {this.state.view_otp_input ?
            this.renderOtp()
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
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.body}>
        <View style={{ height: 20 }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => goBack()} >
            <Icon
              name="arrowleft"
              size={30}
              type='antdesign'
              color={color.primary_color}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>Register</Text>
          </View>
          <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
        </View>

        <View style={styles.sideContent}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/hug.png')} />
        </View>


        <View style={styles.sideContentReg}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 1 }}>
            <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Medium', fontSize: 12 }}>Fill in these details to get started </Text>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Phone Number </Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Enter Phone Number"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                onSubmitEditing={() => this.sendOtpRequest()}
                autoCorrect={false}
                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => this.setState({ phone: text })}
                maxLength={11}
                defaultValue={this.state.phone}

              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Icon
                  name="phone"
                  size={22}
                  type='antdesign'
                  color={'#3E3E3E'}
                />
              </View>
            </View>
          </View>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.sendOtpRequest()}  >
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Next</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    )
  }
  renderDone() {
    return (<View style={styles.body}>
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/correct.png')} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Verify Your Number </Text>
          <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Light', fontSize: 12 }}>Your Number has been Verified  </Text>
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.registrationRequest()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </View>)
  }


  renderOtp() {
    return (
    <View style={styles.body}>
      <View style={{ height: 20 }}></View>
      <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
          <Icon
            name="arrowleft"
            size={30}
            type='antdesign'
            color={color.primary_color}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Verify Your Number</Text>
        </View>
        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
      </View>


      <View style={styles.mainContent}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/email.png')} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Medium', fontSize: 14 }}>We’ve sent a code to  {this.state.phone} </Text>
        </View>
        <View style={{ alignItems: 'center', marginRight: 7, }}>
          <TouchableOpacity onPress={() => this.resendSendOtpRequest()} >
            <Text style={{ color: '#4b47b7', fontSize: 14, fontWeight: 'bold' }}>Resend Code</Text>
          </TouchableOpacity>
        </View>



        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
          <OTPInputView
            style={{
              width: '80%', height: 70, alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}
            pinCount={6}
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

    </View>)
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
    flex: 2,

  },
  sideContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sideContentReg: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
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
    fontFamily: 'Poppins-SemiBold'
  },
  
  logo: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 3,
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
    fontSize: 10,
    color: '#0F0E43',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular'
  },
  buttonContainer: {
    height: 65,
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
    paddingRight: 30,
    // to ensure the text is never behind the icon
  },
});

