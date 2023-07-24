import React from 'react'
import { FlatList, Dimensions, View, Text, Image, StyleSheet, StatusBar, Animated, Easing, ImageBackground } from 'react-native';

import { lightTheme } from '../../theme/colors';
import * as Animatable from 'react-native-animatable';
import { Button } from 'native-base';

import { font } from '../../constants';
import { Icon } from 'react-native-elements';

const { height, width } = Dimensions.get("window");

const CustomPopup = ({ height, title, Header, Body }) => {
    return (
        <>
            <StatusBar barStyle="light-content" translucent hidden={false} backgroundColor="transparent" />
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#00000050',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Animatable.View style={{ height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} animation="fadeInUpBig" >
                    <View style={{ height: height, paddingVertical: 30, width: Dimensions.get('window').width - 50, backgroundColor: lightTheme.WHITE_COLOR, borderRadius: 20 }} >

                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {Header()}
                        </View>


                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                            <Text style={{ color: '#000', fontFamily: font.BOLD, textAlign: 'center', marginTop: 10, marginHorizontal: 20 }}>{title}</Text>
                            {Body()}
                        </View>



                    </View>
                </Animatable.View>

            </View>
        </>
    )
}

export default CustomPopup



const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        elevation: 2,
        height,
        width,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
    },
    welcome: {
        height: 85
    },
    buttonContainer: {
        backgroundColor: lightTheme.PRIMARY_COLOR,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    image_profile: {
        width: 120,
        height: 120,
        borderRadius: 150,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5
    },
})
