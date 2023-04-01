import React, { Component } from "react";
import { Alert, Dimensions, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, StatusBar, ImageBackground, } from "react-native";
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, ListItem, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
const deviceHeight = Dimensions.get("window").height;
import URL from '../../component/server'
import RNPaystack from 'react-native-paystack';
import {  getPaystackKey } from '../../component/env';

 RNPaystack.init({ publicKey:  getPaystackKey() });


import color from '../../component/color';
import { CreditCardInput } from "react-native-credit-card-input";
import {
    PulseIndicator,
} from 'react-native-indicators';

import Navbar from '../../component/Navbar';
import colors from "../../component/color";



export default class FundWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: '',
            wallet: '',
            id: '',
            details: {},
            cardDetails: null,
            pay: false,
            amount: 0,
            done: false,
            failed: false,
            auth: '',
            cv: '',
            ex: '',
            cn: ''


        };
    }



    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })

            }
        })

        AsyncStorage.getItem('wallet').then((value) => {
            if (value == '') { } else {
                this.setState({ wallet: JSON.parse(value) })
            }

        })

        AsyncStorage.getItem('auth').then((value) => {
            if (value == '') { } else {
                this.setState({ auth: value })
            }
            console.warn(value)
        })

    }

    processFundWallet(response) {
        const { auth, wallet, amount } = this.state
        this.setState({ loading: true })


        const formData = new FormData();
        formData.append('wallet_id', wallet.id);
        formData.append('amount', amount);
        formData.append('transaction_reference', this.makeid(9));
        formData.append('payload', '{}');
        formData.append('transaction_status', 1);

        fetch(URL.urltwo + '/wallet/cardtopup', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res);
                if (res.message == 'Top up was successful') {
                    this.setState({
                        loading: false,
                        pay: false,
                        done: true
                    })

                } else {
                    Alert.alert('Process failed', res.message, [{ text: 'Okay' }])
                    this.setState({ loading: false })
                }
            }).catch((error) => {
                console.warn(error);
                this.setState({ loading: false, pay: false, })
                alert(error.message);
            });
    }
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    chargeCard() {

        const { cn, ex, cv, amount, data } = this.state

        var card_lenghts = [16, 17, 18, 19, 20];
        if (!card_lenghts.includes(cn.length)) {
            Alert.alert('Operation failed', 'Invalide card number, remove spaces if present', [{ text: 'Okay' }])
            return
        }


        if (!ex.includes('/')) {
            Alert.alert('Operation failed', 'Invalide Expiry date', [{ text: 'Okay' }])
            return
        }
        if (cv.length != 3) {
            Alert.alert('Operation failed', 'Invalide card cvv', [{ text: 'Okay' }])
            return
        }
        if (data.email == null || data.email == '') {
            var email = "tech@paychange.com"
        } else {
            var email = data.email
        }

        var res = ex.split("/");
        this.setState({ loading: true })
        RNPaystack.chargeCard({
            cardNumber: cn,
            expiryMonth: res[0],
            expiryYear: res[1],
            cvc: cv,
            email: email,
            amountInKobo: amount * 100,
        })
            .then(response => {
                console.warn(response); // card charged successfully, get reference here
                this.processFundWallet(response)
            })
            .catch(error => {
                this.setState({ loading: false })
                console.warn(error);
                Alert.alert('Process failed', error.message, [{ text: 'Okay' }])// error is a javascript Error object
            })

    }

    _onChange = (formData) => {
        this.setState({ cardDetails: formData })
    };
    _onFocus = (field) => console.log("focusing", field);



    displayCard() {

        const { amount } = this.state
        if (amount < 500) {
            Alert.alert('Operation failed', 'Sorry you can not top up walet with ₦' + amount + " the minimum is ₦500", [{ text: 'Okay' }])
        } else {
            this.setState({ pay: true })
        }

    }


    handleChange = (text) => {

        let textTemp = text;
        if (textTemp[0] !== '1' && textTemp[0] !== '0') {
            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (this.state.ex.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({ ex: textTemp })
    }


    render() {

        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() =>this.props.navigation.goBack()}>
                    <Icon
                        active
                        name="ios-arrow-back"
                        type='ionicon'
                        color='#FFF'
                    />
                </Button>
            </Left>
        );

        var right = (
            <Right style={{ flex: 1 }}>
                <Button transparent onPress={() =>this.props.navigation.goBack()}>
                    <Icon
                        active
                        name="md-more"
                        type='ionicon'
                        color='#FFF'
                    />
                </Button>
            </Right>
        );
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


        if (this.state.done) {
            return (
                <View style={{ flex: 1, backgroundColor: 'green', }}>
                    <View style={{ flex: 1, }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: 23, fontWeight: '900' }}>Successful </Text>

                        <Icon
                            name="check-square-o"
                            size={90}
                            type='font-awesome'
                            color="#fff"
                        />

                    </View>
                    <View style={{ flex: 1, }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }}> </Text>



                        <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '500' }}>Your Top Up of ₦{this.state.amount}  was successful </Text>
                        <Button onPress={() => [ this.props.navigation.navigate('home')]} style={styles.successModalbuttonContainer} block iconLeft>
                            <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Continue </Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1, }}>
                    </View>

                </View>
            );
        }


        if (this.state.failed) {
            return (
                <View style={{ flex: 1, backgroundColor: 'red', }}>
                    <View style={{ flex: 1, }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: 23, fontWeight: '900' }}>Unsuccessful </Text>

                        <Icon
                            name="window-close-o"
                            size={90}
                            type='font-awesome'
                            color="#fff"
                        />

                    </View>
                    <View style={{ flex: 1, }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }}> </Text>



                        <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '500' }}>Your Top Up of   ₦{this.state.amount}  was unsuccessful </Text>
                        <Button onPress={() => [this.props.navigation.navigate('home')]} style={styles.successModalbuttonContainer} block iconLeft>
                            <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Continue </Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1, }}>
                    </View>

                </View>
            );
        }

        return (
            <ImageBackground
                source={require('../../assets/user_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover">

                <Container style={{ backgroundColor: 'transparent' }}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />

                    <Content>
                        <View style={styles.container}>
                            <View style={{ height: 90, alignItems: 'center', justifyContent: 'center' }}>


                                <View style={styles.avarterContainer}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity style={styles.arrowContainer} onPress={() => {
                                          this.props.navigation.goBack()
                                        }}>
                                            <Icon
                                                name="arrowleft"
                                                size={30}
                                                type='antdesign'
                                                color={color.primary_color}
                                            />

                                        </TouchableOpacity>

                                        <View style={{ alignItems: 'center', flex: 1 }}>
                                            <Text style={styles.title}>Card Payment:</Text>
                                        </View>
                                        <View style={{ width: 40 }}></View>

                                    </View>


                                </View>
                            </View>
                            {this.state.pay ?
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ color: colors.button_blue, fontWeight: "400", fontSize: 14, marginLeft: 30, marginRight: 20, marginBottom: 20 }}>Enter card detail to fund your walet</Text>
                                    <View style={{}}>

                                        <View style={[styles.inputTextView]}>
                                            <TextInput
                                                placeholder="CARD NUMBER"
                                                placeholderTextColor={'arsh'}
                                                returnKeyType="next"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='numeric'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ paddingLeft: 15, marginLeftt: 20, flex: 1, fontWeight: '600', fontSize: 16, color: color.button_blue, }}
                                                onChangeText={text => this.setState({ cn: text })}
                                            />

                                        </View>



                                        <View style={[styles.inputTextView, { flexDirection: 'row', alignItems: 'center' }]}>
                                            <TextInput
                                                placeholder="EXP"
                                                placeholderTextColor={'arsh'}
                                                returnKeyType="next"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='numeric'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ paddingLeft: 15, marginLeftt: 20, flex: 1, fontWeight: '600', fontSize: 16, color: color.button_blue, }}
                                                onChangeText={this.handleChange}
                                                defaultValue={this.state.ex}
                                                maxLength={5}
                                            />
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: colors.button_blue, fontWeight: "400", fontSize: 14, marginRight: 20, }}>MM/YY</Text>
                                            </View>
                                        </View>



                                        <View style={[styles.inputTextView, { flexDirection: 'row', alignItems: 'center' }]}>
                                            <TextInput
                                                placeholder="CVV"
                                                placeholderTextColor={'arsh'}
                                                returnKeyType="next"
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='numeric'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ paddingLeft: 15, marginLeftt: 20, flex: 1, fontWeight: '600', fontSize: 16, color: color.button_blue, }}
                                                onChangeText={text => this.setState({ cv: text })}
                                            />
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: colors.button_blue, fontWeight: "400", fontSize: 14, marginRight: 20, }}>CVV</Text>
                                            </View>

                                        </View>


                                    </View>



                                    <TouchableOpacity onPress={() => this.chargeCard()} style={styles.enablebutton} block iconLeft>
                                        <Text style={{ color: "#fff", marginTop: 10, marginBottom: 15, fontSize: 16, fontWeight: '400', }}>PAY ₦{this.state.amount}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ pay: false })} style={[styles.enablebutton, { marginTop: 8 }]} block iconLeft>
                                        <Text style={{ color: "#fff", marginTop: 10, marginBottom: 15, fontSize: 16, fontWeight: '400', }}>Change amount</Text>
                                    </TouchableOpacity>

                                </View>

                                :

                                <View style={{ marginTop: 20 }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ color: colors.button_blue, fontSize: 14, marginLeft: 30, marginRight: 20, opacity: 0.77 }}>Enter amount to fund your walet</Text>
                                        <View style={[styles.inputTextView]}>
                                            <TextInput
                                                placeholder="₦5000"
                                                placeholderTextColor={'arsh'}
                                                returnKeyType="next"
                                                defaultValue={this.state.amount}
                                                onSubmitEditing={() => this.passwordInput.focus()}
                                                keyboardType='numeric'
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                inlineImageLeft='ios-call'
                                                style={{ paddingLeft: 15, marginLeftt: 20, flex: 1, fontWeight: '600', fontSize: 16, color: color.button_blue, }}
                                                onChangeText={text => this.setState({ amount: text })}
                                            />

                                        </View>

                                    </View>

                                    <TouchableOpacity onPress={() => this.displayCard()} style={[styles.enablebutton, { marginTop: 20 }]} block iconLeft>
                                        <Text style={{ color: "#fff", marginTop: 10, marginBottom: 15, fontSize: 16, fontWeight: '500', }}>PAY ₦{this.state.amount}</Text>
                                    </TouchableOpacity>

                                </View>

                            }



                        </View>


                    </Content>
                </Container>
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
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,

    },
    iconContainer: {
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    title: {
        marginTop: 22,
        color: '#fff',
        fontSize: 16,

    },
    headings: {
        marginTop: 22,
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },
    lineStyle: {
        height: 0.8,
        marginTop: 20,
        opacity: 0.5,
        backgroundColor: '#fff',

    },
    map: {
        height: 100,
        marginTop: 15
    },
    welcome: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    enablebutton: {
        alignItems: 'center',
        alignContent: 'space-around',
        paddingLeft: 53,
        paddingRight: 53,
        backgroundColor: color.button_blue,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 15,
    },
    inputTextView: {
        marginLeft: 30,
        marginRight: 30,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderColor: color.button_blue,
        borderWidth: 1,
        borderRadius: 5,
    },
    label: {
        color: "white",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
        borderBottomColor: 'red',
        borderBottomWidth: 1
    },
    successModalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
    },
    payButtonContainer: {
        paddingTop: 20,

    },

    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        fontWeight: '800',
        fontFamily: 'Montserrat'
    },



    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',

        marginLeft: 20,
    },
});


