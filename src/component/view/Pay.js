import React from 'react'
import { StyleSheet, Text, Dimensions, Alert, TextInput, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { Content, Button, Left, } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import colors from '../color';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width


export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        };
    }


    render() {
        const { payment_detail, onPress, onClose } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#939393'
                    }}
                    blurType="dark"
                    blurAmount={15}
                    reducedTransparencyFallbackColor="white"
                >

                </View>

                <View
                    style={styles.Container}

                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                        
                    <View style={{  width: Dimensions.get('window').width - 80,}} >

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end',  }}>
                                <TouchableOpacity onPress={() => onClose()}>
                                    <Icon
                                        name="closesquare"
                                        size={40}
                                        type='antdesign'
                                        color={'#FFFFFF'}
                                    />

                                </TouchableOpacity>
                            </View>
                    </View>


                        <View style={styles.body}>
                            <View style={{ alignItems: 'center', marginBottom: 30 }} >

                                <View style={styles.avartar}>
                                    <Avatar
                                        rounded
                                        source={require('../../assets/bank.png')}
                                        size="medium"
                                        icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                        overlayContainerStyle={{ backgroundColor: 'white', }}
                                        containerStyle={{ borderRadius: 15, }}
                                    />
                                </View>

                                {payment_detail ?
                                    <View style={{  alignItems: 'center', marginLeft: 15 }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, textAlign: 'center',  marginTop: 15, }}>{payment_detail.first_name} {payment_detail.last_name}</Text>
                                        
                                        <View style={{ flexDirection: 'row' , alignItems: 'center', marginTop: 10, }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, textAlign: 'center', }}>ID Number:</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, textAlign: 'center',  }}> {payment_detail.user_id}</Text>
                                        </View>

                                    </View>

                                    : null}
                            </View>
                            <View style={{  marginBottom: 40 }}>
                                <View style={styles.textInputContainer}>
                                    <Text style={styles.actionbutton}>Amount  </Text>
                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Enter Amount"
                                            placeholderTextColor='#3E3E3E'
                                            returnKeyType="next"
                                            keyboardType="numeric"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                            maxLength={10}
                                            onChangeText={text => this.setState({ amount: text })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.textInputContainer}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => onPress(this.state.amount)} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Enter</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                               </View>

                            </View>

                        </View>

                    </View>
                </View>
            </>
        )
    }

}

Pay;

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    body: {
        width: Dimensions.get('window').width - 80,
        marginTop:10,
        margin: 30,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
  
   
    actionbutton: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 30,
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Montserrat-bold'
    },

    inputContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
  

    textInputContainer: {
        marginRight: 15,
        marginLeft: 15,

    },
    input: {
        height: 51,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,

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
        height: 51,
        marginTop: 15,
        borderRadius: 5,
    },
    buttonContainerTwo: {
        height: 51,
        flex: 1,
        marginLeft: 25,
        marginBottom: 10,
        marginRight: 25,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#D2D1F2'
    },

});
