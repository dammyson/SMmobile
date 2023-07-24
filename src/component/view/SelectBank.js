// React native and others libraries imports
import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, AsyncStorage, FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { PulseIndicator } from 'react-native-indicators';
import URL from '../../component/server'
import color from '../../component/color'
import { getToken, getWallet, processResponse } from '../utilities';
import { baseUrl } from '../../utilities';
import { lightTheme } from '../../theme/colors';


const SelectBank =(onClose, items_)=> {

  const [merchant, setMerchant] = useState('ay345');
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [viewBalance, setViewBalance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState('');
  const [bankId, setBankId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);




 const removeBank=(bank_id)=> {
    Alert.alert(
      'Are you sure to delete?',
      'never recover',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete', onPress: () => this.removeBankRequest(bank_id), style: 'destructive' },
      ],
      { cancelable: false }
    )
  }

  removeBankRequest=(bank_id)=> {
    const { auth } = this.state
    this.setState({ loading: true });

    fetch(URL.urltwo + '/wallet/account/delete/' + bank_id, {
      method: 'DELETE', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        this.getWalletRequest(auth);

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });

  }

  const getWalletRequest=(auth)=> {
    const { onClose, removeBank } = this.props;
    console.warn(auth);

    fetch(baseUrl() + '/bank', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        AsyncStorage.setItem('wallet', JSON.stringify(res.data));
        this.setState({
          wallet: res.data,
          loading: false
        })
        removeBank(res.data.bank_accounts)

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });


  };



    if (loading) {
      return (

        <ImageBackground
          source={require('../../assets/user_bg.png')}
          style={styles.loadingBackgroundImage}
          resizeMode="cover"
        >
          <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.welcome}>
              <PulseIndicator color={color.slide_color_dark} size={70} />
            </View>
          </View>
        </ImageBackground>
      );
    }

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
                color={lightTheme.PRIMARY_COLOR}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>Choose Account</Text>
            </View>
            <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
          </View>


          <View style={styles.mainbody}>
            <FlatList
              style={{ paddingBottom: 5 }}
              data={items}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />

          </View>
        </View>

      </View>

    );
  


 const  _selectBank = (index) => {
    const { onSelect, } = this.props;
    onSelect(index);
  }
 const renderItem = ({ item, }) => {
    return (
      <View style={styles.textInputContainer}>
        <TouchableOpacity onPress={() => _selectBank(item)} style={styles.input}>
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
            <View style={{ justifyContent: 'center', }} >
              <Icon
                active
                name="bank"
                type='font-awesome'
                color={color.primary_color}
                size={20}
              />
            </View>

            <View style={{ marginLeft: 20, flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
              <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{item.beneficiary_bank_name} </Text>
            </View>
            <View style={{ justifyContent: 'center', marginRight: 15, alignItems: 'flex-end' }} >
              <Text style={{ fontSize: 10, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', }}>{item.beneficiary_account_number} </Text>
              <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}> {item.beneficiary_account_name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

    )

  }

}

export default SelectBank;

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
    marginTop: 20,


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


});

