
// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native';
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
import { DigitalBalanceCard, InputTextField, HalfDigitalBalanceCard, HalfVirtualBalanceCard } from '../../component/view/';

export default class BitWithDraw extends Component {
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
                                    <TouchableOpacity style={{ justifyContent: 'center' , }} onPress={() => this.props.navigation.goBack()} >
                                        <Icon
                                            name="arrowleft"
                                            size={30}
                                            type='antdesign'
                                            color={color.primary_color}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                        <Text style={styles.title}>Withdraw Bitcoin</Text>
                                    </View>


                                    <TouchableOpacity style={{ justifyContent: 'center', width: 30, alignItems: 'center', marginRight: 20 }}>

                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mainContent}>
                                    {this.renderWithdraw()}
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }


    soon() {
        return (
            <View style={{ marginTop: 15, marginBottom: 10, flex: 1, }}>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: "#3E3E3E90", fontSize: 7, }}> {"BTC/USD "}</Text>

                </View>

                <View style={{ flex: 1 }} />

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: "#3E3E3E90", fontSize: 7, }}>  {"+ 0.36% "} </Text>

                </View>

            </View>)
    }

    renderWithdraw() {
        const placeholder = {
            label: 'Select  Destination',
            value: null,
            color: "#000",
        };
        return (
            <View style={{ backgroundColor: color.white, marginBottom: 60 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                    <HalfVirtualBalanceCard
                        name={'Naira Balance'}
                        balance={1000}
                        ledger_label={'Ledger Balance'}
                        ledger_balance={'Lovov'}
                        currency={'NGN'}
                        theme={['#3AA34E', '#005A11']}
                    />

                    <HalfDigitalBalanceCard
                        name={'Bitcoin Wallet '}
                        balance={1000}
                        ledger_label={'$9671.1338'}
                        ledger_balance={'$9671.1338'}
                        currency={'BTC'}
                        theme={'#F7931A'}
                        statistics={() => this.soon()}
                    />
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: 10, marginLeft: 17, }}>
                        <Text style={styles.actionbutton}>From </Text>
                        <View style={styles.input}>
                            <View style={{ flex: 1, marginLeft: 2, justifyContent: 'center', }}>
                                <RNPickerSelect
                                    placeholder={placeholder}
                                    placeholderTextColor={'#000'}
                                    items={[
                                        { label: 'My Bank Account', value: 1 },
                                        { label: 'Other Bank Account', value: 3 },
                                        { label: 'Other sendmonny Wallets', value: 2 },
                                    ]}
                                    onValueChange={value => {
                                        this.setOption({
                                            value
                                        });
                                    }}
                                    style={pickerSelectStyles}
                                    value={this.state.account}
                                    useNativeAndroidPickerStyle={false}

                                />
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, marginRight: 17, marginLeft: 10, }}>
                        <Text style={styles.actionbutton}>To </Text>
                        <View style={styles.input}>
                            <View style={{ flex: 1, marginLeft: 2, justifyContent: 'center', }}>
                                <RNPickerSelect
                                    placeholder={placeholder}
                                    placeholderTextColor={'#000'}
                                    items={[
                                        { label: 'My Bank Account', value: 1 },
                                        { label: 'Other Bank Account', value: 3 },
                                        { label: 'Other sendmonny Wallets', value: 2 },
                                    ]}
                                    onValueChange={value => {
                                        this.setOption({
                                            value
                                        });
                                    }}
                                    style={pickerSelectStyles}
                                    value={this.state.account}
                                    useNativeAndroidPickerStyle={false}

                                />
                            </View>
                        </View>

                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 17, marginLeft: 17, marginTop: 10 }}>
                    <Text style={{ fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>Rate: 400.00/$ </Text>
                </View>

                <View style={{ marginRight: 17, marginLeft: 17, }}>

                    <InputTextField
                        label="Amount"
                        onChangeText={text => this.setState({ phone: text })}
                        defaultValue={this.state.phone}
                        keyboardType='numeric'
                        theme={'#F7931A'}
                        placeholder={this.state.country_placeholder}
                        onSubmitEditing={() => console.warn('kdk')} />
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, marginRight: 10, marginLeft: 17, }}>
                        <Text style={styles.actionbutton}>Amount in Dollars  </Text>
                        <View style={styles.input}>
                            <View style={{ flex: 1, marginLeft: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingRight: 10 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#3E3E3E90', fontSize: 10, flex: 1, }}>1.243</Text>
                                <Icon
                                    name="dollar"
                                    size={16}
                                    type='font-awesome'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>

                    </View>

                    <View style={{ flex: 1, marginRight: 17, marginLeft: 10, }}>
                        <Text style={styles.actionbutton}>Amount in Bitcoin </Text>
                        <View style={styles.input}>
                            <View style={{ flex: 1, marginLeft: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingRight: 10 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#3E3E3E90', fontSize: 10, flex: 1, }}>1.243</Text>
                                <Icon
                                    name="bitcoin"
                                    size={16}
                                    type='font-awesome'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>

                    </View>
                </View>


                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 17, marginLeft: 17, marginTop: 10, height: 40 }}>

                </View>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.setState({ pin: true })} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Withdraw</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

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

    input: {
        height: 38,
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
        height: 50,
        marginLeft: 20,
        marginRight: 20,
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





