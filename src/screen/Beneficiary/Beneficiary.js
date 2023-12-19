
// React native and others libraries imports
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar ,  PixelRatio,} from 'react-native';
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import color from '../../component/color'
import Moment from 'moment';
import moment from "moment";

import { baseUrl, getToken, getUser, getWallet } from '../../utilities';

import { lightTheme } from '../../theme/colors';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';
import SlideUpAlert from '../../component/SlideUpAlert';
import { font } from '../../constants';
import RadioButton from '../../component/RadioButton';
import AddBeneficiary from '../../component/view/AddBeneficiary';
import BeneficiaryItem from './BeneficiaryItem';

Moment.locale('en');


// in Expo - swipe left to see the following styling, or create your own 2037083142

const Beneficiary = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [wallet, setWallet] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState({ height: 350, type: 1 })
    const [showAddBeneficiary, setShowAddBeneficiary] = useState(false)


    useEffect(() => {
        setWalletValue()
        getBeneficiaryRequest()
    }, []);



    const setWalletValue = async () => {
        setWallet(JSON.parse(await getWallet()))
    }


  const getBeneficiaryRequest =async()=> {
   
 
dispatch(SHOW_LOADER("getting beneficiaries"))
    fetch(baseUrl() + '/beneficiaries/fetch?type=bank', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + await getToken(),
        'Content-Type': 'application/json',
      }
    })
    .then(processResponse)
    .then(res => {
        setLoading(false)
      const { statusCode, data } = res;
      console.warn(statusCode, data);
      if (statusCode == 200 || statusCode == 201) {
        setItems(data.data)
      }
       // AsyncStorage.setItem('wallet', JSON.stringify(res.data));
        // this.setState({
        //   wallet: res.data,
        //   loading: false
        // })
        // removeBank(res.data.bank_accounts)

      })
      .catch(error => {
        alert(error.message);
       
      }).finally(()=>{
        dispatch(HIDE_LOADER())
      });


  };

    const processResponse = (response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    const currencyFormat = (n) => {
        return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }


    const renderAddBeneficiary=()=>{
            return (<AddBeneficiary onAdd={()=>onAdd()} onClose={()=>setShowAddBeneficiary(false)} />)
    }

   const onAdd=()=>{
    setShowAddBeneficiary(false)
    getBeneficiaryRequest()
    }

    const renderAlertBody1 = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#2AAD86', marginTop: 20, fontSize: 25, fontFamily: font.BLACK }}>Successful!</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <View style={{ paddingTop: 1, paddingBottom: 10 }}>
                        <Button style={styles.modalTansButtonContainer} block iconLeft>
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>{'Go Home'}</Text>
                        </Button>
                    </View>

                </View>

            </View>
        )
    }

    const renderDateOfTransaction = () => {
        return (
            <View style={{ flex: 1 }}>

                {dateOfTransaction.map((item) => (
                    <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: '#BFBFBF', paddingVertical: 25, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontSize: 16, fontFamily: font.BOLD }}>{item.primary_text}</Text>
                            <Text style={{ color: lightTheme.PRIMARY_INACTIVE_COLOR, fontSize: 10, fontFamily: font.MEDIUM }}>{item.secondary_text}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <RadioButton checked={true} />
                        </View>
                    </View>
                ))}


                <View style={{ marginBottom: 15, marginTop: 20 }}>
                    <View style={{ paddingTop: 1, paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.modalTansButtonContainer} block iconLeft>
                            <Text style={{ color: '#fff', marginHorizontal: 40, fontSize: 14, fontWeight: '600' }}>{'Apply'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }


    const renderTypeOfTransaction = () => {
        return (
            <View style={{ flex: 1 }}>

                {typeOfTransaction.map((item) => (
                    <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: '#BFBFBF', paddingVertical: 25, paddingHorizontal: 20 }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontSize: 16, fontFamily: font.BOLD }}>{item.primary_text}</Text>
                            <Text style={{ color: lightTheme.PRIMARY_INACTIVE_COLOR, fontSize: 10, fontFamily: font.MEDIUM }}>{item.secondary_text}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <RadioButton checked={true} />
                        </View>
                    </View>
                ))}


                <View style={{ marginBottom: 15, marginTop: 20 }}>
                    <View style={{ paddingTop: 1, paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.modalTansButtonContainer} block iconLeft>
                            <Text style={{ color: '#fff', marginHorizontal: 40, fontSize: 14, fontWeight: '600' }}>{'Apply'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }


    const renderResuts = (data) => {
        Moment.locale('en');
        return data.map((item) => (
            <BeneficiaryItem item={item}/>
        ))

    }

    const renderAlert = () => {
        return (
            <SlideUpAlert
                title={'Hold on'}
                height={alert.height}
                showButton={true}
                onClose={() => setShowAlert(false)}
                Body={() => alert.type == 1 ? renderTypeOfTransaction() : renderDateOfTransaction()} />
        )
    }


    const selectTransaction = (item) => {
        // navigation.navigate('transaction_d', { items: item })
    }

    return (
        <View style={{ flex: 1, height: Dimensions.get('window').height, backgroundColor: lightTheme.PRIMARY_COLOR, }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={lightTheme.PRIMARY_COLOR} />
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', height: 60, paddingLeft: 20, marginTop: 30, width: Dimensions.get('window').width, backgroundColor: lightTheme.PRIMARY_COLOR }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Icon
                            name="arrow-back"
                            size={30}
                            type='ionicons'
                            color={color.primary_color}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 1, }}>
                        <Text style={styles.title}>Beneficiary</Text>
                    </View>
                    <TouchableOpacity onPress={() => getBeneficiaryRequest()} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                        <Icon
                            name="reload"
                            size={20}
                            type='material-community'
                            color={color.primary_color}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContent}>
                  
                    <View style={{ marginTop: 20 }}>
                        {renderResuts(items)}
                    </View>
                </View>
            </View>
            {showAddBeneficiary ? renderAddBeneficiary() : 
            
            <TouchableOpacity style={styles.fab} onPress={() => setShowAddBeneficiary(true)}>
            <Icon
                active
                name="plus"
                type='antdesign'
                color='#fff'
                size={25}
            />
        </TouchableOpacity>}
           
        </View>
    );
}





