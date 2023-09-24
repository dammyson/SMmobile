// React native and others libraries imports
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, AsyncStorage, FlatList, Dimensions, TextInput, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { View, Text } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { PulseIndicator } from 'react-native-indicators';
import URL from '../server'
import color from '../color'
import ActivityIndicator from './ActivityIndicator'

import { baseUrl, getToken, getWallet } from '../../utilities';

import * as Animatable from 'react-native-animatable';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';
import Bank from './Bank'

const AddBeneficiary = ({ onAdd, onClose }) => {


  const [loading, setLoading] = useState(false);
  const [bloading, setBLoading] = useState(false);
 
  const [bankId, setBankId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [bankName, setBankName] = useState('Select Bank');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankData, setBankData] = useState()
  const [arrayholder, setArrayholder]=useState([])

  const [selectBank, setSelectBank] = useState(false);


  const [auth, setAuth] = useState('');
  const [wallet, setWallet] = useState('');


  const loadData = async () => {
    const wallet = JSON.parse(await getWallet())
    console.warn(wallet.balance.data.currentBalance);

    setAuth(await getToken())
    setWallet(wallet)


}


useEffect(() => {
    loadData()
}, []);

  const addBankProcess=async ()=> {

    if (accountNumber == "" || accountName == "" || bankCode == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } else {

    }

   setLoading(true)

    var formData = JSON.stringify({
      is_wallet: false,
      account_name: accountName,
      account_number: accountNumber,
      bank_name: bankName,
      bank_code: bankCode,
      receiver_wallet_id: wallet.id
    })


    console.warn(formData);
    console.warn(baseUrl() + '/beneficiaries')

    fetch(baseUrl() + '/beneficiaries', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(statusCode, data);
           setLoading(false)
        if (statusCode == 200 || statusCode == 201) {
          // AsyncStorage.setItem('wallet', JSON.stringify(data.data));
           onAdd(data.data)
        } else if (statusCode == 412) {
       
          Alert.alert('Operation failed', data.message, [{ text: 'Okay' }])
        } else {
          Alert.alert('Operation failed', ' Please try again later', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        setLoading(false)
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
     
      });

  }

  const getBeneficiaryProcess=(text)=> {
    if (text.length == 10 && bankCode != "") {
      bRequest(bankCode, text)
    } else if (text.length == 10 && bankCode == "") {
      Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
    }




  }

  const bRequest= async (bank_code, account_number_entered) =>{

    setBLoading(true)
    setAccountNumber(account_number_entered)
 

    const formData = {
      account_number: account_number_entered,
      bank_code: bank_code
    }


    console.warn(formData, baseUrl() + '/bank')

    fetch(baseUrl() + '/bank', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      }, body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (res.status) {
          setBLoading(false)
          setAccountName(res.data.data.accountName)

        } else {
          Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
      
      }).finally(() => setBLoading(false))
  }

 const processResponse=(response)=> {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }






 const _Bank=()=> {
    return (
      <Bank
        onSelect={(v) => selBank(v)}
        onClose={() => setSelectBank(false)}
      />
    )
  }

 const selBank=(v)=> {
  setBankCode(v.bankCode)
  setBankName(v.name)
  setSelectBank(false)
  }

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: lightTheme.INACTIVE_COLOR + "90"
        }}
      >

      </View>

      <View
        style={styles.Container}

      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

        </View>


        <Animatable.View style={{ height: Dimensions.get('window').height - 150, alignItems: 'center', justifyContent: 'center', }} animation="fadeInUpBig" >

          <View style={styles.body_top}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
              <TouchableOpacity onPress={() => onClose()}>


              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, margin: 7, flex: 1, fontFamily: font.BOLD, color: lightTheme.PRIMARY_COLOR, textAlign: 'center', marginRight: 10 }}>{"Add Beneficiary"}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>

              <TouchableOpacity onPress={() => onClose()}>
                <Icon
                  name="closecircle"
                  size={20}
                  type='antdesign'
                  color={"#000"}
                />

              </TouchableOpacity>


            </View>
          </View>
          <View style={styles.body}>

          <View style={styles.mainbody}>
            <View style={styles.textInputContainer}>
              <Text style={styles.actionbutton}>Bank   </Text>
              <View style={styles.input}>
                <TouchableOpacity onPress={() => setSelectBank(true)} style={{ flex: 1, justifyContent: 'center' }} >
                  <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{bankName} </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textInputContainer}>
              <Text style={styles.actionbutton}>Bank Account </Text>
              <View style={styles.input}>
                <TextInput
                  placeholder=""
                  placeholderTextColor='#3E3E3E'
                  returnKeyType="next"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                  maxLength={10}
                  onChangeText={text => getBeneficiaryProcess(text)}

                />
              </View>
            </View>



            <View style={styles.textInputContainer}>
              <Text style={styles.actionbutton}>Account Name </Text>
              <View style={styles.inputt}>
                <View style={{ flex: 1, justifyContent: 'center' }} >
                  <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{accountName} </Text>
                  {bloading ? <PulseIndicator color={color.slide_color_dark} size={40} /> : null}
                </View>
              </View>
            </View>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => addBankProcess()} >
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Add</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>
          </View>
          {loading ? <ActivityIndicator /> : null}
          {selectBank? _Bank() : null}

        </Animatable.View>
       
      </View>

    </>

  );




}

export default AddBeneficiary;

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  body_top: {
    backgroundColor: "#fff",
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    flexDirection: 'row'

  },
  body: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: '#fff',

  },
  mainbody: {
    flex: 1,
    marginRight: 13,
    marginLeft: 13,


  },
  search_input:{
    height: 40,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12,
    backgroundColor: color.grey,
    marginHorizontal:20
  },
  nameList:{
    fontSize: 12, 
    color: '#3E3E3E', 
    fontFamily: font.SEMI_BOLD, 
    marginHorizontal:20
  },
  input: {
    height: 65,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12
  },
  inputt: {
    height: 60,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12,
    backgroundColor: color.grey
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
  inputBudget: {
    height: 65,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#d1d1d1',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 65,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    borderRadius: 5,
  },



  transparentButton: {
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 13,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: color.button_blue
  },
  nameList: {
    fontSize: 17,
    color: '#000',
    flex: 1,
    marginLeft: 10
  },
  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "#fff"

  },
  search_input: {
    height: 40,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#000',
    borderWidth: 0.8,

  },
});

