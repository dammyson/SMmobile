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



export default class Wallet extends Component {
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
            showBitBalance:true,
            balance: 0,
            auth: '',
            type: '',
            ledger_balance: 0,
            title: 'false'
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

            <View style={styles.backgroundImage}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}>

                    </View>

                    <View style={{flexDirection:'row', paddingLeft:20,  width: Dimensions.get('window').width, }}>
                   
                                <TouchableOpacity onPress={() =>this.props.navigation.goBack()} >
                                    <Icon
                                        name="arrowleft"
                                        size={30}
                                        type='antdesign'
                                        color={color.primary_color}
                                    />
                                </TouchableOpacity>
                                <View style={{justifyContent:'center',  flex: 1, alignItems:'center'}}>
                                <Text style={styles.title}>Wallets</Text>

                                </View>

                                <View style={{width:35}}>
                                  
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

                            {this.soon()}




                        </View>

                    </PTRView>

                </View>





            </View>
        );
    }


    soon(){
        return(<>
        
        <View style={styles.card_container}>
                                <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#4C46E9', '#2D2C71']} style={styles.card_body} >
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
                                            <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}> Business Wallet</Text>
                                            {this.state.showBusBalance ?
                                                <TouchableOpacity onPress={() => this.setState({showBusBalance: false})} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                    <Icon
                                                        active
                                                        name="eye-with-line"
                                                        type='entypo'
                                                        color={'#ffffff70'}
                                                        size={20}
                                                    />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={() => this.setState({showBusBalance: true})}  style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
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
                                        <View style={[styles.card_part_two, {marginBottom:10}]}>

                                        {this.state.showBusBalance ?
                                          <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN {this.state.balance}</Text>
                                        :
                                          <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                                        }
                                        </View>
                                    </View>
                                </LinearGradient>

                            </View>



                            <View style={styles.card_container}>
                                <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#FFC107', '#EF9C00']} style={styles.card_body} >
                                    <View style={styles.currency_container}>
                                        <View style={{ marginLeft: 10, padding: 6, backgroundColor: '#ffffff20', justifyContent: 'center', borderRadius: 40, marginBottom: 5 }}>
                                            <Icon
                                                name="bitcoin"
                                                type='font-awesome'
                                                size={18}
                                                color={color.white}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.detatails_container}>
                                        <View style={styles.card_part_one}>
                                            <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}> Bitcoin Wallet</Text>
                                            {this.state.showBitBalance ?
                                                <TouchableOpacity onPress={() => this.setState({showBitBalance: false})} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                    <Icon
                                                        active
                                                        name="eye-with-line"
                                                        type='entypo'
                                                        color={'#ffffff70'}
                                                        size={20}
                                                    />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={() => this.setState({showBitBalance: true})}  style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
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

                                        {this.state.showBitBalance ?
                                          <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN BTC 0.0000</Text>
                                        :
                                          <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                                        }
                                        </View>
                                        <View style={styles.card_part_three}>
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>$9671.1338</Text>
                                            </View>
                                           
                                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                           
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN *****</Text>
    
                                              
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>

                            </View>




        </>)
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
        marginTop:20
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
    card_container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop:20
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
  




});