export default Beneficiary


const dateTo = moment().format('ddd D, MMM, YYYY');

const dateOfTransaction =
    [
        {
            primary_text: "Last 7 Days",
            secondary_text: moment().subtract(7, 'd').format('ddd D, MMM, YYYY') + ' - ' + dateTo,
        },
        {
            primary_text: "Last 30 Days",
            secondary_text: moment().subtract(30, 'd').format('ddd D, MMM, YYYY') + ' - ' + dateTo,
        },
        {
            primary_text: "Last 90 Days",
            secondary_text: moment().subtract(90, 'd').format('ddd D, MMM, YYYY') + ' - ' + dateTo,
        },
        {
            primary_text: "Custom Date",
            secondary_text: moment().subtract(90, 'd').format('ddd D, MMM, YYYY') + ' - ' + dateTo,
        }
    ]


const typeOfTransaction =
    [
        {
            primary_text: "Credit",
            secondary_text: "Money sent to you",
        },
        {
            primary_text: "Debit",
            secondary_text: "Money you sent to someone",
        },
    ]



const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,


    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF'
    },
    sideContent: {
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: color.white,


    },
    sideContenttwo: {
        flex: 1,

    },
    filter: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    whitecard: {
        padding: 10,
        borderRadius: 15,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"

    },
    resultButtonContainer: {
        marginLeft: 3,
        marginRight: 1,
        borderRadius: 20,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        alignItems: 'center',
    },
    resultTextDescription: {
        flex: 1

    },
    resultDescription: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultBox: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 2,
        marginTop: 2,
        borderColor: '#70707040',
        borderBottomWidth: 0.4
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
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-Bold'
    },
    modalTansButtonContainer: {
        backgroundColor: lightTheme.PRIMARY_COLOR,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    fab: {
        height: 60,
        width: 60,
        borderRadius: 200,
        position: 'absolute',
        bottom:  PixelRatio.get() === 3? 90:60,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: lightTheme.PRIMARY_COLOR,
    },

});






