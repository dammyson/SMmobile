
import React, { useState, useImperativeHandle } from 'react';
import { StyleSheet, Text, Dimensions, Alert, ImageBackground, StatusBar, Image, TouchableOpacity, View, } from 'react-native';
import { cardbg } from '../../assets';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';
import { Icon, } from 'react-native-elements';

const Card = ({ balance , point, onQrClick}) => {
    const [showBalance, setShowBalance] = useState(true);


   const currencyFormat=(n)=> {
        return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      }

    return (

        <ImageBackground
            style={{
                width: Dimensions.get('window').width - 40,
                borderRadius: 12
            }}
            source={cardbg}
            imageStyle={{ borderRadius: 20, }} >
            <View style={styles.details} >
                <Text style={{ color: lightTheme.WHITE_COLOR, fontSize: 13, fontWeight: '200', }}>SendMonny Naira</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{}}>
                        {showBalance ?
                            <View style={{}}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: lightTheme.WHITE_COLOR, fontSize: 22, }}>₦ {currencyFormat(balance)}</Text>
                            </View>
                            :
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: lightTheme.WHITE_COLOR, fontSize: 22, }}>₦ ****</Text>
                            </View>
                        }
                    </View>

                    {showBalance ?
                        <TouchableOpacity onPress={() => setShowBalance(false)} style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: "center" }} >
                            <Icon
                                active
                                name="eye-with-line"
                                type='entypo'
                                color={'#ffffff70'}
                                size={20}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => setShowBalance(true)} style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: "center" }} >
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
                <Text style={{ color: lightTheme.WHITE_COLOR, fontSize: 13, fontWeight: '200', }}> <Text style={{ color: lightTheme.WHITE_COLOR, fontSize: 13, fontWeight: '600', }}>{point} </Text> Points</Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start', marginBottom:10 }}>
                    <TouchableOpacity onPress={() => onQrClick()} style={{ flexDirection: 'row', height: 30, alignItems: 'center', backgroundColor: lightTheme.WHITE_COLOR, paddingHorizontal: 10, borderRadius:5 }} >
                        <Icon
                            active
                            name="qrcode"
                            type='antdesign'
                            color={lightTheme.PRIMARY_COLOR}
                            size={20}
                        />

                        <Text style={{ fontFamily: 'Poppins-Medium', color: lightTheme.PRIMARY_COLOR, fontSize: 12, }}>  Share QR Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>);


}
export default Card

const styles = StyleSheet.create({

    details: {
        height: (Dimensions.get('window').width) / 2,
        paddingHorizontal: 20,
        paddingVertical: 20,
        //backgroundColor: '#00000090',
        //justifyContent: 'center'
    },



});
