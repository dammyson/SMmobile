// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import URL from '../../component/server'
import ActivityIndicator from '../../component/view/ActivityIndicator'

import color from '../../component/color'


export default class ForgetPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: [],
            visible: false,
            view_balance: false,
            data: '',
            showBalance: true,
            balance: 0,
            auth: '',
            view_otp_input: false,
            actual_code: '',
            incoming_code: '',
            pin_id: ''
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
            console.warn(value)
        })
    }

    sendOtpRequest() {

        const { data, } = this.state

        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('phone', data.phone);
        formData.append('type', 'reset')

        this.setState({ loading: true })
        fetch(URL.url + '/otp/generate', {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData,
        })
            .then(this.processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data, statusCode);
                if (statusCode == 200) {
                    this.setState({ loading: false, view_otp_input: true, pin_id: data.data.pinId })
                } else {
                    this.setState({ loading: false })
                    Alert.alert('Operation failed', 'Please check you phone number and network and try again', [{ text: 'Okay' }])
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert('Something went wrong please try again');
                this.setState({ loading: false })
            });
    }


    getCodeOne(code) {
        if (code.length == 6) {
            this.verifyOtp(code)
        }
    }


    verifyOtp(incoming_code) {


        const { pin_id, actual_code } = this.state
        console.warn(incoming_code, actual_code)

        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('otp', incoming_code);
        formData.append('pin_id', pin_id)

        this.setState({ loading: true })
        fetch(URL.url + '/otp/verify', {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData,
        })
            .then(this.processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data, statusCode);


                if (statusCode == 200) {
                    if (data.data.verified) {
                        this.props.navigation.replace('resetpin')
                    } else if (data.data.verified == 'Expired') {
                        this.setState({ loading: false, view_otp_input: false, })
                        Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
                    }

                } else {
                    this.setState({ loading: false, view_otp_input: false, })
                    Alert.alert('Operation failed', 'Please enter your phone number and try again', [{ text: 'Okay' }])
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert('Something went wrong please try again');
                this.setState({ loading: false })
            });



    }


    processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.state.view_otp_input ?
                        this.renderOtp()
                        : this.renderBody()
                    }
                </Content>
                {this.state.loading ? <ActivityIndicator /> : null}
            </Container>
        );
    }

    renderBody() {
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

                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >

                                <View style={styles.Qrcontainer}>
                                    <Image
                                        source={require('../../assets/clock.png')}
                                        style={styles.logo}
                                    />
                                </View>

                            </View>
                            <View style={styles.payButtonContainer} >
                                <Text style={{ textAlign: 'center', color: '#2D2C71', fontFamily: 'Montserrat-SemiBold', fontSize: 20, marginTop: 1, marginBottom: 10 }}>{"RESET PIN"}</Text>
                                <Text style={{ textAlign: 'center', color: '#5D5D5D', fontFamily: 'Montserrat', fontSize: 16, marginTop: 1, marginBottom: 20, marginLeft: 20, marginRight: 20 }}> A messge will be sent to the number on the account </Text>

                                <TouchableOpacity onPress={() => {
                                    this.sendOtpRequest();
                                }} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 40, marginLeft: 40, marginBottom: 5, backgroundColor: color.primary_color, borderRadius: 10, paddingTop: 10, paddingBottom: 10, }} >
                                    <Text style={{ textAlign: 'left', color: '#0F0E43', fontFamily: 'Montserrat-bold', fontSize: 15, marginBottom: 3, }}> SEND OTP  </Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </ImageBackground>



                </View>




            </ImageBackground>)
    }
    renderOtp() {
        const { data, } = this.state
        return (

            <View>
                <View style={styles.body}>
                    <View style={styles.sideContent}>
                        <Image
                            style={styles.logo}
                            resizeMode="contain"
                            source={require('../../assets/email.png')} />
                    </View>
                    <View style={styles.mainContent}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25, marginLeft: 25, marginRight: 25 }}>
                            <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Verify your transaction number </Text>
                        </View>
                        <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>We've  sent your Otp to {data.phone}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <OTPInputView
                                style={{
                                    width: '80%', height: 70, marginLeft: 20,
                                    marginRight: 30, justifyContent: 'center', color: '#fff',
                                }}
                                pinCount={6}
                                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                onCodeChanged={code => { this.getCodeOne(code) }}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={(code => {
                                    // this.verifyOtp()
                                })}
                            />
                        </View>
                        <Text style={{ marginTop: 7, marginBottom: 7, marginRight: 13, marginLeft: 30, fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: '300' }}>Sent Otp</Text>

                        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.setState({ view_otp_input: false })}>
                            <Text style={{ color: 'red', textAlign: 'center' }}>Resend</Text>
                        </TouchableOpacity>

                    </View>



                </View>


            </View>


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
        justifyContent: 'center',
    },


    payButtonContainer: {
        paddingTop: 20,
        flex: 1

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
        fontFamily: 'Montserrat'
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
    Qrcontainer: {
        padding: 12,
        borderRadius: 10
    },
    lineStyle: {
        height: 0.5,
        flex: 1,
        marginTop: 20,
        backgroundColor: '#CCCCCC',

    },
    inputContainer: {
        flexDirection: "row",
        marginTop: 6,
        marginBottom: 6,
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
    },
    logo: {
        width: 250,
        height: 100,
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },

    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        margin: 3,
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#d1d1d1",
    },
});
