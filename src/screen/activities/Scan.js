// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard, AsyncStorage, StatusBar, KeyboardAvoidingView, SafeAreaView, TextInput, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import color from '../../component/color'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import ActivityIndicator from '../../component/view/ActivityIndicator'
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Pay from '../../component/view/Pay';
import Pin from '../../component/view/Pin';
import { baseUrl, getToken, getUser, getWallet } from '../../utilities';


const slides = [
  {
    key: 'somethun',
    title: 'Put your money',
    text: 'Create a sendmonny wallet, and pay for petty \n transactions with your mobile phone.',
    image: require('../../assets/ins_one.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Fund your mobile ',
    text: 'Fund your wallet from your bank account, and from merchants around you.',
    image: require('../../assets/ins_two.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun-dos',
    title: 'No More Change wahala !',
    text: 'Receive your change and Pay for goods and services, on the go!',
    image: require('../../assets/ins_three.png'),
    backgroundColor: '#febe29',
  }
];

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visible_add_merchant: false,
      complete_transaction: false,
      loading: false,
      data: '',
      view_banks: false,
      visible: false,
      user_id: '',
      payment_detail: null,
      ammount: '',
      pin: false,
      view_success: false,
      view_error: false,
      tansfer_loading: false,
      auth: '',
      operation: 'pay',
      operation_message: 'message'

    };
  }


async componentDidMount() {
     const { operation } = this.props.route.params;
     console.warn( await getToken());
    this.setState({ operation: operation });

    this.setState({ 
      wallet: JSON.parse(await getWallet()),  
      data: JSON.parse(await getUser()),  
      auth: await getToken()
    })
   
  }

  getDetailRequest() {
    const { user_id, auth } = this.state

    this.setState({ loading: true });

    fetch(baseUrl() + '/wallets/holder/' + user_id, {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        this.setState({
          payment_detail: res.data,
          loading: false,
          visible: true
        })

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });
  };


  processTransfer(pin) {

    const { ammount, auth, wallet, data, payment_detail, operation, role } = this.state

    if (ammount == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } else {

    }

    if (operation == 'top') {
      var action_url = '/wallet/topup'
      var formData = new FormData();

      formData.append('sender_wallet_id', wallet.id);
      formData.append('recipient_id', payment_detail.id);
      formData.append('amount', ammount);
      formData.append('transaction_pin', pin);

    } else if (operation == 'pay') {

      var action_url = '/transfers'
      var formData = JSON.stringify({
        sender_wallet_id: wallet.id,
        amount: Number(ammount),
        pin: pin,
        narration:"internal",
        islocal:true,
        reciever_wallet_id: payment_detail.wallet_id,
      
      })

    } else {

    }

    this.setState({
      loading: true,
    })

    console.warn("MAD O",formData);

    fetch(baseUrl() + action_url, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      }, body: formData,
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(statusCode, data);
        this.setState({
          visible: false,
          loading: false,
        })

        if (statusCode == 200) {
          this.setState({ view_success: true, operation_message: data.message })
        } else if (statusCode == 401) {
          this.setState({ view_error: true, operation_message: data.message })
        } else if (statusCode == 422) {
          this.setState({ view_error: true, operation_message: data.amount.toString() })
        } else if (statusCode == 412) {
          this.setState({ view_error: true, operation_message: data.message })
        } else {
          this.setState({ view_error: true, operation_message: 'Something whent wrong please try again later' })
        }

      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });

  };

  processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
  closedialog() {
    this.setState({ visible: false, })
  }
  renderInstruction() {

    let cat = [];
    for (var i = 0; i < slides.length; i++) {
      cat.push(
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.image} source={slides[i].image} />
          <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: '#3E3E3E', fontSize: 17, fontWeight: '900', marginTop: 20, marginLeft: 20, marginRight: 20 }}>{slides[i].title} </Text>
          <Text style={{ color: '#3E3E3E', fontFamily: 'Poppins-Medium', fontWeight: '400', fontSize: 12, marginLeft: 20, marginRight: 20, marginTop: 10, textAlign: 'center' }}>{slides[i].text} </Text>
        </View>
      );
    }
    return cat;

  }

  render() {

    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Content>

          {
            this.state.pin ?
            this._pin()
            :
            this.state.view_success ?
              this.success()
              :
              this.state.view_error ?
                this.error()
                :

                this._payPage()
          }
        </Content>
        {this.state.loading ? <ActivityIndicator /> : null}
        {this.state.visible ?  this.renderPay() : null}
      </Container>
    );
  }

  _payPage() {
    return (
      <View style={styles.backgroundImage}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <View style={styles.body}>
          <View style={{ height: 20 }}></View>
          <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
              <Icon
                name="arrowleft"
                size={30}
                type='antdesign'
                color={color.primary_color}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>Pay</Text>
            </View>
            <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
          </View>
          <View style={{ height: 30 }}></View>

          <View style={styles.mainbody}>
            <View style={styles.layertwo}>
              <ScrollView
                horizontal={true}
              >
                {this.renderInstruction()}
              </ScrollView>
            </View>

            <View >

              <View style={styles.buttonContainerTwo} block iconLeft>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} 
                onPress={() => this.props.navigation.navigate('qr',{ operation: this.state.operation }) } >
                  <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#4C46E9', fontSize: 14 }}>Scan QR Code </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.textInputContainer}>
                <Text style={styles.actionbutton}>ID Number  </Text>
                <View style={styles.input}>
                  <TextInput
                    placeholder="Enter ID Number  "
                    placeholderTextColor='#3E3E3E'
                    returnKeyType="next"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                    maxLength={10}
                    onChangeText={text => this.setState({ user_id: text })}
                  />
                </View>
              </View>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.getDetailRequest()} >
                  <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Enter</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    )
  }



  handleSuccessPin(code) {
    this.setState({ pin: false })
    this.processTransfer(code)

}
  _pin() {
    return (
        <Pin
            onSuccess={(pin) => this.handleSuccessPin(pin)}
            onFail={() => this.setState({ pin: false })}
            onClose={() => this.setState({ pin: false })}
        />
    );
}
 onPayPress(text){
  this.setState({ visible: false,
    ammount: text,
    pin: true
   })
 }
  renderPay(){
    return(
      <Pay payment_detail={this.state.payment_detail} onPress={(text)=> this.onPayPress(text) } onClose={() => this.setState({ visible: false })} />
    )
  }

  onPress() {
    this.props.navigation.replace('home')
  }
  success() {
    return (
      <Success
        onPress={() => this.onPress()}
        name={'Ayobami Ayeni'}
        message={this.state.operation_message}
      />

    );
  }

  error() {
    return (
      <Error
        onPress={() => this.onPress()}
        name={'Ayobami Ayeni'}
        message={this.state.operation_message} />
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  loadingBackgroundImage: {
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
    justifyContent: 'center',
  


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
  actionbutton: {
    marginTop: 7,
    marginBottom: 7,
    marginRight: 13,
    marginLeft: 30,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Montserrat-bold'
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  lineStyle: {
    height: 0.5,
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',

  },
  image: {
    height: Dimensions.get('window').height / 6,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    resizeMode: 'contain'
  },

  textInputContainer: {
    marginRight: 25,
    marginLeft: 25,

  },
  input: {
    height: 51,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12,

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
  inputtwo: {
    height: 60,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    paddingLeft: 12,
    flexDirection: 'row'
  },
  buttonContainer: {
    height: 51,
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
    borderRadius: 5,
  },
  buttonContainerTwo: {
    height: 51,
    flex: 1,
    marginLeft: 25,
    marginBottom: 10,
    marginRight: 25,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '#D2D1F2'
  },

});







