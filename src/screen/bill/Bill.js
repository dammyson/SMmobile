// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard, AsyncStorage, ImageBackground, KeyboardAvoidingView, SafeAreaView, TextInput, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import color from '../../component/color'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible_add_merchant: false,
            complete_transaction: false,
            loading: false,
            data: '',
            wallet: '',
            auth: '',

        };
    }


    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
            console.warn(value);
            AsyncStorage.getItem('wallet').then((value) => {
                if (value == '') { } else {
                    this.setState({ wallet: JSON.parse(value) })
                }
            })

            AsyncStorage.getItem('auth').then((value) => {
                if (value == '') { } else {
                    this.setState({ auth: value })
                }
            })


        })

    }




    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View colors={{ backgroundColor: '#000' }} style={{ flex: 1 }}>
                    <View style={styles.body}>
                        <View style={{ height: 20 }}></View>
                        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Icon
                                    name="arrowleft"
                                    size={30}
                                    type='antdesign'
                                    color={color.primary_color}
                                />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.title}>Bills</Text>
                            </View>
                            <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                        </View>
                        <View style={styles.mainbody}>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.actionbuttonLeft} onPress={() => { this.props.navigation.navigate('airtime') }}>
                                    <View style={{ margin: 30, marginBottom: 10 }}>
                                        <Icon
                                            name="circular-graph"
                                            size={30}
                                            type='entypo'
                                            color={'#2D2C71'}
                                        />
                                    </View>


                                    <Text style={styles.actionText}>Airtime</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.actionbuttonRight} onPress={() => { this.props.navigation.navigate('cable') }}>
                                    <View style={{ margin: 30, marginBottom: 10 }}>
                                        <Icon
                                            name="tv"
                                            size={30}
                                            type='entypo'
                                            color={'#2D2C71'}
                                        />
                                    </View>
                                    <Text style={styles.actionText}>Cable TV </Text>

                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.actionbuttonLeft} onPress={() => { this.props.navigation.navigate('data') }}>
                                    <View style={{ margin: 30, marginBottom: 10 }}>
                                        <Icon
                                            name="bar-graph"
                                            size={30}
                                            type='entypo'
                                            color={'#2D2C71'}
                                        />
                                    </View>


                                    <Text style={styles.actionText}>Data</Text>

                                </TouchableOpacity>


                                <TouchableOpacity style={styles.actionbuttonRight} onPress={() => { this.props.navigation.navigate('eletricity') }}>
                                    <View style={{ margin: 30, marginBottom: 10 }}>
                                        <Icon
                                            name="power-settings"
                                            size={30}
                                            type='material-community'
                                            color={'#2D2C71'}
                                        />
                                    </View>


                                    <Text style={styles.actionText}>Electricity</Text>

                                </TouchableOpacity>


                            </View>

                            <View style={{ flexDirection: 'row', }}>

                                <TouchableOpacity style={styles.actionbuttonLeft} onPress={() => { this.props.navigation.navigate('lcc') }}>
                                    <View style={{ margin: 30, marginBottom: 10 }}>
                                        <Image
                                            style={{ height: 30, width: 30 }}
                                            source={require('../../assets/lcc.png')}
                                        />
                                    </View>
                                    <Text style={styles.actionText}>LCC </Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionbuttonRight} onPress={() => { this.props.navigation.navigate('soon') }}>
                                   
                                        <View style={{ margin: 30, marginBottom: 10 }}>
                                            <FontAwesome5
                                                name="church"
                                                size={35}
                                                color={'#2D2C71'}
                                            />
                                        </View>


                                        <Text style={styles.actionText}>Religious</Text>
                                </TouchableOpacity>


                            </View>



                        </View>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginLeft: 20,
    },
    sideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    mainbody: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
    },
    actionbuttonLeft: {
        backgroundColor: '#EFF2F5',
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
    actionbuttonRight: {
        backgroundColor: '#EFF2F5',
        marginLeft: 10,
        marginRight: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 14,
        color: '#2d2c71',
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Poppins-SemiBold'
    },
    inputContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },

    space: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
    },
    actionText: {
        color: "#2d2c71",
        fontWeight: '600',
        marginBottom: 20,
        fontSize: 11,
        fontFamily: 'Poppins-Medium'
    }

});






