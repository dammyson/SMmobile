// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';


import color from '../../component/color'


export default class Clone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            loading: false,
            view_balance: false,
            data: '',
            showBalance: true,
            balance: 3,
            auth: '',
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
            // this.getWalletRequest(JSON.parse(value).token)

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
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#000" />
                <View style={styles.body}>
                    <View style={{ height: 1 }}>
                    </View>
                    <View style={styles.avarterContainer}>
                        <View>

                            <View>
                              
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('qrsetting') 
                                }}>
                                    <Text style={[styles.title, { fontWeight: '600' }]}>Hello, LLLLLLLLLL </Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </View>

                    <View style={styles.mainbody}>


                        <View style={{ marginTop:20, marginBottom:20,flex:1 }} >
                            <LinearGradient colors={['#4b47b7', '#0f0e43']} style={styles.card} >

                                <View style={{ justifyContent: 'center', }} >
                                    < Text style={{ textAlign: 'center', color: color.white, fontWeight: '400', marginTop:8 , fontSize: 14, }}>Balance</Text>
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
                            </LinearGradient>

                            <TouchableOpacity onPress={() => this.hideBallance()} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                <Icon
                                    active
                                    name="eye"
                                    type='entypo'
                                    color={color.button_blue}
                                />
                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 30 }}>

                                    <Text style={{ textAlign: 'right', color: '#000', fontWeight: '400', fontSize: 13, }}>Hide balance</Text>
                                </View>
                            </TouchableOpacity>


                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'center',}} >
                            <TouchableOpacity style={{ flex: 1, marginLeft: 20, marginRight: 7, backgroundColor: color.primary_color, borderRadius: 10, paddingLeft: 8, paddingTop: 5, paddingBottom: 8, paddingRight: 8 }} >

                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3 }}>

                                    <Text style={{ textAlign: 'left', color: '#000', fontWeight: '600', fontSize: 13, }}>My QR Code</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', marginRight: 3, marginTop: 6 }}>
                                    <Icon
                                        active
                                        name="qrcode-scan"
                                        type='material-community'
                                        size={50}
                                        color={color.white}
                                    />

                                </View>


                            </TouchableOpacity>



                            <TouchableOpacity style={{ flex: 1, marginRight: 20, marginLeft: 7, backgroundColor: '#aaa7ff', borderRadius: 10, paddingLeft: 8, paddingTop: 5, paddingBottom: 8, paddingRight: 8 }} >
                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3 }}>

                                    <Text style={{ textAlign: 'left', color: color.button_blue, fontWeight: '600', fontSize: 13, }}>My QR Code</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end', marginRight: 3, marginTop: 6 }}>
                                    <Icon
                                        active
                                        name="cash-multiple"
                                        type='material-community'
                                        size={50}
                                        color='#6f6af9'
                                    />

                                </View>

                            </TouchableOpacity>

                        </View>

                        <View style={styles.payButtonContainer} >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('scan') } style={{ flexDirection:'row', marginRight: 20, marginLeft: 20,valueOf, marginBottom:8, backgroundColor: color.light_blue, borderRadius: 10, paddingLeft: 8, paddingTop: 8, paddingBottom: 1, paddingRight: 8 }} >
                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3 , flex:1}}>

                                    <Text style={{ textAlign: 'left', color: color.white, fontFamily: 'Montserrat-ExtraBold', fontSize: 15,marginBottom:3, }}>Pay</Text>
                                    <Text style={{ textAlign: 'left', color: color.white,fontFamily: 'Montserrat-Bold', fontWeight: '600', fontSize: 12,marginRight: 40, }}>Following the proscription of their activities by the state government, </Text>
                                    
                                </View>

                               <View style={styles.avartar}>
                                <Avatar
                                    source={require('../../assets/pay.png')}
                                    size="large"
                                    icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                    overlayContainerStyle={{ backgroundColor: 'transparent', }}
                                    containerStyle={{ borderRadius: 15, }}
                                />
                            </View>

                        </TouchableOpacity>


                          <TouchableOpacity onPress={() =>  this.props.navigation.navigate('selbank') } style={{ flexDirection:'row', marginRight: 20, marginLeft: 20,valueOf, marginBottom:8, backgroundColor: color.primary_color, borderRadius: 10, paddingLeft: 8, paddingTop: 15, paddingBottom: 1, paddingRight: 8 }} >
                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3 , flex:1}}>

                                    <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 15,marginBottom:3, }}>Top Up</Text>
                                    <Text style={{ textAlign: 'left', color: color.button_blue,fontFamily: 'Montserrat-Bold', fontWeight: '600', fontSize: 12,marginRight: 40, }}>Following the proscription of their activities by the state government, </Text>
                                    
                                </View>

                               <View style={styles.avartar}>
                                <Avatar
                                    source={require('../../assets/top.png')}
                                    size="large"
                                    icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                    overlayContainerStyle={{ backgroundColor: 'transparent', }}
                                    containerStyle={{ borderRadius: 15, }}
                                />
                            </View>

                        </TouchableOpacity>
                        </View>

                       <View style={{ height: 15, }}></View>

                    </View>

                </View>




                <Modal
                    visible={this.state.visible}
                >
                    <ModalContent style={styles.modal}>
                        <View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, paddingBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.setState({ visible: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                                    <Icon
                                        name="close"
                                        size={20}
                                        type='antdesign'
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={styles.avartar}>
                                <Avatar
                                    source={require('../../assets/bank.png')}
                                    size="large"
                                    icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                    overlayContainerStyle={{ backgroundColor: 'white', }}
                                    onPress={() => console.log("Works!")}
                                    containerStyle={{ borderRadius: 15, }}
                                />
                            </View>


                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'center', paddingBottom: 10, marginTop: 25, }}>Connect Bank Account</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, marginLeft: 10, marginRight: 10, }}>for easy top up and recieve payment direct to account</Text>

                            <Button style={styles.modalbuttonContainer} block iconLeft>
                                <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>
                            </Button>
                        </View>
                    </ModalContent>
                </Modal>

                <Modal
                    visible={this.state.view_balance}
                >
                    <ModalContent style={styles.modal}>
                        <View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'left', paddingBottom: 10, marginTop: 25, flex: 1 }}>Enter pin </Text>
                                <TouchableOpacity onPress={() => this.setState({ view_balance: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                                    <Icon
                                        name="close"
                                        size={20}
                                        type='antdesign'
                                        color="#fff"
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10, }}>

                                <OTPInputView
                                    style={{
                                        width: '70%', height: 70, marginLeft: 30,
                                        marginRight: 30, justifyContent: 'center', color: '#fff',
                                    }}
                                    pinCount={4}
                                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    // onCodeChanged = {code => { this.setState({code})}}
                                    autoFocusOnLoad
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code => {
                                        this.props.navigation.navigate('addpin')
                                    })}
                                />
                            </View>

                            <Button style={styles.modalbuttonContainer} block iconLeft>
                                <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>
                            </Button>
                        </View>
                    </ModalContent>
                </Modal>

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
        paddingTop: 20,
        paddingBottom: 20,
        width: Dimensions.get('window').width,
    },
    buttonTop: {

        width: Dimensions.get('window').width,
        flexDirection: 'row',
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        backgroundColor: '#d1d1d1',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
 

    payButtonContainer: {
        paddingTop: 20,
        flex: 2,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#fff',
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
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: color.button_blue
    },
    price: {
        color: color.white,
        margin: 20,
        marginTop:10,
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

    modal: {
        width: Dimensions.get('window').width - 60,

    },
    modalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: "#707070",
        color: 'blue'
    },

    underlineStyleHighLighted: {
        borderColor: "green",
    },
});



