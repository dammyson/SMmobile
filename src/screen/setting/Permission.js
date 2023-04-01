// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, AsyncStorage, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { CheckBox, Icon, SocialIcon } from 'react-native-elements';

import { PulseIndicator } from 'react-native-indicators';
import URL from '../../component/server'

import color from '../../component/color'


export default class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            checked: true,
            data: '',
            fname: '',
            auth: '',
            user: ''
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
            console.warn(value)
        })

        AsyncStorage.getItem('auth').then((value) => {
            if (value == '') { } else {
                this.setState({ auth: value })
            }
        })
    }

    updateDetailsRequest() {
        const { auth, fname, lname, email } = this.state
        this.setState({ loading: true });

        fetch(URL.url + '/profile/update?first_name=' + fname + '&last_name=' + lname + '&email=' + email, {
            method: 'PUT', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res)
                AsyncStorage.setItem('data', res.data);
                this.setState({
                    loading: false,
                    data: res.data
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });

    }

    render() {


        if (this.state.loading) {
            return (

                <ImageBackground
                    source={require('../../assets/user_bg.png')}
                    style={styles.loadingBackgroundImage}
                    resizeMode="cover"
                >
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.welcome}>
                            <PulseIndicator color={color.slide_color_dark} size={70} />
                        </View>
                    </View>
                </ImageBackground>
            );
        }
        return (
            <ImageBackground
                source={require('../../assets/user_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.body}>
                    <View style={{ height: 2 }}>
                    </View>
                    <View style={styles.mainContent}>
                        <View style={styles.arrowContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Icon
                                    name="ios-arrow-back"
                                    size={30}
                                    type='ionicon'
                                    color={color.primary_color}
                                />
                            </TouchableOpacity>
                            <Text style={styles.title}>Permissions</Text>
                        </View>


                    </View>
                    <View style={styles.sideContent}>

                        <View style={styles.item}>
                            <Text style={styles.menu} >Camera</Text>
                            <CheckBox
                                checked={this.state.checked}
                            />
                        </View>


                    </View>
                </View>



            </ImageBackground>
        );
    }

  
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        height: 40,
        width: Dimensions.get('window').width,
        marginTop: 40,



    },
    sideContent: {
        flex: 2,
        width: Dimensions.get('window').width,

    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 19,
        color: '#000',
        textAlign: 'center',
        fontWeight: '900',
        fontFamily: 'Montserrat-Bold'
    },

    qrbuttonContainer: {
        backgroundColor: color.white,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 1,
        borderRadius: 13,
        paddingLeft: 10,
        borderColor: '#000',
        borderWidth: 0.7
    },
    item: {
        height: 55,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        alignItems: 'center',
        paddingRight: 15
    },
    menu: {

        flex: 1,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 20,
    },

});

