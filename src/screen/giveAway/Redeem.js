// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import { getToken, getWallet, processResponse } from '../../component/utilities';
import color from '../../component/color'
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Scan from '../../component/view/Scan';
import Alerts from '../../component/view/Alerts';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import GiveAwayShareReceipt from '../../component/view/GiveAwayShareReceipt';


export default class Redeem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            done: false,
            failed: false,
            items: [],
            auth: '',
            code: '',
            balance: 0,
            wallet: {},
            scan: false,
            c_alert: false,
            m_name: '',
            receipt: false,
            ismerchant: false
        };
    }


    async componentWillMount() {
        this.setState({ auth: await getToken(), wallet: JSON.parse(await getWallet()) })
    }
    redeemDonationProcess() {

        const { code, wallet, auth } = this.state
        console.warn(wallet.id);


        if (code == '') {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }

        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('wallet_id', wallet.id);
        formData.append('code', code);

        fetch(URL.urlfour + '/api/donations/claim', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                if (statusCode == 200) {
                    if (data.message == "customer need to confirm merchant identity to claim reward") {
                        this.setState({ loading: false, m_name: data.data.donor.first_name + ' ' + data.data.donor.last_name, c_alert: true, })
                    }

                }
                else if (statusCode == 201) {
                    this.setState({ loading: false, done: true, operation_message: data.message })
                } else if (statusCode == 422) {
                    this.setState({
                        loading: false,
                        visible: true
                    })
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                } else {
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });


    }

    VerifyMerchantProcess(merchant_wallet_id) {

        const { code, wallet, auth } = this.state


        this.setState({ loading: true })
        const formData = new FormData();
        formData.append('customer_wallet_id', wallet.id);
        formData.append('donor_wallet_id', merchant_wallet_id);
        formData.append('code', code);

        fetch(URL.urlfour + '/api/donations/merchant/claim', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                if (statusCode == 200) {
                    if (data.message == "customer need to confirm merchant identity to claim reward") {
                        this.setState({ loading: false, c_alert: true })
                    }

                } else if (statusCode == 201) {

                    this.setState({ loading: false, done: true, ismerchant: true, operation_message: data.message })


                } else if (statusCode == 422) {
                    this.setState({
                        loading: false,
                        visible: true
                    })
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                } else {
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
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
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    {this.state.scan ?
                        this.renderScan()
                        :
                        this.state.done ?
                            this.success()
                            :
                            this.state.failed ?
                                this.error()
                                :
                                this.redeem()}
                </Content>
                {this.state.c_alert ? this.renderAlert() : null}
                {this.state.receipt ? this.renderReciept() : null}
            </Container>
        );
    }

    redeem() {
        return (<View style={styles.backgroundImage}>
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
                        <Text style={styles.title}>Redeem</Text>
                    </View>
                    <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                </View>
                <View style={styles.mainbody}>
                    <View style={styles.Qrcontainer}>
                        <Image
                            source={require('../../assets/redeem_img.png')}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={{ textAlign: 'center', marginLeft: 30, marginRight: 30, fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 14 }}>To be a part of sendmonny covid-19 relief
fund, please enter donor code here.</Text>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Giveaway Code  </Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Enter Code "
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                maxLength={10}
                                onChangeText={text => this.setState({ code: text })}
                            />
                        </View>
                    </View>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.redeemDonationProcess()} >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Redeem</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>)
    }

    onPress() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    onPressSuccess() {
        if(this.state.ismerchant){
            this.setState({done: false, receipt: true, })
        }else{

        }
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }
    success() {
        return (
            <Success
                onPress={() => this.onPressSuccess()}
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


    ScanComplete(e) {
        this.setState({ scan: false, loading: true })
        this.VerifyMerchantProcess(e.data)
    }

    renderScan() {
        return (
            <Scan
                onClose={() => this.setState({ scan: false })}
                onScan={(e) => this.ScanComplete(e)}
            />
        );
    }

    renderAlert() {
        return (
            <Alerts
                onClose={() => this.setState({ c_alert: false })}
                onPress={() => this.setState({ c_alert: false, scan: true })}
                canclText={'cancel'}
                okText={'OK'}
                message={"You must be at " + this.state.m_name + " to redeem this giveaway"}
            />
        );
    }
    onDownload(messages) {
        Toast.show({
            text: 'Giveaway Code ' + messages + ' !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

        this.setState({ show_share: false })
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }
    onClosePress() {
        this.setState({ receipt: false })
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }
    renderReciept() {
        return (
            <GiveAwayShareReceipt
            onClose={() => this.onClosePress()}
                amount={'N 5,000'}
                mc={'Chicken Republic - Lagos, Nigeria - Ghana'}
                onShare={() => this.onDownload('shared')}
                onDownload={() => this.onDownload("saved to device")}
            />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        marginBottom: 80


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
    textInputContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
    input: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 14,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    inputBudget: {
        height: 65,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#d1d1d1',
        justifyContent: 'center',
    },
    budget: {
        marginLeft: 10,
        fontSize: 14,
        color: 'green',
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },

    Qrcontainer: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 200,
        justifyContent: 'center',
        resizeMode: 'contain'
    }
});



