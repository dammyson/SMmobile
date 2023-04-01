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
import { getToken, processResponse } from '../../component/utilities';



export default class Virtual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            done: false,
            pin: false,
            items: [],
            qty: 10,
            amount: 10,
            balance: 0,
            code: [],
        };
    }


   async componentWillMount() {
     this.setState({ auth: await getToken() })
    
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
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.state.done ? 
                       this.success() 
                    : 
                    this.state.pin ? 
                        this.number() 
                    :   
                       this.donate()}
                </Content>
            </Container>
        );
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
                            <Text style={styles.title}>Virtual Wallets </Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>


                    <View style={styles.mainbody}>

                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Image
                                style={{}}
                                source={require('../../assets/phone_soon.png')}
                            />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft:25, marginRight:25 }}>
                    
                            <Text style={{ fontSize: 18, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}> Coming Soon</Text>
                            <Text style={{ fontSize: 12, color: '#3E3E3E',textAlign:'center', fontFamily: 'Poppins-Regurlar', }}>This feature will be up and running in no time. Please give us some time and check again. </Text>
                    </View>
                    </View>

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} block iconLeft>
                            <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.setState({pin:true})} >
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Return</Text>
                            </TouchableOpacity>
                        </LinearGradient>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        paddingBottom:50


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
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },
    successModalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        padding: 1,
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
    white: {
        color: 'white'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    input_border: {
        height: 28,
        width: 28,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3,
        borderRadius: 14,
        margin: 10,
        marginLeft:20,
        marginRight:20
    },
    input_solid: {
        height: 26,
        width: 26,
        backgroundColor: '#fff',
        borderRadius: 10
    }

});



