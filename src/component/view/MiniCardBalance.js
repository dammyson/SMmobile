import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, TextInput, Dimensions, Switch, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Content, Container, Button, Toast } from 'native-base';
import { Icon, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import color from '../../component/color'


const MiniCardBalance = ({balance }) => {

    const [showBalance, setShowBalance] = useState(true);

    return (
        <View style={styles.card_container}>

            <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#4C46E9', '#2D81EC']} style={styles.card_body} >
                <View style={styles.currency_container}>
                    <View style={{ marginLeft: 10, padding: 6, backgroundColor: '#ffffff20', justifyContent: 'center', borderRadius: 40, marginBottom: 5 }}>
                        <Icon
                            name="currency-ngn"
                            type='material-community'
                            size={18}
                            color={color.white}
                        />
                    </View>
                </View>
                <View style={styles.detatails_container}>
                    <View style={styles.card_part_one}>
                        <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}> Naira Wallet</Text>
                        {showBalance ?
                            <TouchableOpacity onPress={() => setShowBalance(false)} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                <Icon
                                    active
                                    name="eye-with-line"
                                    type='entypo'
                                    color={'#ffffff70'}
                                    size={20}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setShowBalance(true)} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                <Icon
                                    active
                                    name="eye"
                                    type='entypo'
                                    color={'#ffffff70'}
                                    size={20}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.card_part_two}>

                        {showBalance ?
                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN {balance}</Text>
                            :
                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                        }

                    </View>
                    <View style={styles.card_part_three}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>Ledger Balance</Text>
                        </View>
                        <View style={{ backgroundColor: '#fff', width: 2, marginRight: 10 }} />
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            {showBalance ?
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN {balance}</Text>
                                :
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN *****</Text>
                            }
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default MiniCardBalance


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
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
    },

    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 15,
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30
    },
    card_body: {
        borderRadius: 10,
        flexDirection: 'row',
    },
    currency_container: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'flex-start',
    },
    detatails_container: {
        flex: 1,
        marginTop: 15,
    },
    card_part_one: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 20,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    tiles_container: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    tile_body: {
        backgroundColor: 'green',
        borderRadius: 10,
        flexDirection: 'row',
    },

    list_container: {
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 75

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
        marginRight: 25,
        marginLeft: 25,

    },
    input: {
        height: 60,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        backgroundColor: color.grey
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
    inputtwo: {
        height: 60,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        flexDirection: 'row'
    },
    buttonContainer: {
        height: 65,
        flex: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        borderRadius: 5,
    },
});