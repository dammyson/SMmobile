// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground,Clipboard, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import { getToken, getWallet, processResponse } from '../../component/utilities';
import color from '../../component/color'



export default class DonationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            done: false,
            items: [],
            auth: '',
            code: 'd37f4b1041',
            balance: 0,
            wallet: {}
        };
    }


    async componentDidMount() {
        this.setState({ auth: await getToken() })
        this.getDonationRequest();
    }


    getDonationRequest() {
        const { auth } = this.state
        this.setState({ loading: true });
        fetch(URL.urlfour + '/api/donations', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
        .then(processResponse)
        .then(res => {
          const { statusCode, data } = res;
                this.setState({ loading: false })
                this.setState({ items: data.data })
            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


    };





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
          
                    <View style={styles.backgroundImage}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                        <View style={styles.body}>
                            <View style={{ height: 20 }}></View>
                            <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                                <TouchableOpacity onPress={() =>  this.props.navigation.goBack()} >
                                    <Icon
                                        name="arrowleft"
                                        size={30}
                                        type='antdesign'
                                        color={color.primary_color}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                    <Text style={styles.title}>Giveaway</Text>
                                </View>
                                <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                            </View>


                            <View style={{ margin: 10, }}>
                                <Text style={{ textAlign: 'left', marginBottom: 10, color: color.button_blue, fontFamily: 'Montserrat-Bold', opacity: 0.7, marginTop: 5, fontSize: 12, marginRight: 40, }}>Ongoing Giveaway</Text>
                            </View>


                            <View style={styles.mainbody}>
                                <View style={styles.ongoin_container}>
                                    <View style={{ marginTop: 15 }}>

                                        <FlatList
                                            style={{ paddingBottom: 5 }}
                                            data={this.state.items}
                                            renderItem={this.renderItem}
                                            keyExtractor={item => item.id}
                                        />

                                    </View>
                                </View>



                                <TouchableOpacity onPress={() => this.props.navigation.replace('donate')} style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', marginTop: 15, valueOf, marginBottom: 8, backgroundColor: '#FFC10750', borderRadius: 10, paddingLeft: 10, paddingTop: 9, paddingBottom: 2, paddingRight: 10 }} >
                                    <View style={{ marginLeft: 15, justifyContent: 'flex-end', marginRight: 3, flex: 2, paddingTop: 10 }}>
                                        <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 18, marginBottom: 3, }}>Donate</Text>
                                        <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-Medium', opacity: 0.7, marginTop: 2, fontSize: 12, marginRight: 40, marginBottom: 4 }}>Make donation  </Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Image
                                            source={require('../../assets/giveaway.png')}
                                            style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                        />
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() =>  this.props.navigation.replace('redeem') } style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', marginTop: 15, valueOf, marginBottom: 8, backgroundColor: '#2D2C7150', borderRadius: 10, paddingLeft: 10, paddingTop: 9, paddingBottom: 3, paddingRight: 10 }} >
                                    <View style={{ marginLeft: 15, justifyContent: 'flex-end', marginRight: 3, flex: 2, paddingTop: 10 }}>
                                        <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 18, marginBottom: 3, }}> Redeem</Text>
                                        <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-Medium', opacity: 0.7, fontSize: 12, marginTop: 1, marginRight: 40, marginBottom: 4 }}>Redeem donation </Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Image
                                            source={require('../../assets/redeem.png')}
                                            style={{ height: 60, width: 60, resizeMode: 'contain' }}

                                        />
                                    </View>

                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 50 }}></View>
                        </View>

                    </View>
        );
    }

    renderItem = ({ item, }) => {
        return (
            <View onPress={()=> this.selectGiveaway(item)} style={{ flexDirection: 'row', borderColor: '#3E3E3E30', borderRadius: 10, borderWidth: 0.6, justifyContent: 'center', alignItems: 'center', marginTop:7 }}>
                <TouchableOpacity onPress={()=> this.selectGiveaway(item)}  style={styles.inputDetails}>
                    <Text style={[styles.budget]}>{item.purpose}</Text>
                    <Text style={styles.copy}>NGN {item.amount} x {item.number_of_people} people</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handlerLongClick(item.redemption_code)} style={styles.inputCode}>
                    <Text style={styles.copy}>Tap to copy code</Text>
                    <Text style={[styles.budget]}>{item.redemption_code} </Text>
                </TouchableOpacity>
            </View>
        )

    }

    selectGiveaway(item){
        this.props.navigation.navigate('ongoing', { items: item  });
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
    ongoin_container: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,

    },
    ongoin_row: {
        flexDirection: 'row',
        marginTop: 20
    },
    details_container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    detail_header: {
        textAlign: 'left',
        color: color.button_blue,
        fontFamily: 'Poppins-Regular',
        opacity: 0.7,
        marginTop: 5,
        fontSize: 12,
        marginRight: 40,
    },
    detail_value: {
        textAlign: 'left',
        color: color.button_blue,
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginBottom: 3,
    },
    inputCode: {
        height: 65,
        flex: 1,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#eff2f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    budget: {
        fontSize: 14,
        color: color.button_blue,
        fontFamily: 'Poppins-SemiBold',
    },
    copy: {
        color: color.button_blue,
        fontFamily: 'Poppins-Medium',
        opacity: 0.7,
        marginTop: 0,
        fontSize: 12,
    },
    inputDetails: {
        flex: 1.5,
        height: 65,
        margin: 10,
        justifyContent: 'center',
    },


});



