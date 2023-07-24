
import React, { useState, useImperativeHandle } from 'react';
import { StyleSheet, Text, Dimensions, Alert, ImageBackground, StatusBar, Image, TouchableOpacity, View, } from 'react-native';
import { cardbg } from '../../assets';
import { font } from '../../constants';
import { lightTheme } from '../../theme/colors';
import { Icon, } from 'react-native-elements';

const MenuCard = ({ title, bg }) => {

    const [showBalance, setShowBalance] = useState(true);
    const currencyFormat = (n) => {
        return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }

    return (

        <ImageBackground
            style={{
                width: (Dimensions.get('window').width / 2) - 40,
                height: (Dimensions.get('window').width / 2) - 40,
                borderRadius: 12
            }}
            source={bg}
            imageStyle={{ borderRadius: 20, }} >
            <View style={styles.details} >
                <View style={{ flex:1,  justifyContent: 'flex-end', alignItems: 'flex-start',}}>
                    <View style={{}}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: lightTheme.PRIMARY_COLOR, fontSize: 12, }}>{title}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>);


}
export default MenuCard

const styles = StyleSheet.create({

    details: {
        flex:1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },



});
