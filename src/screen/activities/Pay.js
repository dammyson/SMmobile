'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, TextInput, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { withNavigationFocus } from 'react-navigation';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import color from '../../component/color'
import { PulseIndicator } from 'react-native-indicators';
import URL from '../../component/server'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ActivityIndicator from '../../component/view/ActivityIndicator'
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import { baseUrl } from '../../utilities';
class QRCode extends Component {


  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visible: true,
      message: 'data',
      loading: false,
      data: '',
      view_banks: false,
      visible: false,
      user_id: '',
      payment_detail: null,
      ammount: '',
      pin: '',
      wallet: '',
      view_success: false,
      view_error: false,
      tansfer_loading: false,
      can_scan: true,
      auth: '',
      operation: '',
      operation_message: ''
    };
  }

  onSuccess = (e) => {

    this.getDetailRequest(e.data)
  }

  

  componentDidMount() {
 
    const { operation } = this.props.route.params;
    this.setState({ operation: operation });


    AsyncStorage.getItem('data').then((value) => {
      if (value == '') { } else {
        this.setState({ data: JSON.parse(value) })
      }
      AsyncStorage.getItem('wallet').then((value) => {
        if (value == '') { } else {
          this.setState({ wallet: JSON.parse(value) })
        }
      })

      AsyncStorage.getItem('auth').then((value) => {
        if (value == '') { } else {
          this.setState({ auth: value })
        }
      })


    })

  }

  getDetailRequest(user_id) {
    this.setState({ can_scan: false })
    const { auth } = this.state

    this.setState({ loading: true });

    fetch(baseUrl() + '/wallet/holder/' + user_id, {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(this.processResponse)
      .then(res => {
        const { statusCode, data } = res;
        console.warn(res);

        if (statusCode == 200) {
          this.setState({
            payment_detail: data.data,
            loading: false,
            visible: true
          })

        } else {
          Alert.alert('Operation failed', data.message, [{ text: 'Okay' }])
          this.setState({
            loading: false,
            can_scan: true
          })
        }

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });
  };



  processTransfer() {

    const { ammount, pin, auth, wallet, data, operation, payment_detail } = this.state

    if (ammount == "" || pin == "") {
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
      var action_url = '/wallet/transfer'
      var formData = new FormData();
      formData.append('sender_wallet_id', wallet.id);
      formData.append('recipient_wallet_id', payment_detail.wallet_id);
      formData.append('amount', ammount);
      formData.append('transaction_pin', pin);
    } else {

    }


    this.setState({
      tansfer_loading: true,
    })
    console.warn(formData);
    fetch(URL.urltwo + action_url, {
      method: 'POST', headers: {
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
          tansfer_loading: false,

        })
        if (statusCode == 200) {
          this.setState({ view_success: true })
        } else if (statusCode == 401) {
          this.setState({ view_error: true, operation_message: data.message })
        } else if (statusCode == 422) {
          this.setState({ view_error: true, operation_message: data.message })
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



  render() {

    return (
      <Container>
        <Content>
          {
           
                this.renderCamera()
            
          }
        </Content>
       
        {this.state.loading ? <ActivityIndicator /> : null}
      </Container>
    );


  }


  renderCamera() {
    return (
      <View style={{
        flex: 1, alignContent: 'center', width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
      }}>
        <View style={styles.arrowContainer}>
          <Button onPress={() => this.props.navigation.goBack()} transparent>
            <Icon
              name="ios-arrow-back"
              size={30}
              type='ionicon'
              color={color.primary_color}
            />
          </Button>


        </View>

        <View style={{ flex: 1, alignContent: 'center' }}>
          <QRCodeScanner
            onRead={this.onSuccess}
            ref={(node) => { this.scanner = node }}
            reactivate={true}
            showMarker={true}
            bottomContent={
              <TouchableOpacity
                style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>scan qr code!</Text>
              </TouchableOpacity>
            }
          />


        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  loadingBackgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  modal: {
    width: Dimensions.get('window').width - 60,

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
  input: {
    height: 45,
    borderColor: '#3E3E3E',
    marginBottom: 10,
    color: '#3E3E3E',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#e4e4e4',
    borderColor: '#ffffff',
  },
  modalbuttonContainer: {
    backgroundColor: color.slide_color_dark,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginRight: 20,
    marginTop: 30,
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

export default withNavigationFocus(QRCode);
