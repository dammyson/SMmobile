import React, { Component } from "react";
import { Alert, Dimensions, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, StatusBar, ImageBackground, } from "react-native";
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, ListItem, } from 'native-base';
import { Avatar, Icon, } from 'react-native-elements';
import { getToken, getData, getWallet } from '../../component/utilities';
const deviceHeight = Dimensions.get("window").height;
import URL from '../../component/server'
import { makeOrderId } from '../../component/utilities';
import { getPaystackKey, getFluterKey } from '../../component/env';

import color from '../../component/color';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import {
    PulseIndicator,
} from 'react-native-indicators';


import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
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
            cn: '',
            email: "Voecmanager@yahoo.com",
            operation_message:''


        };
    }



    async componentDidMount() {
        this.setState({
            auth: await getToken(),
            data: JSON.parse(await getData()),
            wallet: JSON.parse(await getWallet())
        })

        console.warn(JSON.parse(await getData()).email)

    }

    onSuccess = (data) => {
      

    }

    onFailure(data) {
        console.warn("error 3", data);
    }
    onClose(data) {
        console.warn("error", data);
    }

    onRedirect = (data) => {
        console.warn(data);
        if(data.status=='cancelled'){
            this.setState({ pay: false })
        }else{
            this.processFundWallet(data)
        }
       

    }

    processFundWallet(response) {
        const { auth, wallet, amount } = this.state
        this.setState({ loading: true })


        const formData = new FormData();
        formData.append('wallet_id', wallet.id);
        formData.append('amount', amount);
        formData.append('transaction_reference', response.transaction_id);
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
                        done: true,
                        operation_message: 'Top up was successful'
                    })

                } else {
                    Alert.alert('Process failed', res.message, [{ text: 'Okay' }])
                    this.setState({ loading: false, failed:true,  operation_message: 'Top up failed' })
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




    displayCard() {

        const { amount } = this.state
        if (amount < 50) {
            Alert.alert('Operation failed', 'Sorry you can not top up walet with ₦' + amount + " the minimum is ₦500", [{ text: 'Okay' }])
        } else {
            this.setState({ pay: true })
        }

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

                    <Container style={{ backgroundColor: '#fff' }}>
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
                                    {this.state.pay ? 
                                    this.renderPay() : 
                                    <TouchableOpacity onPress={() => this.displayCard()} style={[styles.enablebutton, { marginTop: 20 }]} block iconLeft>
                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: '500', }}>PAY ₦{this.state.amount}</Text>
                                    </TouchableOpacity>
                                    }
                                </View>
                            </View>


                        </Content>
                        {this.state.done ? this.success() : null}
                        {this.state.failed ? this.error() : null}
                    </Container>

        );

    }
    renderPay() {
        const { data, amount } = this.state
        console.warn(data);
        var email ='';
        if(data.email == null || data.email == ''){
            email = 'tech@paychange.ng'
        }else{
           
             email = data.email
        }
        return (
            <>
                <View style={{ marginRight: 30, marginTop: 20, marginLeft: 30 }}>
                    <PayWithFlutterwave
                        onComplete={()=>this.onSuccess()}
                        onRedirect={(params) => this.onRedirect(params)}
                        options={{
                            tx_ref: makeOrderId(8),
                            redirect_url: 'https://www.google.com/',
                            authorization: 'FLWSECK-e50f070e948d68d84143abcae215fdad-X',
                            customer: {
                                email: 'tech@paychange.ng'
                            },
                            amount: amount,
                            currency: 'NGN',
                            payment_options: 'card'
                        }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.setState({ pay: false })} style={[styles.enablebutton, { marginTop: 20 }]} block iconLeft>
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: '500', }}>Change amount</Text>
                </TouchableOpacity>
            </>

        )
    }

    onPress() {
        this.props.navigation.replace('home')
    }
    success() {
        return (
            <Success
                onPress={() => this.onPress()}
                name={'Ayobami Ayeni'}
                message={this.state.operation_message}
            />

        );
    }

    error() {
        return (
            <Error
                onPress={() => this.onPress()}
                name={'Ayobami Ayeni'}
                message={this.state.operation_message} />
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 53,
        paddingRight: 53,
        backgroundColor: color.button_blue,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 15,
        height: 55,
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

