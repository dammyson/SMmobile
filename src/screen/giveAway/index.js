// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import { getData,getUserType } from '../../component/utilities';

import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
        };
    }


    async componentWillMount() {

        const name = JSON.parse(await getData())
        this.setState({
            role: await getUserType()
        })
    }



    render() {
        const { state, goBack } = this.props.navigation;
        return (

            <View style={styles.backgroundImage}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                        <TouchableOpacity onPress={() => goBack()} >
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


                    <View style={styles.mainbody}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('donationlist')} style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', marginTop: 15, valueOf, marginBottom: 8, backgroundColor: '#FFC10750', borderRadius: 10, paddingLeft: 10, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} >
                            <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3, flex: 2, paddingTop: 10 }}>

                                <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 16, marginBottom: 3, }}>Donate</Text>
                                <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-Medium', opacity: 0.7, marginTop: 5, fontSize: 12, marginRight: 40, }}>Make donation  </Text>

                            </View>

                            <View style={{ flex: 1 }}>

                                <Image
                                    source={require('../../assets/giveaway.png')}
                                    style={{ height: 80, width: 80, resizeMode: 'contain' }}

                                />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('redeem')} style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', marginTop: 15, valueOf, marginBottom: 8, backgroundColor: '#2D2C7150', borderRadius: 10, paddingLeft: 10, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} >
                            <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3, flex: 2, paddingTop: 10 }}>

                                <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 16, marginBottom: 3, }}> Redeem</Text>
                                <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-Medium', opacity: 0.7, fontSize: 12, marginTop: 5, marginRight: 40, }}>Redeem donation </Text>

                            </View>

                            <View style={{ flex: 1 }}>
                                <Image
                                    source={require('../../assets/redeem.png')}
                                    style={{ height: 80, width: 80, resizeMode: 'contain' }}

                                />
                            </View>

                        </TouchableOpacity>
                        {this.state.role == 'merchant' ? 
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('mdonate')} style={{ marginLeft: 30, marginRight: 30, flexDirection: 'row', marginTop: 15, valueOf, marginBottom: 8, backgroundColor: '#2D2C7150', borderRadius: 10, paddingLeft: 10, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} >
                                <View style={{ marginLeft: 15, textAlign: 'right', marginRight: 3, flex: 2, paddingTop: 10 }}>

                                    <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-ExtraBold', fontSize: 16, marginBottom: 3, }}> Merchant Giveaway</Text>
                                    <Text style={{ textAlign: 'left', color: color.button_blue, fontFamily: 'Montserrat-Medium', opacity: 0.7, fontSize: 12, marginTop: 5, marginRight: 40, }}>Create promotional giveaway for your loyal customers </Text>

                                </View>

                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={require('../../assets/shop.png')}
                                        style={{ height: 70, width: 70, resizeMode: 'contain' }}

                                    />
                                </View>

                            </TouchableOpacity>
                          :  null 
                        }

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
        marginTop: 40,

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

});



