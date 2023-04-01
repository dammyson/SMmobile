// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, Linking, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import { getChatNumber } from '../../component/utilities';
import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'



export default class Dispute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }


    componentWillMount() {
       console.warn(getChatNumber())

    }



    async handlerLongClick() {
        Linking.openURL('whatsapp://send?text=' + 'Hi Im from sendmonny app and I have a problem' + '&phone='+ getChatNumber())
    };


    async phoneCall() {
        Linking.openURL(`tel:${getChatNumber()}`)
    };


    render() {
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
                            <Text style={styles.title}>Dispute Transaction</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>


                    <View style={styles.mainbody}>
                    <TouchableOpacity  style={styles.buttonContainer} onPress={() => this.phoneCall()}>
        <Text style={{ flex:1, marginLeft: 20, fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}>Call Us On-{getChatNumber()}</Text>
                        <Icon
                                name="phone"
                                size={30}
                                type='material-community'
                                color={'#2D2C71'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity  style={styles.buttonContainer} onPress={() => this.handlerLongClick()} >
                        <Text style={{ flex:1, marginLeft: 20, fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}>Chat with Us  on Whats app </Text>
                        <Icon
                                name="whatsapp"
                                size={30}
                                type='material-community'
                                color={'#2D2C71'}
                            />
                             
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.buttonContainer} onPress={() => this.setState({pin:true})} >
                        <Text style={{ flex:1, marginLeft: 20, fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}>Request Call </Text>
                         <Icon
                                name="mobile-phone"
                                size={30}
                                type='font-awesome'
                                color={'#2D2C71'}
                            />
                               
                        </TouchableOpacity>
                    </View>



                </View>





            </View>
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
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        width: Dimensions.get('window').width,
        marginLeft: 30,
        marginRight: 30,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
       
     
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
    card_container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#EFF2F5',
        flexDirection:'row',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingRight:10
      },

});



