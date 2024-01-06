// React native and others libraries imports
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Toast, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';

import { Icon } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';

import { getFmc } from '../../component/utilities';
import { baseUrl, getToken, } from '../../utilities';
import { lightTheme } from '../../theme/colors';
import { font } from '../../constants';
import { auth_logo } from '../../assets';
import * as Animatable from 'react-native-animatable';

import Feather from 'react-native-vector-icons/Feather';

const ChangePasswordSetting = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const [opassword, setOldPassword] = useState('Password')
  const [password, setPassword] = useState('ayo1111')
  const [cpassword, setCpassword] = useState('ayo1111')
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const password_field = useRef();


  const initia = async () => {
    setToken(await getFmc())
  }

  useEffect(() => {
    initia()
  }, []);



  const registrationRequest = async() => {
    dispatch(SHOW_LOADER("Setting new passwoord"))

    let formData = JSON.stringify({
      old_password: opassword,
      new_password: password,
      new_password_confirmation: cpassword
    })

    console.warn(formData);

    fetch(baseUrl() + '/password/update', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' +  await getToken() ,
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
      
        dispatch(HIDE_LOADER())
        const { statusCode, data } = res;
        console.warn(statusCode, data);
        if (statusCode === 201) {
          console.warn(statusCode, data, "THISSS");
          //this.setState({ done: true, confirm: false })
        
        } else {
          //this.setState({ confirm: false })
          Alert.alert('Operation failed', data.message, [{ text: 'Okay' }])
        }
      })
      .catch((error) => {
        dispatch(HIDE_LOADER())
        console.warn(error);
        alert(error.message);
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
              color={lightTheme.PRIMARY_COLOR}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          
          </View>
          <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
        </View>




        <View style={styles.sideContentReg}>

          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: lightTheme.PRIMARY_COLOR, fontFamily: font.BOLD, fontSize: 24, marginTop: 7 }}>Change Password</Text>
          </View>

         

          <View style={styles.textInputContainer}>
            <Text style={styles.actionbutton}>Old Password </Text>
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
                placeholder="Enter Old Password"
                placeholderTextColor='#3E3E3E'
                returnKeyType="next"
                secureTextEntry={secureTextEntry}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1, marginLeft: 10, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                onChangeText={text => setOldPassword(text)}
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
            <Text style={styles.actionbutton}>New Password </Text>
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
            <Text style={styles.actionbutton}>Confirm New Password</Text>
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
                placeholder="Enter Confirm New Password"
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

    


          <TouchableOpacity style={styles.buttonContainer} onPress={() => registrationRequest()}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Continue</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }



  return (
      <Container style={{ backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor={lightTheme.PRIMARY_COLOR} hidden={false} />
        <Content>
          { renderBody()}
        </Content>
      </Container>
  );



}


export default ChangePasswordSetting

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
    marginTop: 5,
    height: Dimensions.get('window').width,
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
    marginTop: 50,
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


