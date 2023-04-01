// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, TouchableOpacity, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Icon } from 'react-native-elements'

import { getUserType,} from '../../component/utilities';
import color from '../../component/color'


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            enterCode: true,
            spinner: false,
            view_balance: false,
            type:''
        };
    }


   async componentWillMount() {
       this.setState({type: await getUserType()})
    }

    render() {

        return (
            <ImageBackground
                source={require('../../assets/user_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                            <View style={styles.body}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontWeight: '900', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: 20 }}>
                                <Icon
                                    name="arrowleft"
                                    size={30}
                                    type='antdesign'
                                    color={color.slide_color_dark}
                                />
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: "#000", fontWeight: '900', fontSize: 16, }}>Account</Text>
                                </View>
                                <View style={{ width: 40 }}></View>
                            </View>
                                <TouchableOpacity onPress={()=>  this.props.navigation.navigate('userD')} style={styles.item}>
                                    <Text style={styles.menu}>User Data</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>   this.props.navigation.navigate('changepin')} style={styles.item}>
                                    <Text style={styles.menu}>Change Transaction Pin</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>  this.props.navigation.navigate('forgetpin')} style={styles.item}>
                                    <Text style={styles.menu}>Recover Transaction Pin</Text>
                                </TouchableOpacity>

                                {this.state.type == 'customer' ?  null:
                                <TouchableOpacity onPress={()=>  this.props.navigation.navigate('soon')} style={styles.item}>
                                    <Text style={styles.menu}>Business Data</Text>
                                </TouchableOpacity>
    }
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
    item: {
        flexDirection: 'row',
        backgroundColor: '#393939',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        alignItems: 'center',
        paddingRight: 15
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center'

    },
    sideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        flex: 1,
    },
    menu: {
        flex: 1,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    title: {
        marginTop: 20,
        marginBottom: 12,
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'left',
        fontFamily: 'Montserrat-Medium'
    },
    
});

