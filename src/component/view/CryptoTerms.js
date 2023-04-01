
import React, { Component, useImperativeHandle } from 'react';
import { StyleSheet, Alert, Text, Dimensions, Image, ImageBackground, StatusBar, TouchableOpacity, View } from 'react-native';
import { Container, Content, } from 'native-base';
import { Button, } from 'native-base';
import colors from '../color';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { getTerms } from '../utilities/Terms';
import LinearGradient from 'react-native-linear-gradient';

export default class CryptoTerms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agree: false,
            country_flag: '',
            phone: '',
            currency: '',
            password: '3645',
            first_name: '',
            last_name: '',
            address: 'LA Galaxy',
            city: 'LAgos',
            country: 'NG',
            code: '',
            zip: '100356',
            region: 'LA',
            email: ''
        };
    }


    componentDidMount() {

    }


    render() {
        const { OnAccept, OnReject } = this.props;
        const placeholder = {
            label: 'Country',
            value: null,
            color: "#000",
        };

        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        opacity: 0.5,
                        backgroundColor: '#00000030',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}

                >

                </View>

                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}

                >
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
                        <View style={styles.container}>
                            <View style={styles.form_container}>
                                <View style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, marginHorizontal: 10 }}>
                                    <Text style={{ color: colors.black, fontSize: 15, lineHeight: 20, fontFamily: 'Poppins-Medium', margin: 10, }}> Terms and Conditions</Text>
                                </View>
                                <View style={{ flex: 1, marginHorizontal: 10 }}>
                                    <ScrollView>
                                        <Text style={{ color: colors.secondary_color, fontSize: 12, lineHeight: 20, fontFamily: 'Poppins-Medium', margin: 10, }}> 1. Buy and selling </Text>
                                        <Text style={{ color: '#2E2E2E', fontSize: 10, lineHeight: 16, fontFamily: 'Poppins-Light', margin: 10, }}> {getTerms()} </Text>
                                        <Text style={{ color: colors.secondary_color, fontSize: 12, lineHeight: 20, fontFamily: 'Poppins-Medium', margin: 10, }}> 2. Sending and receiving</Text>
                                        <Text style={{ color: '#2E2E2E', fontSize: 10, lineHeight: 16, fontFamily: 'Poppins-Light', margin: 10, }}> {getTerms()} </Text>
                                    </ScrollView>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row', }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { flex: 1, }]} block iconLeft>
                                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => OnAccept()} >
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: colors.white, fontSize: 12, marginLeft: 10 }}>I accept</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>


                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EFF2F5', '#EFF2F5']} style={[styles.buttonContainer, { flex: 1, }]} block iconLeft>
                                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => OnReject()} >

                                            <Text style={{ fontFamily: 'Poppins-Medium', color: colors.button_blue, fontSize: 10, marginLeft: 10 }}>I don’t accept  </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>





            </>

        );
    }

    contactUs() {
        const { OnAccept, OnReject } = this.props;
        Alert.alert(
            'Information',
            'We understand your concern, Kindly send a mail to support@Monny.me and we will get in touch with you',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => OnReject() },
            ],
            { cancelable: false }
        )
    }
}

CryptoTerms;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    container: {
        height: Dimensions.get('window').height * 0.8,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width - 30,
        borderRadius: 4
    },
    header: {
        flexDirection: 'row',
    },
    form_container: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        marginTop: 30,
        backgroundColor: '#fff',
        marginBottom: 15,
    },

    buttonContainer: {
        height: 34,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
    },


    terms_container: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    welcome_container: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10
    },
    title_container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    country_image: {
        height: 20,
        width: 30,
        resizeMode: 'contain',
        borderRadius: 5,
        borderColor: colors.gray,
        borderWidth: 0.6
    },
    logo_container: {
        marginLeft: 45,
        marginRight: 30,
    },
    logo: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',


    }
});

