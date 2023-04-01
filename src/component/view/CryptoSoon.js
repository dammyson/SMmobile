import React from 'react'
import { StyleSheet, Text, Dimensions, Alert,Image, TextInput, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { Content, Button, Left,  } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import colors from '../color';
import LinearGradient from 'react-native-linear-gradient';
const width = Dimensions.get('window').width


export default class CryptoSoon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        };
    }

    sendRequest(){
        const { onPress } = this.props;
        onPress()


        
    }


    render() {
        const { onCancel } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#93939360'
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

                        
                   


                        <View style={styles.body}>
                            <View style={{ alignItems: 'center', marginBottom: 20,  marginTop: 15  }} >

                                <View style={styles.avartar}>
                                    <Image
                                      
                                        source={require('../../assets/bell.png')}
                                       style={{height: 80, width:70,resizeMode: 'contain'}}
                                    />
                                </View>

                              
                                    <View style={{ alignItems: 'center', marginLeft: 15 , marginTop: 20,}}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, textAlign: 'center', marginTop: 15, }}>Stay Updated</Text>
                                        
                                        <View style={{ flexDirection: 'row' , alignItems: 'center', marginTop: 20, marginLeft:20, marginRight:20 }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, textAlign: 'center',}}>Be the first person to get notified when this feature is live</Text>
                    
                                        </View>

                                    </View>

                               
                            </View>
                            <View style={{  marginBottom: 5, marginTop: 10 }}>
                               
                                <View style={{flexDirection:'row'}}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.sendRequest()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                </LinearGradient>


                                <View style={styles.buttonContainerTwo} block iconLeft>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => onCancel()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#FFC107', fontSize: 15 }}>No</Text>
                                    </TouchableOpacity>
                                </View>

                               </View>

                            </View>

                        </View>

                    </View>
                </View>
            </>
        )
    }

}

CryptoSoon;

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
        height: 65,
        marginTop: 15,
        borderRadius: 5,
        flex: 1, 
        marginLeft: 25,
    },
    buttonContainerTwo: {
        height: 65,
        flex: 1,
        marginLeft: 25,
        marginBottom: 10,
        marginRight: 25,
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: '#FFECB4'
    },

});
