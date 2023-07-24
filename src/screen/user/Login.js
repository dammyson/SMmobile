// React native and others libraries imports
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Toast, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from '../../component/view/ActivityIndicator'


import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';

import { getFmc } from '../../component/utilities';
import { baseUrl, storeToken, storeType, storeUser } from '../../utilities';
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';
import { auth_logo } from '../../assets';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';


const Login = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('')//08166219698
  const [password, setPassword] = useState('') //Admin@123
  const [token, setToken] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const password_field = useRef();



  const initia = async () => {
    setToken(await getFmc())
  }

  useEffect(() => {
    initia()
  }, []);

  const sendLoginRequest = () => {


    if (phone == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phone.length == 15 || phone.length == 11) {

      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }
    dispatch(SHOW_LOADER("Logging in"))

    var phonenumber = 234 + phone.substr(phone.length - 10);


    let formData = JSON.stringify({
      phone_number: phonenumber,
      password: password,
      mobile_token: token,

    })

    console.log(formData);

    fetch(baseUrl() + '/login', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        dispatch(HIDE_LOADER())

        const { statusCode, data } = res;
        if (statusCode === 200) {
          AsyncStorage.setItem('step', 'three');
          storeToken(data.data.token.toString())
          storeUser(JSON.stringify(data.data))
          storeType(data.data.roles[0].name.toString())
          
          if(!data.data.transaction_pin){
            navigation.navigate('addpin')
          }else{
            navigation.replace('home')
          }
        
        } else if (statusCode === 422) {
          Alert.alert('Validation failed', 'Phone number already exits', [{ text: 'Okay' }])
        } else {
          Alert.alert('Operarion failed', 'Please checnk your phone number and retry', [{ text: 'Okay' }])
        }
      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        dispatch(HIDE_LOADER())

      });


  }

  const processResponse = (response) => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }

 const validate = () => {
    return phone.length == 15 || phone.length == 11
  }

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <View style={{ height: 20 }}></View>
        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
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

          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.BOLD, fontSize: 24, marginBottom: 7, marginTop: 7 }}>Sign In</Text>
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
                onSubmitEditing={() => password_field.current.focus()}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 15, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setPhone(text)}
                maxLength={11}
                defaultValue={phone}

              />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                { phone.length == 15 || phone.length == 11 ?
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
                onSubmitEditing={() => sendLoginRequest()}
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

            <TouchableOpacity onPress={() =>  navigation.navigate('forgotPassword')} style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 15, color: lightTheme.RED, fontFamily: font.BOLD, fontSize: 14, marginBottom: 7, marginTop: 7 }}>Forgot Password</Text>
            </TouchableOpacity>
          </View>


          <View style={{ height: 100, justifyContent: 'center', alignItems: 'center', }}>

          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => sendLoginRequest()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Log in</Text>
          </TouchableOpacity>


          <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Don't you have an accoount   </Text>

            <TouchableOpacity onPress={() =>  navigation.navigate('reg')} style={{ alignItems: 'center' }}>
              <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.BOLD, fontSize: 14, marginBottom: 7, marginTop: 7 }}>Sign Up from here   </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    )
  }


  return (
    <ImageBackground
      source={require('../../assets/primary.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Container style={{ backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" hidden={false}  />
        <Content>
          {
            renderBody()
          }
        </Content>
      </Container>
    </ImageBackground>
  );



}


export default Login

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
    flex: 1.5,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  body: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    height: 60,
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


