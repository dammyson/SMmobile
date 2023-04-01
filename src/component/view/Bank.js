// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, AsyncStorage, FlatList, Dimensions, TextInput, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, View, Text } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { PulseIndicator } from 'react-native-indicators';
import URL from '../server'
import color from '../color'
import ActivityIndicator from './ActivityIndicator'
import { getToken, getWallet, processResponse } from '../utilities';


export default class Bank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant: 'ay345',
      items: [],
      visible: false,
      view_balance: false,
      loading: true,
      auth: '',
      bank_id: '',
      selected_category: 0,
      search: '',
    };
    this.arrayholder = [];
  }


  async componentWillMount() {
    this.setState({
      auth: await getToken(),
    })
    this.getBanksRequest()
  }

  getBanksRequest() {
    const { auth } = this.state;
    this.setState({ loading: true });
    fetch(URL.urltwo + '/ext/banks/list', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res)
        if (res.responsecode == '00') {
          this.sortBank(res.banklist);
          console.warn(res.banklist)

        } else {
          Alert.alert(
            'Alert',
            'Something went wrong please try again',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
              { text: 'Retry', onPress: () => this.getBanksRequest(auth) },
            ],
            { cancelable: false }
          )
        }



      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });


  };


  sortBank(list) {
    let instant_array = [];
    let banks = 
    [
    '3LINE',
    'AB MICROFINANCE BANK',
    'ABBEY MORTGAGE BANK',
    'ACCESS BANK PLC',
    'ACCESS(DIAMOND)BANK',
    'ASO SAVINGS AND LOANS',
    'BAOBAB MICROFINANCE BANK',
    'CITIBANK NIGERIA',
    'ECOBANK BANK',
    'E-TRANZACT',
    'FIDELITY BANK',
    'FCMB',
    'FIRST BANK OF NIGERIA PLC',
    'FORTIS MICROFINANCE BANK',
    'FSDH MERCHANT BANK',
    'GUARANTY TRUST BANK PLC',
    'HERITAGE BANK',
    'JAIZ BANK',
    'KEYSTONE BANK',
    'KUDA MICROFINANCE BANK',
    'PAYATTITUDE ONLINE',
    'POLARIS BANK',
    'PROVIDUS BANK','RENMONEY MICROFINANCE BANK','RUBIES MICROFINANCE BANK',
    'STANBIC IBTC BANK PLC',
    'STANDARD CHARTERED BANK',
    'STERLING BANK PLC',
    'SUNTRUST BANK',
    'TITAN TRUST BANK',
    'UNION BANK','UNITED BANK FOR AFRICA PLC',
    'UNITY BANK',
    'VFD MICROFINANCE BANK',
    'VISA MICROFIN BANK',
    'WEMA/ALAT', 'ZENITH BANK PLC',
     ];
    for (let i = 0; i < list.length; i++) {

      if (banks.includes(list[i].bankname)) {
        instant_array.push(
          list[i]
        )
      }

    }
    this.arrayholder = instant_array;
    this.setState({ bank_data: instant_array })
    this.setState({ loading: false })
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
    const { onClose, items } = this.props;
  
    return (
      <View style={styles.backgroundImage}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <View style={{marginLeft:20, marginRight: 20, flexDirection: 'row', alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'left', paddingBottom: 10, marginTop: 25, flex: 1 }}>Select bank </Text>
              <TouchableOpacity onPress={() => onClose()} style={{ marginLeft: 10, backgroundColor: '#fff' }}>
                <Icon
                  name="close"
                  size={20}
                  type='antdesign'
                  color="#000"
                />
              </TouchableOpacity>

            </View>
            <TextInput
              placeholder="search list"
              placeholderTextColor='#4b544d'
              returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.search_input}
              maxLength={10}
              onChangeText={this.searchFilterFunction}
            />
            <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, }}>
              <FlatList
                style={{ paddingBottom: 5 }}
                data={this.state.bank_data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
               
              />
            </View>
          </View>
        </View>
        {this.state.loading ? <ActivityIndicator /> : null}
      </View>

    );
  }


  _handleCategorySelect = (index) => {
    const { onSelect, } = this.props;
    onSelect(index);
  }
  renderItem = ({ item, }) => {
    return (
      <TouchableOpacity style={{ marginLeft: 10, marginRight: 20, marginBottom: 10 }}
        onPress={() => this._handleCategorySelect(item)} underlayColor="red">
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.nameList}>{item.bankname}</Text>
          <Icon
            active
            name="dots-vertical"
            type='material-community'
            color='#FFF'
          />
        </View>

      </TouchableOpacity>

    )

  }
}


Bank;

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
    backgroundColor: '#fff'
  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
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
    fontFamily: 'Poppins-Bold'
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

  nameList: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold'
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

