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

import { baseUrl, getToken } from '../../utilities';

import * as Animatable from 'react-native-animatable';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';

const Bank = ({ onClose, onSelect }) => {


  const [loading, setLoading] = useState(true);
 
  const [bankId, setBankId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [search, setSearch] = useState('');
  const [bankData, setBankData] = useState()
  const [arrayholder, setArrayholder]=useState([])


  const initiate = async () => {
    getBanksRequest(await getToken())
  }

  const getBanksRequest = (auth) => {
   
    setLoading(true)
    fetch(baseUrl() + '/bank', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        setLoading(false)
        if (res.status) {
          setArrayholder(res.data.data)
          setBankData(res.data.data)
          //sortBank(res.data.data);
         // setBankData(res.data.data);
        

        } else {
          // Alert.alert(
          //   'Alert',
          //   'Something went wrong please try again',
          //   [
          //     { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          //     { text: 'Retry', onPress: () => this.getBanksRequest(auth) },
          //   ],
          //   { cancelable: false }
          // )
        }



      })
      .catch(error => {
        alert(error.message);
        setLoading(false)
        //this.setState({ loading: false })
      });


  };

  useEffect(() => {
    initiate()
  }, []);

  const sortBank = (list) => {
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
        'PROVIDUS BANK', 'RENMONEY MICROFINANCE BANK', 'RUBIES MICROFINANCE BANK',
        'STANBIC IBTC BANK PLC',
        'STANDARD CHARTERED BANK',
        'STERLING BANK PLC',
        'SUNTRUST BANK',
        'TITAN TRUST BANK',
        'UNION BANK', 'UNITED BANK FOR AFRICA PLC',
        'UNITY BANK',
        'VFD MICROFINANCE BANK',
        'VISA MICROFIN BANK',
        'WEMA/ALAT', 
        'SAFE HAVEN MICROFINANCE BANK',
        'SAFE HAVEN SANDBOX BANK',
        'ZENITH BANK PLC',
      ];
      
      console.info(list)
    for (let i = 0; i < list.length; i++) {
      if (banks.includes(list[i].name)) {
        instant_array.push(
          list[i]
        )
      }

    }

    // console.info(instant_array)
   // arrayholder = instant_array;
   setArrayholder(instant_array)
    setBankData(instant_array)

  }


  const searchFilterFunction = search => {
    setSearch(search)
    const newData = arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setBankData(newData)
  };


  const _handleCategorySelect = (index) => {
    onSelect(index);
  }
  const renderItem = ({ item, }) => {
    return (
      <TouchableOpacity style={{ marginLeft: 10, marginRight: 20, marginBottom: 10 }}
        onPress={() => _handleCategorySelect(item)} underlayColor="red">
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.nameList}>{item.name}</Text>
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

            <Text style={{ fontSize: 18, margin: 7, flex: 1, fontFamily: font.BOLD, color: lightTheme.PRIMARY_COLOR, textAlign: 'center', marginRight: 10 }}>{"Select Bank"}</Text>
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

            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="search list"
                placeholderTextColor='#4b544d'
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.search_input}
                maxLength={10}
                onChangeText={searchFilterFunction}
              />
              <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, }}>
                <FlatList
                  style={{ paddingBottom: 5 }}
                  data={bankData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}

                />
              </View>
            </View>
          </View>
          {loading ? <ActivityIndicator /> : null}


        </Animatable.View>
      </View>

    </>

  );




}

export default Bank;

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
  }
});

