// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, TextInput, ImageBackground, Dimensions, StyleSheet, StatusBar, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import Bank from './Bank'

import URL from '../../component/server'
import color from '../../component/color'

import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import { PulseIndicator } from 'react-native-indicators';
import { getToken, processResponse,getWallet } from '../../component/utilities';

export default class AddBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      bank_data: [],
      data: '',
      auth: '',
      view_banks: false,
      bank_name: 'Select Bank',
      bank_code: '',
      account_number: '',
      account_name: '',
      wallet: '',
      bloading: false,
      search: '',

    };
    this.arrayholder = [];
  }

  componentDidMount() {
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
        console.warn(value)
      }

    })
    AsyncStorage.getItem('wallet').then((value) => {
      if (value == '') { } else {
        this.setState({ wallet: JSON.parse(value) })
      }
    })


  }



 async addBankProcess() {
    const { onAdd, onClose } = this.props;
    const { bank_name, bank_code, account_number, account_name, wallet } = this.state
    if (account_number == "" || account_name == "" || bank_code == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } else {

    }

    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('wallet_id', wallet.id);
    formData.append('beneficiary_bank_name', bank_name);
    formData.append('beneficiary_bank_code', bank_code);
    formData.append('beneficiary_account_number', account_number);
    formData.append('beneficiary_account_name', account_name);
    console.warn(data.token);

    fetch(URL.urltwo + '/wallet/account/add', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' +  await getToken(),
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(statusCode, data);

        if (statusCode == 200 || statusCode == 201) {
          AsyncStorage.setItem('wallet', JSON.stringify(data.data));
          this.setState({
            loading: false,
            visible: true
          })

          onAdd(data.data)
          onClose()
        } else if (statusCode == 412) {
          this.setState({
            loading: false,
            visible: true
          })
          Alert.alert('Operation failed', data.message, [{ text: 'Okay' }])
        } else {
          this.setState({
            loading: false,
            visible: true
          })
          Alert.alert('Operation failed', ' Please try again later', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });

  }

  getBeneficiaryProcess(text) {

    const { bank_code, data } = this.state


    if (text.length == 10 && bank_code != "") {
      this.bRequest(bank_code, text, data.token)
    } else if (text.length == 10 && bank_code == "") {
      Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
    }




  }

 async bRequest(bank_code, account_number_entered, token) {


    this.setState({ bloading: true, account_number: account_number_entered })
    const formData = new FormData();

    formData.append('bankcode', bank_code);
    formData.append('accountnumber', account_number_entered);

    console.warn(token);

    fetch(URL.urltwo + '/ext/banks/beneficiary-details', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + await getToken(),
      }, body: formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (res.responsecode == '00') {
          this.setState({
            bloading: false,
            account_name: res.accountname
          })

        } else {
          Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ bloading: false })
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

  searchFilterFunction = search => {
    this.setState({ search });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.bankname.toUpperCase()}`;
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      bank_data: newData,
    });

  };

  render() {


    if (this.state.loading) {
      return (

        <ImageBackground
          source={require('../../assets/user_bg.png')}
          style={styles.loadingBackgroundImage}
          resizeMode="cover"
        >

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.welcome}>
              <PulseIndicator color={color.slide_color_dark} size={70} />
            </View>
          </View>
        </ImageBackground>
      );
    }
    return (
      <>
        {this.state.view_banks ?
          this._Bank() :
          <Container style={{ backgroundColor: 'transparent' }}>
            <Content>


              {this.renderBody()}


            </Content>
          </Container>
        }
      </>

    );
  }

  renderBody() {
    const { onClose, } = this.props;
    return (
      <View style={styles.backgroundImage}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <View style={styles.body}>
          <View style={{ height: 20 }}></View>
          <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
            <TouchableOpacity onPress={() => onClose()} >
              <Icon
                name="close"
                size={30}
                type='antdesign'
                color={color.primary_color}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>Add Account</Text>
            </View>
            <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
          </View>


          <View style={styles.mainbody}>
            <View style={styles.textInputContainer}>
              <Text style={styles.actionbutton}>Bank   </Text>
              <View style={styles.input}>
                <TouchableOpacity onPress={() => this.setState({ view_banks: true })} style={{ flex: 1, justifyContent: 'center' }} >
                  <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{this.state.bank_name} </Text>
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
                  onChangeText={text => this.getBeneficiaryProcess(text)}

                />
              </View>
            </View>



            <View style={styles.textInputContainer}>
              <Text style={styles.actionbutton}>Account Name </Text>
              <View style={styles.inputt}>
                <View style={{ flex: 1, justifyContent: 'center' }} >
                  <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{this.state.account_name} </Text>
                  {this.state.bloading ? <PulseIndicator color={color.slide_color_dark} size={40} /> : null}
                </View>
              </View>
            </View>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.addBankProcess()} >
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Add</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>
        </View>
      </View>
    )
  }

  _Bank() {
    return (
      <Bank
        onSelect={(v) => this.selBank(v)}
        onClose={() => this.setState({ view_banks: false })}
      />
    )
  }

  selBank(v) {
    this.setState({
      bank_code: v.bankcode,
      bank_name: v.bankname,
      view_banks: false
    });
  }
}

AddBank;

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
  loadingBackgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  mainbody: {
    width: Dimensions.get('window').width,
    flex: 1,
    marginRight: 13,
    marginLeft: 13,


  },
  title: {
    marginTop: 2,
    marginBottom: 2,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Montserrat-Bold'
  },
  textInputContainer: {
    marginRight: 25,
    marginLeft: 25,
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

