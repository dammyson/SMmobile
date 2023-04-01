// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, Linking, AsyncStorage, FlatList, Switch, Dimensions, Image, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, View, Text, Toast, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { PulseIndicator } from 'react-native-indicators';
import URL from '../../component/server'
import color from '../../component/color'
import { getToken, getWallet, getPref, getChatNumber, processResponse, getUserType } from '../../component/utilities';
import ActivityIndicator from '../../component/view/ActivityIndicator';
export default class SelectBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchant: 'ay345',
      items: [],
      visible: false,
      view_balance: false,
      loading: false,
      auth: '',
      wallet: '',
      bank_id: '',
      selected_category: 0,
      details: {},
      isEnabled: false,
      action:'',
      role: '',
    };
  }


  async componentWillMount() {
    const wallet = JSON.parse(await getWallet())
    this.setState({ wallet: wallet ,  action: await getPref(),role: await getUserType()})
    const bank_accounts = wallet.bank_accounts
    var instant_array = []
    instant_array = this.state.items
    for (let i = 0; i < bank_accounts.length; i++) {
      if (!bank_accounts[i].is_virtual_account) {
        instant_array.push(bank_accounts[i])
        this.setState({ details: bank_accounts[i] })
      }
    }
    this.setState({ items: instant_array })

  }

  async componentDidMount() {
    setTimeout(async () => {
      var pre = this.state.action;
      console.warn(this.state.action)
      if(pre == "Instant") {
        this.setState({ isEnabled: true })
      } else {
        this.setState({ isEnabled: false })
      }
    }, 100);
  }

  toggleSwitch() {
    if (this.state.isEnabled) {
      this.updateWalletPref(null)
      this.setState({ isEnabled: false })
    } else {
      this.updateWalletPref('Instant')
      this.setState({ isEnabled: true })
    }

  }

  removeBank(bank_id) {
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

  removeBankRequest(bank_id) {
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

  getWalletRequest(auth) {

    fetch(URL.urltwo + '/wallet', {
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

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });


  };


  async updateWalletPref(auth) {
    const { wallet } = this.state
    var Dbody = JSON.stringify({
      auto_withdrawal: auth,
    });
    this.setState({ loading: true })
    fetch(URL.urltwo + '/wallet/' + wallet.id + '/preferences', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + await getToken(),
        'Content-Type': 'application/json',
      }, body: Dbody,
    })
      .then(processResponse)
      .then(res => {
        this.setState({ loading: false })
        const { statusCode, data } = res;
        console.warn(statusCode, data);
        if (statusCode == 200) {
          if (data.error) {

          } else {
            Toast.show({
              text: 'Wallet Prefrence updated!',
              position: 'top',
              type: 'success',
              buttonText: 'Dismiss',
              duration: 1500
            });
            if (data.data.auto_withdrawal == 'Instant') {
              AsyncStorage.setItem('wallet_pre', data.data.auto_withdrawal);
              this.setState({
                isEnabled: true
              })
            } else {
              AsyncStorage.setItem('wallet_pre', 'null');
              this.setState({
                isEnabled: false
              })
            }

          }
        }

      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });


  };

  async handlerClick() {
    Linking.openURL("whatsapp://send?text=" + "Hi I'm from sendmonny app and I have a problem." + "&phone=" + getChatNumber())
  };

  render() {

    if (this.state.loading) {
      return (
        <ActivityIndicator />
      );
    }

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
              <Text style={styles.title}>My Bank Account</Text>
            </View>
            <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
          </View>

          <View style={styles.mainbody}>
            <View style={{ height: 140 }}>
              <FlatList
                style={{ paddingBottom: 5, }}
                data={this.state.items}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              />
            </View>
            {this.state.role == 'merchant' ? 
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginHorizontal: 25 }} >
              <View style={{ justifyContent: 'center', flex: 2, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
                <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>Auto Withdraw {this.state.action.toString()} </Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', marginRight: 10 }}>Transfer your money to
your Bank automatically.</Text>

              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', }} >
                <View style={{ backgroundColor: '#D2D1F2', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }} >
                  <Switch
                    trackColor={{ false: '#D2D1F2', true: '#D2D1F2' }}
                    thumbColor={this.state.isEnabled ? '#4C46E9' : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.toggleSwitch()}
                    value={this.state.isEnabled}
                  />
                </View>
              </View>
            </View>
            :null}

          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row', marginHorizontal: 25, marginVertical: 30 }} >
            <View style={{ justifyContent: 'center', flex: 2, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
              <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>To change your bank account Contact   <Text onPress={() => this.handlerClick()} style={{ color: '#4C46E9', textDecorationLine: 'underline', }}>Support  </Text> </Text>

            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', }} >

            </View>
          </View>
        </View>

      </View>

    );
  }


  _selectBank = (index) => {
    this.props.navigation.navigate('withdrawal', { bank: index })
  }
  renderItem = ({ item, }) => {
    return (
      <View style={styles.textInputContainer}>

        <View style={styles.input}>
          <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
            <View style={{ justifyContent: 'center', flex: 1, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
              <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{item.beneficiary_bank_name} </Text>
              <Text style={{ fontSize: 10, marginTop: 10, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', marginRight: 10 }}>{item.beneficiary_account_number} </Text>
              <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{item.beneficiary_account_name} </Text>
            </View>
            <View style={{ justifyContent: 'center', marginRight: 15, }} >
              <Image
                style={{ height: 50, width: 80, resizeMode: 'contain' }}
                source={require('../../assets/bank.png')}
              />
            </View>



          </View>
        </View>
      </View>

    )

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
  loadingBackgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff'
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

