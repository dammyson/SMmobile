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
import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'
import { MaterialCommunityIcons } from 'react-native-elements';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import Complete from '../../component/view/Complete';
import { baseUrl, getToken, getUser, getWallet, storeWallet } from '../../utilities';




export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            loading: true,
            view_balance: false,
            data: '',
            showBalance: true,
            balance: 0,
            auth: '',
            type: '',
            ledger_balance: 0,
            title: 'false',
            wallet: ''
        };
    }




    async componentDidMount() {
        this.setState({
            auth: await getToken(),
            data: JSON.parse(await getUser()),
        })
        this.getWalletRequest()
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
                this.setState({ loading: false })
                storeWallet(JSON.stringify(res.data))
                // AsyncStorage.setItem('wallet', JSON.stringify(res.data));
                // if (res.data.preferences == null || res.data.preferences == 'null' || res.data.preferences == '') {
                //     AsyncStorage.setItem('wallet_pre', 'null');
                // }else{
                //     console.warn(res.data.preferences.auto_withdrawal)
                //     AsyncStorage.setItem('wallet_pre', res.data.preferences.auto_withdrawal);
                // }

                this.setState({
                    balance: res.data.balance.data.currentBalance,
                    ledger_balance: res.data.balance.data.availableBalance,
                    loading: false,
                    wallet: res.data
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


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
    async topAction() {
            this.props.navigation.navigate('user_top')
    }


    _refresh = () => {
        return new Promise((resolve) => {
            this.getWalletRequest()
        });
    }

    updateAccount() {
        const { auth, wallet, } = this.state

        this.setState({ loading: true })

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
                this.getWalletRequest()
            })
            .catch((error) => {
                console.warn(error.message);
                this.setState({ loading: false })
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
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" />
                    <View style={styles.body}>
                        <View style={{ height: 20 }}>

                        </View>
                        <View style={styles.avarterContainer}>

                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={() => this.handlerLongClick(this.state.data.user_id)}>
                                        <Text style={[styles.title]}>Hello, {this.state.data.user_id}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1 }}></View>
                                <LinearGradient style={{ borderRadius: 5, }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4C46E9', '#2D2C71']}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 7, borderRadius: 5 }} onPress={() => this.props.navigation.navigate('qrsetting')}>
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
                        <PTRView onRefresh={this._refresh} >
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
                                                <View style={{ backgroundColor: '#ffffff50', width: 1, marginRight: 10 }} />
                                                <View style={{ flex: 1, justifyContent: 'flex-end', }}>
                                                    {this.state.showBalance ?
                                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, textAlign: 'right' }}>NGN {this.state.ledger_balance}</Text>
                                                        :
                                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, textAlign: 'right' }}>NGN *****</Text>
                                                    }

                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>

                                </View>
                                {this.renderTiles()}
                                <View style={{ backgroundColor: '#0F0E43', height: 0.3, marginTop: 20, opacity: 0.3, marginHorizontal: 28 }} />
                                {this.renderList()}
                            </View>
                        </PTRView>
                    </View>
                </View>
                {this.state.visible ? this.renderComplete() : null}
            </>
        );
    }

    renderComplete() {
        return (
            <Complete
                onComplete={() => this.onComplete()}
                onBack={() => this.setState({ visible: false })} />
        )
    }

    onComplete() {
        this.setState({ visible: false })
        this.getWalletRequest()
    }



    async goToPage(route) {
        // if (await this.checkVitualAccount()) {
        //     this.props.navigation.navigate(route)
        // } else {
        //     this.setState({
        //         visible: true,
        //     })
        // }
    }

    async goToScan() {
            this.props.navigation.navigate('scan', { operation: 'pay' })
    }

    renderTiles() {
        return (

            <View style={styles.tiles_container}>

                <TouchableOpacity onPress={() => this.goToPage('NW')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
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

                <TouchableOpacity onPress={() => this.goToPage('bill')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
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

                <TouchableOpacity onPress={() => this.goToPage('giveaway_h')} style={{ justifyContent: 'center', alignItems: 'center',flex:1 }} >
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
                <TouchableOpacity onPress={() => this.goToPage('transfer')} style={{ justifyContent: 'center', alignItems: 'center', flex:1 }} >
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




    renderList() {
        return (
            <View style={styles.list_container} >
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => this.goToScan()} style={{ flexDirection: 'row', marginTop: 5, valueOf, marginBottom: 8, backgroundColor: '#D2D1F2', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }} >
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
                    <TouchableOpacity onPress={() => this.topAction()} style={{ flexDirection: 'row', marginTop: 10, valueOf, marginBottom: 8, backgroundColor: '#FFC10740', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }} >
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
              
                    <TouchableOpacity onPress={() => this.handleMybank()} style={{ flexDirection: 'row', marginTop: 10, valueOf, marginBottom: 8, backgroundColor: '#D5D4E2', borderRadius: 5, paddingLeft: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 10, }} >
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

    async handleMybank() {
        if (await this.checkAccount()) {
            this.props.navigation.navigate('selbank')
        } else {
            this.props.navigation.navigate('addbank')
        }
    }

    async checkAccount() {
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
        backgroundColor: '#fff'
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



