// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';


import color from '../../component/color'


export default class MTopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
           
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
                    <ImageBackground   imageStyle={{ borderRadius: 20, }}   source={require('../../assets/gray.png')} style={{flex:1, borderRadius:15}}>
                     
                    <View style={styles.mainbody}>


                        <View style={{ alignItems:'center', justifyContent:'center'}} >
                       
                        <View style={styles.Qrcontainer}>
                        <Image
                                    source={require('../../assets/woman.png')}
                                    style={styles.logo}
                                />
                                </View>
                            

    <Text style={{ textAlign: 'center', color: '#5D5D5D', fontFamily: 'Montserrat', fontSize: 16, marginTop:1 ,marginBottom:10 }}>{"Select where you would  \n ike to top up from"}
</Text>
                        </View>



                        <View style={styles.payButtonContainer} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('top_up')} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 40, marginLeft: 40, marginBottom: 5, backgroundColor: color.primary_color, borderRadius: 10, paddingTop: 10, paddingBottom: 10, }} >
                                <Text style={{ textAlign: 'left', color: '#fff', fontFamily: 'Montserrat', fontSize: 15, marginBottom: 3, }}> Business Wallet </Text>
                            </TouchableOpacity>

                            <View style={styles.inputContainer}>
                  <View style={styles.lineStyle} />
                  <Text style={{ color: 'black', margin: 6, fontSize: 15, fontWeight: '200' }}>Or</Text>
                  <View style={styles.lineStyle} />
                </View>
                            <TouchableOpacity onPress={() =>  this.props.navigation.navigate('charge')} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 40, marginLeft: 40, marginBottom: 8, backgroundColor: color.light_blue, borderRadius: 10, paddingTop: 10, paddingBottom: 10, marginBottom:20}} >

                                <Text style={{ textAlign: 'left', color: '#fff', fontFamily: 'Montserrat', fontSize: 15, marginBottom: 3, }}>Card </Text>

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
   
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
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
        marginBottom:6,
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
      },
      logo: {
        width: 300,
        height: 180,
        justifyContent: 'center',
        resizeMode: 'contain'


    }
});



