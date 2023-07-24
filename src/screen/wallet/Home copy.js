// React native and others libraries imports
import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';

import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'
import { MaterialCommunityIcons } from 'react-native-elements';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import Complete from '../../component/view/Complete';
import { baseUrl, getToken, getUser, getWallet, storeWallet } from '../../utilities';

import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';


 const Home =({}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
   
    const [items, setItems] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [viewBalance, setViewBalance] = useState(false);
    const [data, setData] = useState('');
    const [showBalance, setShowBalance] = useState(true);
    const [balance, setBalance] = useState(10);
    const [auth, setAuth] = useState('');
    const [type, setType] = useState('');
    const [ledgerBalance, setLedgerBalance] = useState(0);
    const [title, setTitle] = useState(false);
    const [wallet, setWallet] = useState('');






  const initia = async () => {
    setData(JSON.parse(await getUser()))
   
    
  }

  useEffect(() => {
    initia()
    getWalletRequest();
  }, []);




  const  getWalletRequest=async()=> {
    console.warn("up");
    console.warn(auth);
    console.warn("down");
    dispatch(SHOW_LOADER("Geting wallet"))
      
        fetch(baseUrl() + '/wallets', {
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
                setLedgerBalance(res.data.balance.data.availableBalance)
                setWallet(res.data)

            })
            .catch(error => {
                dispatch(HIDE_LOADER())
                alert(error.message);
               
            });


    };



  const  handlerLongClick=(info)=> {
        Clipboard.setString(info)
        Toast.show({
            text: 'Text copied to clipboard !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

    };


    processResponse =(response)=> {
        const statusCode = response.status;
        console.warn(response);
        ///const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    const payAction =() =>{
        navigation.navigate('scan')
    }

    const topAction=()=> {
           navigation.navigate('user_top')
    }


  const _refresh = () => {
        return new Promise((resolve) => {
           getWalletRequest()
        });
    }

   const updateAccount =()=> {
      
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


    const renderTiles=()=> {
        return (

            <View style={styles.tiles_container}>

                <TouchableOpacity onPress={() => goToPage('NW')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
                    <View style={styles.tile_card}>
                        <Image
                            source={require('../../assets/wallet.png')}
                            style={styles.tile_image}

                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#0F0E43', fontSize: 10, opacity: 0.6 }}> Wallets </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToPage('bill')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
                    <View style={styles.tile_card}>
                        <Image
                            source={require('../../assets/bill.png')}
                            style={styles.tile_image}

                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#0F0E43', fontSize: 10, opacity: 0.6 }}> Bill Payment </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToPage('giveaway_h')} style={{ justifyContent: 'center', alignItems: 'center',flex:1 }} >
                    <View style={styles.tile_card}>
                        <Image
                            source={require('../../assets/give.png')}
                            style={styles.tile_image}

                        />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#0F0E43', fontSize: 10, opacity: 0.6 }}> Give away </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage('transfer')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
                    <View style={styles.tile_card}>
                        <View style={{ transform: [{ rotate: "0deg" }] }}>
                            <Image
                                source={require('../../assets/arro.png')}
                                style={styles.tile_image}

                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#0F0E43', fontSize: 10, opacity: 0.6 }}> Transfer </Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }




    const renderList=()=> {
        return (
            <View style={styles.list_container} >
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => goToScan()} style={{ flexDirection: 'row', marginTop: 5, valueOf, marginBottom: 8, backgroundColor: '#D2D1F2', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }} >
                        <View style={{ marginLeft: 10, textAlign: 'right', marginRight: 3, flex: 1 }}>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-ExtraBold', fontSize: 14, marginBottom: 3, }}>Pay</Text>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-Light', opacity: 0.9, fontSize: 10, marginRight: 40, lineHeight: 12 }}>To Merchants, friend, Families and even religious institutions easily. </Text>
                        </View>
                        <View style={styles.avartar}>
                            <Image
                                source={require('../../assets/pay.png')}
                                style={{ height: 65, width: 65, resizeMode: 'contain' }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => topAction()} style={{ flexDirection: 'row', marginTop: 10, valueOf, marginBottom: 8, backgroundColor: '#FFC10740', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }} >
                        <View style={{ marginLeft: 10, textAlign: 'right', marginRight: 3, flex: 1 }}>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-ExtraBold', fontSize: 14, marginBottom: 3, }}>Fund my wallet</Text>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-Light', opacity: 0.9, fontSize: 10, marginRight: 40, lineHeight: 12 }}>Top Up your wallet to enable seamless payment to all sendmonny users. </Text>
                        </View>
                        <View style={styles.avartar}>
                            <Image
                                source={require('../../assets/top.png')}
                                style={{ height: 65, width: 65, resizeMode: 'contain' }}
                            />
                        </View>
                    </TouchableOpacity>
              
                    <TouchableOpacity onPress={() => handleMybank()} style={{ flexDirection: 'row', marginTop: 10, valueOf, marginBottom: 8, backgroundColor: '#D5D4E2', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10, }} >
                        <View style={{ marginLeft: 10, textAlign: 'right', marginRight: 3, flex: 1 }}>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-ExtraBold', fontSize: 14, marginBottom: 3, }}>My bank account </Text>
                            <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Poppins-Light', opacity: 0.9, fontSize: 10, marginRight: 40, lineHeight: 12 }}>Add and manage your bank account for seamless transactions.</Text>
                        </View>
                        <View style={styles.avartar}>
                            <Image
                                source={require('../../assets/lmbank.png')}
                                style={{ height: 65, width: 65, resizeMode: 'contain' }}
                            />
                        </View>
                    </TouchableOpacity>
                    
                </ScrollView>
            </View>
        );
    }

    const handleMybank=async()=> {
        if (await checkAccount()) {
            navigation.navigate('selbank')
        } else {
            navigation.navigate('addbank')
        }
    }

    const checkAccount= async()=> {
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

    const renderComplete=()=> {
        return (
            <Complete
                onComplete={() =>onComplete()}
                onBack={() =>  setVisible(false)} />
        )
    }

    const onComplete=()=> {
        setVisible(false)
      
        getWalletRequest()
    }



    const goToPage=(route)=> {
        // if (await this.checkVitualAccount()) {
        //     this.props.navigation.navigate(route)
        // } else {
        //     this.setState({
        //         visible: true,
        //     })
        // }
    }

     goToScan=async()=> {
         navigation.navigate('scan', { operation: 'pay' })
    }



        return (
            <>
             <SafeAreaView style={{ flex: 1,  backgroundColor: lightTheme.WHITE_COLOR }}>
                <View style={styles.backgroundImage}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor={lightTheme.WHITE_COLOR} />
                    <View style={styles.body}>
                        <View style={styles.avarterContainer}>

                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => handlerLongClick(data.user_id)}>
                                        <Text style={[styles.title]}>Hello, {data.user_id}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1 }}></View>
                                <LinearGradient style={{ borderRadius: 5, }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4C46E9', '#2D2C71']}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 7, borderRadius: 5 }} onPress={() => navigation.navigate('qrsetting')}>
                                        <Icon
                                            name="qrcode"
                                            type='antdesign'
                                            size={25}
                                            color={color.white}
                                        />
                                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Poppins-SemiBold', marginLeft: 20, marginRight: 20 }}>QR Code</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                        <PTRView onRefresh={_refresh} >
                            <View style={styles.mainbody}>
                                
                                <View style={styles.card_container}>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#3AA34E', '#005A11']} style={styles.card_body} >
                                        <View style={styles.currency_container}>
                                            <View style={{ marginLeft: 10, padding: 6, backgroundColor: '#ffffff20', justifyContent: 'center', borderRadius: 40, marginBottom: 5 }}>
                                                <Icon
                                                    name="currency-ngn"
                                                    type='material-community'
                                                    size={18}
                                                    color={color.white}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.detatails_container}>
                                            <View style={styles.card_part_one}>
                                                <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}> Naira Wallet</Text>

                                                {showBalance ?


                                                    <TouchableOpacity onPress={() => setShowBalance(false)} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                        <Icon
                                                            active
                                                            name="eye-with-line"
                                                            type='entypo'
                                                            color={'#ffffff70'}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => setShowBalance(true)} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                        <Icon
                                                            active
                                                            name="eye"
                                                            type='entypo'
                                                            color={'#ffffff70'}
                                                            size={20}
                                                        />
                                                    </TouchableOpacity>

                                                }

                                            </View>
                                            <View style={styles.card_part_two}>

                                                {showBalance ?
                                                    <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN {balance}</Text>
                                                    :
                                                    <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                                                }
                                            </View>
                                            <View style={styles.card_part_three}>
                                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                                    <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>Ledger Balance</Text>
                                                </View>
                                                <View style={{ backgroundColor: '#ffffff50', width: 1, marginRight: 10 }} />
                                                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                                                    {showBalance ?
                                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, textAlign: 'right' }}>NGN {ledgerBalance}</Text>
                                                        :
                                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, textAlign: 'right' }}>NGN *****</Text>
                                                    }

                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>

                                </View>






                                {renderTiles()}
                                <View style={{ backgroundColor: '#0F0E43', height: 0.3, marginTop: 20, opacity: 0.3, marginHorizontal: 28 }} />
                                {renderList()}
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
        paddingTop: 20,
        width: Dimensions.get('window').width,
        flex: 1,
    },
    title: {
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        marginBottom: -6
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30
    },
    card_body: {
        backgroundColor: 'green',
        borderRadius: 5,
        flexDirection: 'row',
    },
    currency_container: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'flex-start',
    },
    detatails_container: {
        flex: 1,
        marginTop: 15,
    },
    card_part_one: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 10,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 15
    },
    tiles_container: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
    },
    tile_body: {
        backgroundColor: 'green',
        borderRadius: 10,
        flexDirection: 'row',
    },

    list_container: {
        marginTop: 25,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 75

    },
    tile_image: {
        height: 30,
        width: 35,
        resizeMode: 'contain'
    },
    tile_card: {
        backgroundColor: '#EFF2F5',
        margin: 1,
        flex:1,
        borderRadius: 5,
        padding: 11,
        paddingLeft: 18,
        paddingRight: 18
    }




});



