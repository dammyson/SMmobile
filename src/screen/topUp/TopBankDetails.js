// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, TextInput, Dimensions, StyleSheet,Clipboard, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Button, Toast} from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';
import { getToken, getWallet, processResponse } from '../../utilities';

import color from '../../component/color'


export default class TopBankDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            view_balance: false,
            wallet: '',
            data: '',
            showBalance: true,
            balance: 0,
            auth: '',
            details: ''
        };
    }



    async componentWillMount() {
        const bank_account = JSON.parse(await getWallet())
        console.warn(bank_account);
        this.setState({ details: bank_account})

       

    }





    render() {
        const { details, } = this.state
        console.warn(details);

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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={color.primary_color}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>Bank</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>
                    <View style={styles.mainbody}>
                        <View style={styles.card_container}>


                        </View>
                        <View style={{}}>
                            <Text style={{ marginLeft: 30, marginTop: 40, marginRight: 25, fontSize: 14, color: "#3E3E3E90", fontFamily: 'Montserrat-Bold' }}>Make a transfer to this account to top
up your sendmonny wallet anytime?</Text>
                            <View style={{ borderRadius: 15, padding: 15, marginTop: 20, marginLeft: 25, marginRight: 25, backgroundColor: color.grey }}>

                                <View style={{ marginTop: 20, }}>
                                    <Text style={{ fontSize: 10, color: '#0F0E43', opacity: 0.4, fontFamily: 'Poppins-Regular' }}>Account Name </Text>
                                    <Text style={{ fontSize: 12, color: '#0F0E43', opacity: 0.9, fontFamily: 'Poppins-SemiBold' }}>{details.account_name}</Text>
                                </View>


                                <View style={{ marginTop: 20, }}>
                                    <Text style={{ fontSize: 10, color: '#0F0E43', opacity: 0.4, fontFamily: 'Poppins-Regular' }}>Bank Name</Text>
                                    <Text style={{ fontSize: 12, color: '#0F0E43', opacity: 0.9, fontFamily: 'Poppins-SemiBold' }}>{details.bank}</Text>
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 10, color: '#0F0E43', opacity: 0.4, fontFamily: 'Poppins-Regular' }}>Account Number </Text>
                                        <Text style={{ fontSize: 12, color: '#0F0E43', opacity: 0.9, fontFamily: 'Poppins-SemiBold' }}>{details.account_number}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.handlerLongClick(details.beneficiary_account_number)} style={{padding:3 , justifyContent:'flex-end'}}>
                                        <Icon
                                            name="copy"
                                            size={20}
                                            type='feather'
                                            color={'#0F0E43'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={{ marginLeft: 30, marginTop: 40, marginRight: 25, fontSize: 14, color: "#3E3E3E90", fontFamily: 'Montserrat-Bold' }}>Please note that this account is
unique for your top up payment.</Text>
                        </View>



                    </View>



                </View>




            </ImageBackground>
        );
    }




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



