// React native and others libraries imports
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Toast, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import { Icon } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';

import { getFmc } from '../../component/utilities';
import { baseUrl, storePhone, storeToken, storeType, storeUser } from '../../utilities';
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';
import { auth_logo } from '../../assets';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

import CodeInput from '../../component/view/SixCodeInput';
const Register = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [token, setToken] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [pinId, setPinId] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const password_field = useRef();

  const [code, setCode] = useState("")

  const initia = async () => {
    setToken(await getFmc())
  }

  useEffect(() => {
    initia()
  }, []);



  const registrationRequest = () => {
    dispatch(SHOW_LOADER("Getting otp"))

    var phonenumber = 234 + phone.substr(phone.length - 10);

    let formData = JSON.stringify({
      first_name: firstname,
      last_name: lastname,
      phone_number: phonenumber,
      user_type: "CUSTOMER",
      mobile_token: token,
      password: password,
      password_confirmation: cpassword
    })

    console.warn(formData);

    fetch(baseUrl() + '/register', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        dispatch(HIDE_LOADER())
        const { statusCode, data } = res;
        console.warn(data);

        if (statusCode === 200) {
          storeToken(data.token.toString())
          storeUser(JSON.stringify(data.data))
          storeType(data.data.roles[0].name.toString())
          storePhone(phonenumber)
          AsyncStorage.setItem('step', 'one');
          navigation.navigate('addpin')

        } else if (statusCode === 422) {
          Alert.alert('Validation failed', 'Phone number already exits', [{ text: 'Okay' }])
        } else {
          Alert.alert('Operarion failed', 'Please check your phone number and retry', [{ text: 'Okay' }])
        }
      })
      .catch((error) => {
        dispatch(HIDE_LOADER())
        console.log("Api call error");
        console.warn(error);
        alert(error.message);

      });
  }

  const sendOtpRequest = () => {

    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 15 || phone.length == 11) {
      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }


    var phonenumber = 234 + phone.substr(phone.length - 10);

    console.warn(phonenumber);
    let formData = JSON.stringify({
      phone_number: phonenumber
    })

    dispatch(SHOW_LOADER("Getting otp"))
    fetch(baseUrl() + '/otp/generate', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        dispatch(HIDE_LOADER())
        const { statusCode, data } = res;
        console.warn(data, statusCode);


        if (statusCode == 201) {
          setShowOtp(true)
          setPinId(data.data.pinId)

        } else {

          Alert.alert('Operation failed', 'Please check you phone number and network and try again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        dispatch(HIDE_LOADER())
        console.log("Api call error");
        console.warn(error);
        alert('Something went wrong please try again');

      });
  }

  getCodeOne = (code) => {
    if (code.length == 6) {
      // verifyOtp(code)
      sendOtpRequest()
    }
  }
  const processResponse = (response) => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }

 const verifyOtp = () => {


    var phonenumber = 234 + phone.substr(phone.length - 10);
    let formData = JSON.stringify({
      phone_number: phonenumber,
      otp: code
    })


    dispatch(SHOW_LOADER("Verify otp"))
    fetch(baseUrl() + '/otp/verify', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(data, statusCode);
        dispatch(HIDE_LOADER())

        if (statusCode == 200) {

          if (data.data.is_verified) {
            registrationRequest()
          } else if (data.data.verified == 'Expired') {
            Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
          }

        } else {
          Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        dispatch(HIDE_LOADER())
        console.log("Api call error");
        console.warn(error);
        alert('Something went wrong please try again');

      });



  }



  const renderBody = () => {
    return (
      <View style={styles.body}>
        <View style={{ height: 20 }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, height: 100 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Icon
              name="arrowleft"
              size={30}
              type='antdesign'
              color={lightTheme.WHITE_COLOR}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Image
              style={styles.logo}
              source={auth_logo}
            />
          </View>
          <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
        </View>




        <View style={styles.sideContentReg}>

          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.BOLD, fontSize: 24, marginTop: 7 }}>Sign up</Text>
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>First Name  </Text>
            <View style={styles.input}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Icon
                  name="user"
                  size={22}
                  type='feather'
                  color={'#3E3E3E'}
                />
              </View>
              <TextInput
                placeholder="Enter First Name"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={firstname}
                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setFirstname(text)}
              />

            </View>
          </View>


          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Last Name  </Text>
            <View style={styles.input}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Icon
                  name="user"
                  size={22}
                  type='feather'
                  color={'#3E3E3E'}
                />
              </View>
              <TextInput
                placeholder="Enter Last Name"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={lastname}
                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setLastname(text)}
              />

            </View>
          </View>


          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Phone Number </Text>
            <View style={styles.input}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Icon
                  name="mobile-phone"
                  size={22}
                  type='font-awesome'
                  color={'#3E3E3E'}
                />
              </View>
              <TextInput
                placeholder="Enter Phone Number"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 15, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setPhone(text)}
                maxLength={11}
                defaultValue={phone}

              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                {phone.length == 15 || phone.length == 11 ?
                  <Animatable.View
                    animation="bounceIn"
                  >
                    <Icon
                      name="check-circle"
                      color="green"
                      size={20}
                      type='feather'


                    />
                  </Animatable.View>
                  : null}

              </View>

            </View>
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Password </Text>
            <View style={styles.input}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Icon
                  name="lock"
                  size={22}
                  type='antdesign'
                  color={'#3E3E3E'}
                />
              </View>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                secureTextEntry={secureTextEntry}
                onSubmitEditing={() => sendRegisterRequest()}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 10, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setPassword(text)}
                maxLength={11}
                ref={password_field}
                defaultValue={password}

              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  {!secureTextEntry ?
                    <Feather
                      name="eye-off"
                      color="grey"
                      size={20}
                    />
                    :
                    <Feather
                      name="eye"
                      color="grey"
                      size={20}
                    />
                  }
                </TouchableOpacity>
              </View>


            </View>


          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Password </Text>
            <View style={styles.input}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                <Icon
                  name="lock"
                  size={22}
                  type='antdesign'
                  color={'#3E3E3E'}
                />
              </View>
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                onSubmitEditing={() => sendRegisterRequest()}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 10, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setCpassword(text)}
                maxLength={11}
                secureTextEntry={secureTextEntry}
                defaultValue={cpassword}

              />
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  {!secureTextEntry ?
                    <Feather
                      name="eye-off"
                      color="grey"
                      size={20}
                    />
                    :
                    <Feather
                      name="eye"
                      color="grey"
                      size={20}
                    />
                  }
                </TouchableOpacity>
              </View>

            </View>


          </View>



          <TouchableOpacity style={styles.buttonContainer} onPress={() => sendOtpRequest()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Sign up</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => registrationRequest()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Sign up</Text>
          </TouchableOpacity> */}


          <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

            <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Already have ann account  </Text>

            <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ alignItems: 'center' }}>
              <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.BOLD, fontSize: 14, marginBottom: 7, marginTop: 7 }}>Login </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    )
  }

  const renderOtp = () => {
    return (
      <View style={styles.body2}>
        <View style={{ height: 20 }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
          <TouchableOpacity onPress={() => setShowOtp(false)} >
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
            <Text style={{ color: '#0F0E43', fontFamily: font.BOLD, fontSize: 20 }}>Verify Number </Text>
            <Text style={{ marginRight: 25, color: lightTheme.BLACK_TEXT_COLOR, fontFamily: 'Poppins-Light', fontSize: 16 }}>A One-TIme Password (OTP) has been sent to.  {phone}   </Text>
          </View>

          <View style={{ alignItems: 'center', marginRight: 7, }}>
            <TouchableOpacity onPress={() => resendSendOtpRequest()} >
              <Text style={{ color: '#4b47b7', fontSize: 14, fontWeight: 'bold' }}>Resend Code</Text>
            </TouchableOpacity>
          </View>



          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
              <Text style={{ color: '#0F0E43', fontFamily: font.BOLD, fontSize: 20, marginBottom: 20 }}>Set Transaction Pin </Text>
              <CodeInput onChangeText={(txt) => setCode(txt)} />
            </View>


          </View>

          <View style={{  marginRight: 7, marginTop:25 }}>
            <TouchableOpacity style={[styles.buttonContainer, code.length == 6 ? { backgroundColor: lightTheme.PRIMARY_COLOR, } : { backgroundColor: "#ADADAD" }]} 
              onPress={() =>code.length == 6 ? verifyOtp() : console.warn("")}>
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 16 }}>CONTINUE</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginRight: 7, marginTop:25 }}>
            <TouchableOpacity onPress={() => resendSendOtpRequest()} >
              <Text style={{ color: '#4b47b7', fontSize: 14, fontWeight: 'bold' }}>Resend Code</Text>
            </TouchableOpacity>
          </View>



        </View>

      </View>)
  }


  return (
    <ImageBackground
      source={require('../../assets/primary.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Container style={{ backgroundColor: 'transparent' }}>
        <StatusBar barStyle="light-content" backgroundColor={lightTheme.PRIMARY_COLOR} hidden={false} />
        <Content>
          {showOtp ?
            renderOtp()
            : renderBody()
          }
        </Content>
      </Container>
    </ImageBackground>
  );



}


export default Register

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

  sideContentReg: {
    marginTop: 50,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  body: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  body2: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: lightTheme.WHITE_COLOR,
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
    width: 100,
    height: 80,
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  textInputContainer: {
    marginRight: 20,
    marginLeft: 20,
  },
  input: {
    height: 50,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 30,
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
    height: 55,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: lightTheme.PRIMARY_COLOR,
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


