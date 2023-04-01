import React from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import { Container, Content, Button, Left, } from 'native-base';
import colors from '../color';
const width = Dimensions.get('window').width
import LinearGradient from 'react-native-linear-gradient';

export default class NoCryptoWallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            auth: '',
            loading: false,
            lname: '',
            fname: ''

        };
    }

    async componentWillMount() {

    }

    render() {
        const { name, message, onPress, button_text } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#00000040'
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: Dimensions.get('window').width - 60, margin: 30, paddingTop: 30, paddingBottom: 20, paddingLeft: 10, paddingRight: 10, backgroundColor: '#fff', borderRadius: 5 }}>
                            <View style={{ alignItems: 'center', marginHorizontal: 20, marginTop:20 }}>
                                <Image
                                    style={styles.logo}
                                    source={require('../../assets/nowall.png')}
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                <Text style={{ fontSize: 17, color: colors.button_blue, fontFamily: 'Poppins-Medium', textAlign: 'center', paddingBottom: 1, marginTop: 2, }}>{'No Wallet Address'}</Text>
                                <Text style={{ fontSize: 12, color: '#5D5D5D', textAlign: 'center', marginTop: 5, fontFamily: 'Poppins-Regular', }}> {'You don’t have a bitcoin address. Click bellow to generate address.'} </Text>
                            </View>


                            <View style={{ paddingBottom: 10 }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer]} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => OnAccept()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: colors.white, fontSize: 12, marginLeft: 10 }}>I accept</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                        </View>
                    </View>
                </View>
            </>
        )
    }

}

NoCryptoWallet;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },
    modalTansButtonContainer: {
        height: 42,
        backgroundColor: colors.deep_blue,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 30,

    },
    logo: {
        width: 250,
        height: 110,
        justifyContent: 'center',
        resizeMode: 'contain'
      }
});
