// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'
import { getToken, getCrypTems } from '../../component/utilities';
import CryptoSoon from '../../component/view/CryptoSoon';
import colors from '../../component/color';
import CryptoTerms from '../../component/view/CryptoTerms';



export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            terms: false,
            comming: false,
            items: [],
            qty: 10,
            amount: 10,
            balance: 0,
            code: [],
            crp_terms: "no"
        };
    }


    async componentWillMount() {
        this.setState({ auth: await getToken(), crp_terms: await getCrypTems() })
        console.warn(await getCrypTems())

    }





    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.donate()}
                </Content>
                {this.state.comming ? this._cryto() : null}
                {this.state.terms ? this.renderTerms() : null}
            </Container>
        );
    }


    select(destination) {
        if (this.state.crp_terms != "yes") {
            this.setState({ terms: true })
        } else {
            this.props.navigation.navigate(destination)
        }
    }

    donate() {
        return (
            <View style={styles.backgroundImage}>
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
                            <Text style={styles.title}>Digital Exchange </Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>


                    <View style={styles.mainbody}>

                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => this.select('bitcoinhome')}
                                style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8, backgroundColor: colors.btc_bg, borderRadius: 5, }} >

                                <View style={{ margin: 25 }}>
                                    <Image
                                        source={require('../../assets/btc.png')}
                                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 3, flex: 1, }}>
                                    <Text style={{ color: color.btc_primary, fontFamily: 'Poppins-Bold', fontSize: 16, }}> Bitcoin</Text>
                                </View>

                                <View style={{ width: 75 }}>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('mdonate')}
                                style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8, backgroundColor: colors.pm_primary + '30', borderRadius: 5, }} >

                                <View style={{ margin: 25 }}>
                                    <Image
                                        source={require('../../assets/pm.png')}
                                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 3, flex: 1, }}>
                                    <Text style={{ color: color.pm_primary, fontFamily: 'Poppins-Bold', fontSize: 16, }}> Perfect Money </Text>
                                </View>

                                <View style={{ width: 75 }}>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('mdonate')}
                                style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8, backgroundColor: colors.uc_primary + '30', borderRadius: 5, }} >

                                <View style={{ margin: 25 }}>
                                    <Image
                                        source={require('../../assets/ucoin.png')}
                                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 3, flex: 1, }}>
                                    <Text style={{ color: color.uc_primary, fontFamily: 'Poppins-Bold', fontSize: 16, }}> USD Coin </Text>
                                </View>

                                <View style={{ width: 75 }}>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('mdonate')}
                                style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8, backgroundColor: colors.et_primary + '30', borderRadius: 5, }} >

                                <View style={{ margin: 25 }}>
                                    <Image
                                        source={require('../../assets/etm.png')}
                                        style={{ height: 45, width: 45, resizeMode: 'contain' }}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 3, flex: 1, }}>
                                    <Text style={{ color: color.et_primary, fontFamily: 'Poppins-Bold', fontSize: 16, }}> Ethereum </Text>
                                </View>

                                <View style={{ width: 75 }}>
                                </View>
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>
            </View>
        )
    }


    _cryto() {
        return (
            <CryptoSoon
                onCancel={() => this.props.navigation.goBack()}
                onPress={() => this.props.navigation.goBack()}
            />
        );
    }

    renderTerms() {

        return (
            <CryptoTerms
                OnAccept={(v) => this._handleAcecpt()}
                OnReject={() => this.setState({ terms: false })} />
        )
    }

    _handleAcecpt() {
        AsyncStorage.setItem('crpterm', 'yes');
        this.setState({ terms: false })
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
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        paddingBottom: 50,
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



