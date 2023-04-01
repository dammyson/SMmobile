import React from 'react'
import { StyleSheet, Text, Dimensions, Animated, FlatList, Easing, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import colors from '../color';
const width = Dimensions.get('window').width
import * as Animatable from 'react-native-animatable';



export default class CustomAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),

        };
    }


    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start();
    }


    Body = () => {
        return this.props.Body();

    }


    render() {
        const { title, showButton, onClose } = this.props;
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                >
                </View>

                <View style={styles.Container} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    </View>
                    <Animatable.View style={[{ height: Dimensions.get('window').height - 150, alignItems: 'center', justifyContent: 'center', },]} animation="fadeInUpBig" >

                        <View style={styles.body_top}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                <TouchableOpacity onPress={() => onClose()}>
                                </TouchableOpacity>
                            </View>

                            <View style={{ fontSize: 14, margin: 7, flex: 1,   justifyContent: 'center', alignItems: 'center', }}>
                              <TouchableOpacity  onPress={() => onClose()} style={{ height:7, width: 50, backgroundColor:colors.grey }}/>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>

                                <TouchableOpacity onPress={() => onClose()}>
                                    <Icon
                                        name="closecircle"
                                        size={20}
                                        type='antdesign'
                                        color={colors.red}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.body}>
                            {this.Body()}
                        </View>
                    </Animatable.View>
                </View>


            </>
        )
    }



}

CustomAlert;

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    body_top: {
        paddingTop:5,
        paddingBottom:5,
        backgroundColor: colors.white,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        backgroundColor:colors.primary_color,

    },
    body: {
        width: Dimensions.get('window').width,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',

    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        marginRight: 13,
        marginLeft: 13,

    },
    country_image: {
        height: 20,
        width: 30,
        resizeMode: 'contain',
        borderColor: colors.gray,
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
    },
    textInputContainer: {
        marginRight: 25,
        marginLeft: 25,
    },
    input: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12
    },

    nameList: {
        fontSize: 15,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        marginBottom: 1,
        fontFamily: 'Proxima-nova-Regular',
    },
    numberList: {
        fontSize: 15,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        fontFamily: 'Proxima-nova-Regular',
    },
    modal: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#fff"

    },
    search_input: {
        height: 40,
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#000',
        borderWidth: 0.8,
        flexDirection: 'row'

    },

});
