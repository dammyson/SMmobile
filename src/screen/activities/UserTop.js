// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';
import { baseUrl, getToken, storeWallet } from '../../utilities';

import color from '../../component/color'


export default class UserTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            view_balance: false,
            data: '',
            showBalance: true,
            balance: 0,
            auth: '',
        };
    }



    async componentWillMount() {
        this.setState({ auth: await getToken() })
         this.getWalletRequest() 
    }

    useCard() {
        const { data, } = this.state
        console.warn(data.email);
        if (data.email == null || data.email == '') {

        } else {
            this.props.navigation.navigate('charge')
        }
    }

    getWalletRequest() {
        const { auth } = this.state
       
        this.setState({ loading: true });
        fetch(baseUrl() + '/wallets', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res)
                storeWallet( JSON.stringify(res.data))


                this.setState({
                    balance: res.data.balance.data.currentBalance,
                    ledger_balance: res.data.balance.data.availableBalance,
                    loading: false,
                   
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


    };

    render() {
        if (this.state.loading) {
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
            <ImageBackground
                source={require('../../assets/wallet_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover">
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                        <TouchableOpacity onPress={() =>  this.props.navigation.goBack() } >
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={color.primary_color}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>Top Up</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>
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

                                        {this.state.showBalance ?


                                            <TouchableOpacity onPress={() => this.setState({ showBalance: false })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                <Icon
                                                    active
                                                    name="eye-with-line"
                                                    type='entypo'
                                                    color={'#ffffff70'}
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ showBalance: true })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
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

                                        {this.state.showBalance ?
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN {this.state.balance}</Text>
                                            :
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                                        }

                                    </View>
                                    <View style={styles.card_part_three}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>Ledger Balance</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#fff', width: 2, marginRight: 10 }} />
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            {this.state.showBalance ?
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN {this.state.ledger_balance}</Text>
                                                :
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN *****</Text>
                                            }

                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>

                        </View>
                       <View style={{}}>
                       <Text style={{marginLeft:30, marginTop:40,  marginRight:25, fontSize:14, color:color.button_blue, fontFamily: 'Montserrat-Bold'}}>Where would you like to top from?</Text>
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('top_bank_d')} style={{ flexDirection: 'row',borderRadius:15, padding:15, marginTop: 20,  marginLeft: 25, marginRight:25, backgroundColor: color.grey }}>
                       <Text style={{flex:1, fontSize:14, color:color.button_blue, fontFamily: 'Montserrat-Bold'}}>Bank</Text>
                            <Icon
                                name="bank"
                                size={20}
                                type='font-awesome'
                                color={color.button_blue}
                            />
                        </TouchableOpacity>



                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('qrsetting')}  style={{ flexDirection: 'row',borderRadius:15, padding:15, marginTop: 20,  marginLeft: 25, marginRight:25, backgroundColor: color.grey }}>
                          <Text style={{flex:1, fontSize:14, color:color.button_blue, fontFamily: 'Montserrat-Bold'}}>Other Wallets</Text>
                            <Icon
                                 name="wallet"
                                 type='simple-line-icon'
                                size={20}
                                color={color.button_blue}
                            />
                        </TouchableOpacity>

                       </View>



                    </View>



                </View>




            </ImageBackground>
        );
    }

}
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
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
    },

    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 15,
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30
    },
    card_body: {
        backgroundColor: 'green',
        borderRadius: 10,
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
        marginLeft: 20,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 20,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    tiles_container: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    tile_body: {
        backgroundColor: 'green',
        borderRadius: 10,
        flexDirection: 'row',
    },

    list_container: {
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 75

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



});



