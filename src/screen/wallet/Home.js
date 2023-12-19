// React native and others libraries imports
import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Icon, SocialIcon } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'

import Complete from '../../component/view/Complete';
import { baseUrl, getToken, getUser, getWallet, storeWallet } from '../../utilities';

import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';
import Card from './Card'
import { menufive, menufour, menuone, menuthree, menutwo } from '../../assets';
import MenuCard from './MenuCard';


const Home = ({ }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [visible, setVisible] = useState(false);

    const [data, setData] = useState('');
    const [balance, setBalance] = useState(10);
    const [point, setPoint] = useState(10);
    const [auth, setAuth] = useState('');
    const [type, setType] = useState('');
    const [ledgerBalance, setLedgerBalance] = useState(0);
    const [wallet, setWallet] = useState('');


    const initia = async () => {
        console.warn(JSON.parse(await getUser()));
        setData(JSON.parse(await getUser()))
    }

    useEffect(() => {
        initia()
        getWalletRequest();
    }, []);




    const getWalletRequest = async () => {
        console.warn("up");
        console.warn(auth);
        console.warn("down");
        dispatch(SHOW_LOADER("Getting wallet"))

      return fetch(baseUrl() + '/wallets', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                dispatch(HIDE_LOADER())
                console.warn(res);
                storeWallet(JSON.stringify(res.data))

                setBalance(res.data.balance.data.currentBalance)
                setPoint(res.data.points)
                setLedgerBalance(res.data.balance.data.availableBalance)
                setWallet(res.data)

            })
            .catch(error => {
                dispatch(HIDE_LOADER())
                alert(error.message);

            });


    };



    const handlerLongClick = (info) => {
        Clipboard.setString(info)
        Toast.show({
            text: 'Text copied to clipboard !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

    };


    processResponse = (response) => {
        const statusCode = response.status;
        console.warn(response);
        ///const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    const payAction = () => {
        navigation.navigate('scan')
    }

    const topAction = () => {
        navigation.navigate('user_top')
    }

//    const _refresh=()=> {
//         return new Promise((resolve) => {
//           setTimeout(()=>{resolve()}, 2000)
//         });
//       }

    const _refresh = () => {
        return new Promise((resolve) => {
            getWalletRequest()
            setTimeout(()=>{resolve()}, 2000)
        });
    }

    const updateAccount = () => {

        const formData = new FormData();
        formData.append('wallet_id', wallet.id);

        fetch(URL.urltwo + '/wallet/virtualaccounttopup', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                dispatch(HIDE_LOADER())
                getWalletRequest()
            })
            .catch((error) => {
                dispatch(HIDE_LOADER())
                console.warn(error.message);

            });

    }






    const handleMybank = async () => {
        if (await checkAccount()) {
            navigation.navigate('selbank')
        } else {
            navigation.navigate('addbank')
        }
    }

    const checkAccount = async () => {
        const wallet = JSON.parse(await getWallet())
        const bank_accounts = wallet.bank_accounts
        let is_virtual = false
        for (let i = 0; i < bank_accounts.length; i++) {
            if (!bank_accounts[i].is_virtual_account) {
                is_virtual = true
            }
        }
        return is_virtual

    }

    const renderComplete = () => {
        return (
            <Complete
                onComplete={() => onComplete()}
                onBack={() => setVisible(false)} />
        )
    }

    const onComplete = () => {
        setVisible(false)

        getWalletRequest()
    }






    const itemClick = (item) => {
        if (item.navigationUrl == 'pay') {
            navigation.navigate('scan', { operation: 'pay' })
        } else if (item.navigationUrl == 'FundW') {
            navigation.navigate('user_top')
        }else if (item.navigationUrl == 'bank') {
            navigation.navigate('transfer', {data:data})
        }else if (item.navigationUrl == 'beneficiary') {
            navigation.navigate('beneficiary', {data:data})
        }

    }


    const renderGallery = (data) => {
        return (
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row'
            }}>
                {data.map((data, id) => (


                    <>
                        {data.empty ?
                            <View style={styles.emptyRow} key={id}>
                            </View> :

                            <View style={styles.row} key={id}>
                                <TouchableOpacity
                                    disabled={data.active ? false : true}
                                    onPress={() => itemClick(data)}
                                    style={styles.tabStyle}>

                                    <MenuCard bg={data.bg} title={data.title} />
                                </TouchableOpacity>
                            </View>
                        }
                    </>




                ))}
            </View>

        );
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: lightTheme.WHITE_COLOR }}>
                <View style={styles.backgroundImage}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={lightTheme.WHITE_COLOR} />
                    <View style={styles.body}>
                        <View style={styles.avarterContainer}>

                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: "center" }} >
                                    <Icon
                                        active
                                        name="user-circle-o"
                                        type='font-awesome'
                                        color={lightTheme.BLACK_TEXT_COLOR}
                                        size={30}
                                    />
                                </TouchableOpacity>
                                <View style={{justifyContent:'center'}}>
                                    <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => handlerLongClick(data.user_id)}>
                                        <Text style={[styles.title]}>{data.first_name}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1 }}></View>

                            </View>

                        </View>
                        <PTRView onRefresh={_refresh} >
                            <View style={styles.mainbody}>

                                <View style={styles.card_container}>
                                    <Card balance={balance} onQrClick={() => navigation.navigate('qrsetting')} point={point} />
                                </View>


                                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                    {renderGallery(menuItems)}
                                </View>


                            </View>
                        </PTRView>
                    </View>
                </View>
                {visible ? renderComplete() : null}
            </SafeAreaView>
        </>
    );





}
export default Home

const menuItems = [

    {
        title: 'Send to SendMonny User',
        bg: menuone,
        navigationUrl: 'pay',
        active: true,
        empty: false
    },
    {
        title: 'Send to Other Banks',
        bg: menutwo,
        navigationUrl: 'bank',
        active: true,
        empty: false
    },
    {
        title: 'Fund your wallet',
        bg: menuthree,
        navigationUrl: 'FundW',
        active: true,
        empty: false
    },
    // {
    //     title: 'Pay Bills',
    //     bg: menufour,
    //     navigationUrl: 'Hospital',
    //     active: true,
    //     empty: false
    // },
    {
        title: 'Manage Beneficiaries',
        bg: menufive,
        navigationUrl: 'beneficiary',
        active: true,
        empty: false
    },
    {
        title: 'Manage Beneficiaries',
        bg: menufive,
        navigationUrl: 'beneficiary',
        active: true,
        empty: true
    },

];
const styles = StyleSheet.create({
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
        backgroundColor: lightTheme.WHITE_COLOR
    },
    avarterContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 30,


    },
    mainbody: {
        paddingTop: 10,
        width: Dimensions.get('window').width,
        flex: 1,
    },
    title: {
        marginRight: 13,
        marginLeft: 8,
        fontSize: 15,
        color:lightTheme.PRIMARY_COLOR,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
      
    },
    card_container: {
        marginLeft: 20,
        marginRight: 20
    },
    card_body: {
        backgroundColor: 'green',
        borderRadius: 5,
        flexDirection: 'row',
    },
    row: {
        flexBasis: '42%',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 1,
        borderRadius: 10,
        marginHorizontal: 1,
        justifyContent: 'center',
        marginTop: 14,
    },
    emptyRow: {
        flexBasis: '42%',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 1,
        borderRadius: 10,
        marginHorizontal: 1,
        justifyContent: 'center',
        marginTop: 4,
    }


});



