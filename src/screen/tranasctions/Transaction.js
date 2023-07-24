
// React native and others libraries imports
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import color from '../../component/color'
import Moment from 'moment';
import moment from "moment";

import { baseUrl, getToken, getUser, getWallet } from '../../utilities';
import TransactionItem from './TransactionItem';
import { lightTheme } from '../../theme/colors';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';
import SlideUpAlert from '../../component/SlideUpAlert';
import { font } from '../../constants';
import RadioButton from '../../component/RadioButton';

Moment.locale('en');


// in Expo - swipe left to see the following styling, or create your own

const Transaction = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [wallet, setWallet] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState({ height: 350, type: 1 })


    useEffect(() => {
        setWalletValue()
        getWalletTransactionRequest()
    }, []);



    const setWalletValue = async () => {
        setWallet(JSON.parse(await getWallet()))
    }

    const getWalletTransactionRequest = async () => {
        //  dispatch(SHOW_LOADER("Get Tentative"))
        fetch(baseUrl() + '/transactions/', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode == 200) {
                    dispatch(HIDE_LOADER())
                    setItems(data.data)
                    console.warn(data.data);

                }
            })
            .catch(error => {
                dispatch(HIDE_LOADER())
                console.warn(error)
                alert(error.message);

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
            <TransactionItem item={item} isdebit={item.debit_wallet_id == wallet.id} />
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

                    <View style={{ justifyContent: 'center', flex: 1, }}>
                        <Text style={styles.title}>Transactions</Text>
                    </View>
                    <TouchableOpacity onPress={() => getWalletTransactionRequest()} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                        <Icon
                            name="reload"
                            size={20}
                            type='material-community'
                            color={color.primary_color}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContent}>
                    <View style={{ marginTop: 20, flexDirection: 'row', marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', flex: 1, }}>

                            <TouchableOpacity onPress={() => [setShowAlert(true), setAlert({ height: 350, type: 1 })]} style={{ flex: 1, borderRadius: 15, borderColor: lightTheme.INACTIVE_COLOR, borderWidth: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ color: lightTheme.PRIMARY_INACTIVE_COLOR, fontSize: 12, marginVertical: 4 }}>Type</Text>
                                <Icon
                                    name="chevron-down"
                                    size={20}
                                    type='material-community'
                                    color={lightTheme.PRIMARY_INACTIVE_COLOR}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => [setShowAlert(true), setAlert({ height: 500, type: 2 })]} style={{ flex: 1, borderRadius: 15, borderColor: lightTheme.INACTIVE_COLOR, borderWidth: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ color: lightTheme.PRIMARY_INACTIVE_COLOR, fontSize: 12, marginVertical: 4 }}>Date</Text>
                                <Icon
                                    name="chevron-down"
                                    size={20}
                                    type='material-community'
                                    color={lightTheme.PRIMARY_INACTIVE_COLOR}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, borderRadius: 15, borderColor: lightTheme.INACTIVE_COLOR, borderWidth: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ color: lightTheme.PRIMARY_INACTIVE_COLOR, fontSize: 12, marginVertical: 4 }}>Sort By</Text>
                                <Icon
                                    name="chevron-down"
                                    size={20}
                                    type='material-community'
                                    color={lightTheme.PRIMARY_INACTIVE_COLOR}
                                />
                            </TouchableOpacity>


                        </View>

                        <View style={{ width: 1, backgroundColor: lightTheme.INACTIVE_COLOR, marginHorizontal: 10 }} />

                        <View style={{}}>

                            <TouchableOpacity style={{ borderRadius: 15, borderColor: lightTheme.INACTIVE_COLOR, borderWidth: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10, padding: 5, }}>

                                <Icon
                                    name="search1"
                                    size={20}
                                    type='antdesign'
                                    color={lightTheme.PRIMARY_INACTIVE_COLOR}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {renderResuts(items)}
                    </View>
                </View>
            </View>
            {showAlert ? renderAlert() : null}
        </View>
    );
}





export default Transaction


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

    }

});






