// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';



import color from '../../component/color'


export default class QrCodeSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            merchant: 'ay345',
            items: [],
            visible: false,
            view_balance: false,
            data: '',
            qrCode: '',
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }

        })
    }
    openShareScreen() {
        if (this.qrCode) {
            const shareOptions = {
                type: 'image/jpg',
                title: '',
                url: this.qrCode
            };
            Share.open(shareOptions)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }
    }
    render() {
        let logoFromFile = require('../../assets/logo.png');

        return (
            <LinearGradient colors={['#4b47b7', '#0f0e43']}style={{ flex: 1 }}>
             <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.avarterContainer}>


                    <View style={{ alignItems: 'center', flexDirection:'row' }}>
                         <TouchableOpacity style={styles.arrowContainer} onPress={() => {
                          this.props.navigation.goBack()
                        }}>
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={color.primary_color}
                            />

                        </TouchableOpacity>

                        <View style={{ alignItems: 'center', flex:1 }}>
                            <Text style={styles.title}>ID No:</Text>
                            <TouchableOpacity onPress={() => {
                                 this.props.navigation.navigate('qrsetting')
                            }}>
                                <Text style={[styles.title, { fontWeight: '600' }]}>{this.state.data.user_id} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width:40 }}></View>

                    </View>




                </View>
                <View
                    style={styles.mainbody}
                >
                                <View style={styles.Qrcontainer}>
                                    <QRCode
                                        getBase64={base64 => {
                                            this.qrCode = base64;
                                        }}
                                        value={this.state.data.user_id}
                                        size={260}
                                        color="#000"
                                        backgroundColor='#fff'
                                    />
                                </View>

                            <View style={styles.buttonContainer}>
                                <Button onPress={() => {
                                    this.setState({ visible: true });
                                }} style={styles.qrbuttonContainer} block iconLeft>
                                    <Text style={{ textAlign: 'right', color: color.button_blue, fontSize: 13, fontWeight: '400' }}>Download </Text>
                                    <Icon
                                        active
                                        name="qrcode-scan"
                                        type='material-community'
                                        color={color.button_blue}
                                    />

                                </Button>

                                <Button onPress={this.openShareScreen} style={styles.qrcolorbuttonContainer} block iconLeft>
                                    <Text style={{ textAlign: 'right', color: '#000', fontSize: 13, fontWeight: '400' }}>Share </Text>
                                    <Icon
                                        active
                                        name="qrcode-scan"
                                        type='material-community'
                                        color='#000'
                                    />

                                </Button>

                            </View>




                       



                </View>
               </SafeAreaView>
            </LinearGradient>
        );
    }


}
const styles = StyleSheet.create({
    mainbody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
 
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        width: Dimensions.get('window').width,
    },
    Qrcontainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20
    },

    title: {
        marginTop: 7,
        marginBottom: 7,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 19,
        color: color.white,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat-Bold'
    },

    qrbuttonContainer: {
        flex: 1,
        backgroundColor: color.white,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        borderRadius: 13,
        paddingRight: 10,
        borderColor: color.button_blue,
        borderWidth: 1
    },
    qrcolorbuttonContainer: {
        flex: 1,
        backgroundColor: color.primary_color,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        borderRadius: 13,
        paddingRight: 10
    },
    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 30,
    }
});

