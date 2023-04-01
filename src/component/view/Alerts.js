import React from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { Icon, Avatar } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { getData, } from '../utilities';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width


export default class Alerts extends React.Component {
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



    render() {
        const { message, title, icon, okText, canclText,  onPress, onClose } = this.props;
        const { fname, lname, } = this.state
        return (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        opacity: 0.5,
                        backgroundColor: '#00000030',
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
    
                >

                </View>

                <View
                    style={styles.backgroundImage}

                >
                    <View style={{alignItems: 'center', justifyContent: 'center', }}>


                        <View style={{ width: Dimensions.get('window').width - 80, }} >

                            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end', }}>
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

                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                                <TouchableOpacity>
                                    <Icon
                                        name="infocirlceo"
                                        size={50}
                                        type='antdesign'
                                        color={'#D2D1F2'}
                                    />

                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 10 }} >

                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, textAlign: 'center', opacity:0.6, marginTop: 15, }}>{message}</Text>
                                      

                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <TouchableOpacity style={styles.downloadButtonContainer} onPress={() => {
                                       onClose()

                                    }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#FFC107', fontSize: 12, marginRight: 10 }}>{canclText}</Text>
                                      
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.shareButtonContainer} onPress={() => {
                                       onPress()
                                    }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#4C46E9', fontSize: 12, marginRight: 10 }}>{okText}</Text>
                                      
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>
                </View>
            </>
        )
    }

}

Alerts;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },
    body: {
        width: Dimensions.get('window').width - 80,
        marginTop: 10,
        margin: 30,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
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
    downloadButtonContainer: {
        height: 45,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#FFECB4',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButtonContainer: {
        height: 45,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#D2D1F2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
