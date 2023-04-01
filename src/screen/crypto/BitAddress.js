
// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import {
    LineChart,
} from "react-native-chart-kit";
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../component/color'
import Moment from 'moment';
import { getWallet, getType } from '../../component/utilities';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import { DigitalBalanceCard, InputTextField, HalfDigitalBalanceCard, HalfVirtualBalanceCard } from '../../component/view';
import { qrImage } from '../../component/utilities/Base64';
export default class BitAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activeIndex: 0,
            loading: false,
            data: '',
            auth: '',
            wallet: '',
            show_menu: true,
            show_graph: true,
            show_graph_line: false,
            credit_items: [],
            cr_amount: 0,
            dr_amount: 0,
            debit_items: [],

        };
    }


    componentDidMount() {

    }





    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }




    render() {
        const placeholder = {
            label: 'Select  Destination',
            value: null,
            color: "#000",
        };
        if (this.state.loading) {
            return (
                <ActivityIndicator />
            );
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Container style={{ backgroundColor: color.white }}>
                    <Content>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={color.white} />
                        <View style={{ flex: 1, }}>

                            <View style={styles.body}>
                                <View style={{ flexDirection: 'row', height: 60, paddingLeft: 20, width: Dimensions.get('window').width, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                        <Icon
                                            name="arrowleft"
                                            size={30}
                                            type='antdesign'
                                            color={color.primary_color}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                        <Text style={styles.title}>Address</Text>
                                    </View>


                                    <TouchableOpacity style={{ justifyContent: 'center', width: 30, alignItems: 'center', marginRight: 20 }}>

                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mainContent}>
                                    {this.renderAddress()}


                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }




 

    renderAddress() {
        const placeholder = {
            label: 'Select  Destination',
            value: null,
            color: "#000",
        };
        return (
            <View style={{ backgroundColor: color.white, marginBottom: 60, height: Dimensions.get('window').height, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 17, marginLeft: 17, marginTop: 30 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: '#3E3E3E', fontSize: 14 }}>QR Code</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E65', fontSize: 14, marginTop: 15 }}>Scan this to receive Bitcoin</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 17, marginLeft: 17, marginTop: 30 }}>
                    {this.rendQr()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 17, marginLeft: 17, marginTop: 30 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', color: '#3E3E3E65', fontSize: 14 }}>Wallet Address</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 14, marginTop: 15 }}>bookmark919637?termaddress&page1&position</Text>

                </View>

                <View style={{ marginTop: 10, flexDirection: 'row', marginHorizontal:10 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.sbuttonContainer, { flex: 1, }]} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.setState({ pin: true })} >
                            <Icon
                                name="cash"
                                size={20}
                                type='material-community'
                                color={color.white}
                            />
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 14, marginLeft: 10 }}>Copy Address</Text>
                        </TouchableOpacity>
                    </LinearGradient>


                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#EFF2F5', '#EFF2F5']} style={[styles.sbuttonContainer, { flex: 1, }]} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => this.setState({ pin: true })} >
                            <Icon
                                name="location-pin"
                                size={20}
                                type='entypo'
                                color={color.button_blue}
                            />
                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.button_blue, fontSize: 14, marginLeft: 10 }}>Save QR code </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>

        )
    }


    rendQr() {
        let base64Logo = qrImage();
        const { goBack } = this.props.navigation;
        return (
            <QRCode
                value={'llll'}
                size={Dimensions.get('window').width / 2}
                color="#000"
                backgroundColor='#fff'
                logo={{ uri: base64Logo }}
                logoSize={60}
            />
        )
    }

}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,

    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff'

    },

    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 14,
        color: color.button_blue,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'
    },


    sinput: {
        height: 35,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 12,
        backgroundColor: color.grey
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 10,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
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
        paddingLeft: 12,
        flexDirection: 'row'
    },
    sbuttonContainer: {
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        borderRadius: 5,
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30,
        // to ensure the text is never behind the icon
    },
});





