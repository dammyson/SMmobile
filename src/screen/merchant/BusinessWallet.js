// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';

import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';


import color from '../../component/color'


export default class BusinessWallet extends Component {
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
            this.getWalletRequest(value)
        })

    }
    hideBallance() {
        if (this.state.showBalance) {
            this.setState({ showBalance: false })
        } else {
            this.setState({ showBalance: true })
        }
    }
    getWalletRequest(auth) {

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
                    loading: false
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
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
                                <Text style={styles.title}>ID No:</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('qrsetting')
                                }}>
                                    <Text style={[styles.title, { fontWeight: '600' }]}>{this.state.data.user_id} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 40 }}></View>

                        </View>


                    </View>
                    <ImageBackground imageStyle={{ borderRadius: 20, }} source={require('../../assets/gray.png')} style={{ flex: 1, borderRadius: 15 }}>

                        <View style={styles.mainbody}>


                            <View style={{ marginBottom: 20, }} >
                                <View style={styles.cardParent}>




                                    <View style={styles.card} >

                                        <View style={{ justifyContent: 'center', }} >
                                            < Text style={{ textAlign: 'center', color: '#0F0E43', fontWeight: '400', marginTop: 30, fontSize: 14, }}>Your Wallet Balance is  </Text>
                                        </View>
                                        {this.state.showBalance ?
                                            <Text style={styles.price}>₦{this.state.balance}</Text>
                                            :
                                            <View style={{ margin: 25 }}>
                                                <Icon
                                                    active
                                                    name="wallet"
                                                    type='entypo'
                                                    color={color.button_blue}
                                                />
                                            </View>

                                        }
                                    </View>

                                </View>

                                <TouchableOpacity onPress={() => this.hideBallance()} >


                                    <Text style={{ textAlign: 'center', color: '#000', fontWeight: '400', fontSize: 13, }}>Disable Visibility</Text>

                                    <Icon
                                        active
                                        name="eye"
                                        type='entypo'
                                        color={'#9692FF'}
                                    />

                                </TouchableOpacity>


                            </View>



                            <View style={styles.payButtonContainer} >
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('scan', { operation: 'top' })} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 40, marginLeft: 40, marginBottom: 15, backgroundColor: color.primary_color, borderRadius: 10, paddingTop: 25, paddingBottom: 25, }} >

                                    <Text style={{ textAlign: 'left', color: color.white, fontFamily: 'Montserrat-ExtraBold', fontSize: 15, marginBottom: 3, }}>Top Up customer </Text>



                                </TouchableOpacity>


                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('merchant_top')} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 40, marginLeft: 40, marginBottom: 8, backgroundColor: color.light_blue, borderRadius: 10, paddingTop: 25, paddingBottom: 25, }} >

                                    <Text style={{ textAlign: 'left', color: '#fff', fontFamily: 'Montserrat-ExtraBold', fontSize: 15, marginBottom: 3, }}>Reload Wallet</Text>

                                </TouchableOpacity>
                            </View>



                        </View>

                    </ImageBackground>



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
    buttonTop: {

        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
    },


    payButtonContainer: {
        paddingTop: 20,

        marginTop: 7,
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 30,
        fontSize: 13,
        color: '#ffffff',
        textAlign: 'left',
        fontWeight: '500',
        fontFamily: 'Montserrat-Bold'
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
    avartar: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    card: {
        justifyContent: 'center',
        backgroundColor: color.white,
        alignItems: 'center',
        borderRadius: 15,
    },
    cardParent: {
        marginTop: 10,
        marginLeft: 38,
        marginRight: 38,
        borderRadius: 15,
        padding: 3,
        borderColor: '#fff',
        borderWidth: 1
    },

    price: {
        color: '#0F0E43',
        margin: 20,
        marginTop: 5,
        marginBottom: 30,
        fontSize: 30,
        fontFamily: 'Montserrat-Regular'
    },

    buttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 15,
        marginTop: 10,
    },

    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 20,
    },
});



