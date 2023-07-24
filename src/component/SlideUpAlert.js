import React from 'react'
import { StyleSheet, Text, Dimensions, Animated, FlatList, Easing, View, Image, TouchableOpacity, ImageBackground } from 'react-native'

import { Icon } from 'react-native-elements'
import { Container, Content, Button, Left, } from 'native-base';
import { connect } from 'react-redux'
const width = Dimensions.get('window').width
import * as Animatable from 'react-native-animatable';
import { font } from '../constants';
import { lightTheme } from '../theme/colors';


 class SlideUpAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            latitude: 6.5244,
            longitude: 3.3792,
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
        const { title, showButton, onClose, height } = this.props;

        const loader = this.props.loader
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor:lightTheme.INACTIVE_COLOR+"90"
                    }}
                >

                </View>

                <View
                    style={styles.Container}

                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                    </View>


                    <Animatable.View style={{ height: height, alignItems: 'center', justifyContent: 'center', }} animation="fadeInUpBig" >
                      
                        <View style={styles.body_top}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                <TouchableOpacity onPress={() => onClose()}>


                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 18, margin: 7, flex: 1, fontFamily:font.BOLD, color: lightTheme.PRIMARY_COLOR, textAlign: 'center', marginRight: 10 }}>{title}</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>
                                {
                                    showButton ?
                                        <TouchableOpacity onPress={() => onClose()}>
                                            <Icon
                                                name="closecircle"
                                                size={20}
                                                type='antdesign'
                                                color={"#000"}
                                            />

                                        </TouchableOpacity>

                                        : null
                                }
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

;


const mapStateToProps = state => {
    return {
        loader: state.loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideUpAlert);

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    body_top: {
        backgroundColor: "#fff",
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        flexDirection: 'row'

    },
    body: {
        width: Dimensions.get('window').width,
        flex: 1,
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
    nameList: {
        fontSize: 15,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        marginBottom: 1,
        fontFamily: font.MEDIUM,
    },
    numberList: {
        fontSize: 15,
        color: '#272065',
        flex: 1,
        marginLeft: 15,
        fontFamily: font.MEDIUM,
    },
    modal: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "#fff"

    },
    buttonContainer: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: "red",
    },
    modalTansButtonContainer: {
        height: 42,
        backgroundColor: "red",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 3,
        marginTop: 15,
        marginBottom: 30,
    },


});
