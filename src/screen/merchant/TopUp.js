// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView,ImageBackground, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';


import color from '../../component/color'


export default class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      bank:'',
      data:'',
      pin:'',
      amount:'',
      loading: false,
      view_success:false,
      view_error:false,
      auth:'',
     

    };
  }


  componentWillMount() {
    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
          this.setState({ data: JSON.parse(value) })
      }
  })
    if(this.props.bank) {
      this.setState({bank: this.props.bank});
    }

    AsyncStorage.getItem('auth').then((value) => {
      if (value == '') { } else {
        this.setState({ auth: value })
      }
    })
  }



  topUpWallet() {
    const {pin, amount, auth, bank} = this.state
    if (pin == "" || amount == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } 

    this.setState({ loading: true })

    const formData = new FormData();
    formData.append('wallet_bank_id', bank.id);
    formData.append('amount', amount);
   // formData.append('transaction_pin', pin);
    


    fetch(URL.urltwo + '/wallet/withdrawal', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      }, body:  formData,
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res)
        this.setState({ loading: false})
        if(res.withdraw.responsecode == '00'){

          this.setState({ view_success: true })
        }else{

          this.setState({ view_error: true })
        }
      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.setState({ loading: false })
      });
  }

  render() {
    if (this.state.loading) {
      return (

          <ImageBackground
              source={require('../../assets/user_bg.png')}
              style={styles.backgroundImage}
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

      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontWeight: '900', marginTop: 20 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 20 }}>
              <Icon
                name="arrowleft"
                size={30}
                type='antdesign'
                color={color.slide_color_dark}
              />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ color: "#000", fontWeight: '900', fontSize: 16, }}>Merchant TopUp</Text>
            </View>
            <View style={{ width: 40 }}></View>
          </View>



          <View style={styles.mainContent}>
            <Text style={styles.title}>Enter Amount and pin</Text>
            <Text style={styles.actionbutton}>AMOUNT</Text>
            <TextInput
              placeholder=""
             
              placeholderTextColor='#fff'
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChangeText={text => this.setState({ amount: text })}
            />
            <Text style={styles.actionbutton}>PIN</Text>
            <TextInput
              placeholder=""
              secureTextEntry
              placeholderTextColor='#fff'
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              maxLength={4}
              onChangeText={text => this.setState({ pin: text })}
            />


   <TouchableOpacity onPress={() => this.topUpWallet()} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
              <Text style={{ color: '#fdfdfd', fontWeight: '600',  }}>Continue</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>



     <Modal
          visible={this.state.view_success}
          modalAnimation={new SlideAnimation({
            slideFrom: 'right',
          })}
        >
          <ModalContent style={styles.smodal}>
            <View style={{ flex: 1, backgroundColor:'green', }}>
            <View style={{ flex: 1,  }}>
             </View>
             <View style={{ flex: 1,  justifyContent: 'center' , alignItems:'center'  }}>
             <Text style={{ color: '#FFF', fontSize:23, fontWeight: '900' }}>Successful </Text>

              <Icon
                    name="check-square-o"
                    size={90}
                    type='font-awesome'
                    color="#fff"
                  />

             </View>
             <View style={{ flex: 1,  }}>
             </View>
             <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center'  }}>
             <Text style={{ color: '#FFF', fontSize:16, fontWeight: '500' }}>Dear  {this.state.data.user_id} </Text>
             <Text style={{ color: '#FFF', fontSize:13, fontWeight: '500' }}>Your Top Up of NGN {this.state.amount} was successful </Text>
             <Button onPress={() => [this.setState({ view_success: false }),   this.props.navigation.navigate('home') ]}  style={styles.successModalbuttonContainer} block iconLeft>
                  <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Continue </Text>
                </Button>
             </View>
             <View style={{ flex: 1,  }}>
             </View>

            </View>
          </ModalContent>
        </Modal>



           <Modal
          visible={this.state.view_error}
          modalAnimation={new SlideAnimation({
            slideFrom: 'right',
          })}
        >
          <ModalContent style={styles.smodal}>
            <View style={{ flex: 1, backgroundColor:'red', }}>
            <View style={{ flex: 1,  }}>
             </View>
             <View style={{ flex: 1,  justifyContent: 'center' , alignItems:'center'  }}>
             <Text style={{ color: '#FFF', fontSize:23, fontWeight: '900' }}>Unsuccessful </Text>

              <Icon
                    name="window-close-o"
                    size={90}
                    type='font-awesome'
                    color="#fff"
                  />
             </View>
             <View style={{ flex: 1,  }}>
             </View>
             <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center'  }}>
             <Text style={{ color: '#FFF', fontSize:16, fontWeight: '500' }}>Dear {this.state.data.user_id} </Text>
             <Text style={{ color: '#FFF', fontSize:13, fontWeight: '500' }}>Your Top Up of NGN {this.state.amount} was unsuccessful </Text>
             <Button onPress={() => [this.setState({ view_error: false }),  this.props.navigation.navigate('home') ]}  style={styles.successModalbuttonContainer} block iconLeft>
                  <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Continue </Text>
              </Button>
             </View>
             <View style={{ flex: 1,  }}>
             </View>

            </View>
          </ModalContent>
        </Modal>
        </SafeAreaView>
      </View>
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
  input: {
    height: 45,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    color: '#3E3E3E',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#d1d1d1',
    borderColor: '#ffffff',

  },
  buttonContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 15,
  },
  whiteButtonContainer: {
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 15,
  },
  sideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  body: {
    flex: 1,

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
  title: {
    marginTop: 27,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 30,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold'
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    margin: 40,
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
  smodal: {
    width: Dimensions.get('window').width,
    height: URL.height,
    backgroundColor: "#010113"

},
successModalbuttonContainer: {
  backgroundColor: color.slide_color_dark,
  marginLeft: 25,
  marginRight: 25,
  borderRadius: 15,
  marginTop: 15,
  marginBottom: 30,
},
});

