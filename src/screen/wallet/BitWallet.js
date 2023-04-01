// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import ActivityIndicator from '../../component/view/ActivityIndicator';

import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'

import { DigitalBalanceCard, VirtualBalanceCard } from '../../component/view/';
import NoCryptoWallet from '../../component/view/NoCryptoWallet';

export default class BitWallet extends Component {
    constructor(props) {
        super(props);
        this.refreshWalletRequest = this.refreshWalletRequest.bind(this);
        this.state = {
            items: [],
            visible: false,
            loading: true,
            view_balance: false,
            data: '',
            showBalance: true,
            showBusBalance: true,
            showBitBalance: true,
            balance: 0,
            auth: '',
            type: '',
            ledger_balance: 0,
            title: 'false',
            no_wallet: false
        };
    }


    componentWillMount() {


        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }

        })

        AsyncStorage.getItem('auth').then((value) => {
            if (value == '') { } else {
                this.setState({ auth: value })
            }
            this.getWalletRequest()
        })

        AsyncStorage.getItem('type').then((value) => {
            if (value == '') { } else {
                this.setState({ type: value })
            }

        })


    }



    componentWillReceiveProps() {

        this.setState({ title: this.props.test });

    }
    hideBallance() {
        if (this.state.showBalance) {
            this.setState({ showBalance: false })
        } else {
            this.setState({ showBalance: true })
        }
    }
    getWalletRequest() {
        const { auth } = this.state
        console.warn(URL.urltwo)

        this.setState({ loading: true });
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
                    balance: res.data.balance,
                    ledger_balance: res.data.ledger_balance,
                    loading: false
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


    };




    refreshWalletRequest() {


    };

    handlerLongClick(info) {
        Clipboard.setString(info)
        Toast.show({
            text: 'Text copied to clipboard !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

    };

    processResponse(response) {
        const statusCode = response.status;
        console.warn(response);
        ///const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    payAction() {
        this.props.navigation.navigate('scan')
    }
    topAction() {

        if (this.state.type == 'merchant') {
            this.props.navigation.navigate('bwallet')
        } else {
            this.props.navigation.navigate('user_top')
        }
    }

    _refresh = () => {
        return new Promise((resolve) => {
            fetch(URL.urltwo + '/wallet', {
                method: 'GET', headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + this.state.auth,
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    AsyncStorage.setItem('wallet', JSON.stringify(res.data));
                    this.setState({
                        balance: res.data.balance,
                        ledger_balance: res.data.ledger_balance
                    })
                    resolve()
                })
                .catch(error => {
                    alert(error.message);

                });

            //  setTimeout(()=>{resolve()}, 2000)
        });
    }



    render() {
        if (this.state.loading) {
            return (

                <ActivityIndicator />
            );
        }
        return (
<>
            <View style={styles.backgroundImage}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}>

                    </View>

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
                            <Text style={styles.title}>Bitcoin</Text>

                        </View>

                        <View style={{ width: 35 }}>

                        </View>


                    </View>

                    <PTRView onRefresh={this._refresh} >
                        <View style={styles.mainbody}>

                            <VirtualBalanceCard
                                name={'Naira Balance'}
                                balance={this.state.balance}
                                ledger_label={'Ledger Balance'}
                                ledger_balance={this.state.ledger_balance}
                                currency={'NGN'}
                                theme={['#3AA34E', '#005A11']}
                            />

                            <DigitalBalanceCard
                                name={'BTC Balance'}
                                balance={this.state.balance}
                                digitabalance={this.state.balance}
                                ledger_label={'$9671.1338'}
                                ledger_balance={this.state.ledger_balance}
                                currency={'BTC'}
                                theme={['#FFC107', '#EF9D00']}
                                ledger={() => this.soon()}
                                logo = {'#F7931A'}
                            />



                            <View style={{ marginTop: 10 }}>
                                <View style={{ backgroundColor: "#00000020", height: 1, marginTop: 20, marginBottom: 10, marginHorizontal: 20 }} />
                                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { flex: 1, }]} block iconLeft>
                                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('bitwithdraw')} >
                                            <Icon
                                                name="cash"
                                                size={20}
                                                type='material-community'
                                                color={color.white}
                                            />
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 14, marginLeft: 10 }}>Withdraw</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>


                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EFF2F5', '#EFF2F5']} style={[styles.buttonContainer, { flex: 1, }]} block iconLeft>
                                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('bitaddress')} >
                                            <Icon
                                                name="location-pin"
                                                size={20}
                                                type='entypo'
                                                color={color.button_blue}
                                            />
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.button_blue, fontSize: 14, marginLeft: 10 }}>Show address </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>

                                <View style={{ backgroundColor: "#00000020", height: 1, marginTop: 20, marginHorizontal: 20, marginBottom: 10, }} />

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EFF2F5', '#EFF2F5']} style={[styles.buttonContainer, { flex: 1, }]} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingRight: 20 }} onPress={() => this.props.navigation.navigate('buybitcoin')} >
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: color.button_blue, fontSize: 14, flex: 1, marginLeft: 20 }}> Exchange  Bitcoin</Text>

                                        <Image
                                            style={{ height: 30, width: 30 }}
                                            source={require('../../assets/exbit.png')}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>

                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EFF2F5', '#EFF2F5']} style={[styles.buttonContainer, { flex: 1, marginTop: 20 }]} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingRight: 20 }} onPress={() => this.props.navigation.navigate('receivebitcoin')} >
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: color.button_blue, fontSize: 14, flex: 1, marginLeft: 20 }}>Send or receive </Text>

                                        <Image
                                            style={{ height: 30, width: 30 }}
                                            source={require('../../assets/sendreceive.png')}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </PTRView>
                </View>
            </View>
            {this.state.no_wallet ? this.renderNoCryptoWallet() : null}
            </>
        );
    }


    soon() {
        return (
            <View style={{ marginTop: -15, }}>


                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', }}>
                   
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 10, }}>  {"+ 0.36% "} </Text>

                </View>

            </View>)
    }


    renderNoCryptoWallet() {

        return (
            <NoCryptoWallet
                OnAccept={(v) => this._handleAcecpt()}
                OnReject={() => this.setState({ terms: false })} />
        )
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        width: Dimensions.get('window').width,
        marginLeft: 30,
        marginRight: 30,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,

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
    buttonContainer: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
    },



});



