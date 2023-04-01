'use strict';

import React, { Component } from 'react';
import { Alert, AsyncStorage, TextInput, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Icon } from 'react-native-elements';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import color from '../../component/color'

export default class Scan extends Component {


  constructor(props) {
    super(props);
    this.state = {
      items: [],
      visible: false,
      message: 'data',
      can_scan:true
     
    };
  }

  onSuccess = (e) => {
    const { onScan, } = this.props;
    onScan(e)
  }

  check = () =>
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('the feature is not available');
            break;
          case RESULTS.GRANTED:
            console.log('permission is granted');
            break;
          case RESULTS.DENIED:
            console.log('permission is denied and / or requestable');
            break;
          case RESULTS.BLOCKED:
            console.log('permission is denied and not requestable');
            break;
        }
      })
      .catch(error => {
        // …
      });

  refresh = () => {
    this.setState({ statuses: [] }, this.check);
  };

  componentDidMount() {
    this.check();
  }

  makeRemoteRequest = () => {
    console.warn('Goooood');


    this.render();
  };


  componentWillMount() {
   

  }



  closedialog() {
    this.setState({ visible: false, })
  }

  render() {
    const { onClose, } = this.props;
      return (
        <Container>
          <Content>
            <View style={{
              flex: 1, alignContent: 'center', width: Dimensions.get('window').width,
              height: Dimensions.get('window').height - 100,
            }}>
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
                                    <Text style={styles.title}>Scan Qr Code</Text>
                                </View>
                                <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
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
                      <Text style={styles.buttonText}>{}</Text>
                    </TouchableOpacity>
                  }
                />


              </View>
            </View>
          </Content>
        </Container>
      );


  

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
  arrowContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginRight: 20,
    marginTop: 30,
  },
});

//export default withNavigationFocus(Scan);