// React native and others libraries imports
import React, { Component } from 'react';
import { TouchableHighlight, SafeAreaView, FlatList, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';



import color from '../../component/color'


export default class MerchantWithdraw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            merchant: 'ay345',
            items: [],
            visible: false,
            view_balance: false,
            data: '',
            wallet: '',
            qrCode: '',
            selected_category: 0,
        };
    }



    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
        })

        AsyncStorage.getItem('wallet').then((value) => {
            if (value == '') { } else {
                this.setState({ wallet: JSON.parse(value) })
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
            <LinearGradient colors={['#4b47b7', '#0f0e43']} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.avarterContainer}>


                        <View style={{ alignItems: 'center', flexDirection: 'row', }}>
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

                            <View style={{ alignItems: 'center', flex: 1 }}>

                                <Text style={[styles.title, { fontWeight: '600' }]}> Withdrawer </Text>
                            </View>
                            <View style={{ width: 40 }}></View>

                        </View>







                    </View>

                    <View style={styles.card} >



                        <Text style={styles.price}>₦{this.state.wallet.balance}</Text>
                        <Text style={{ paddingBottom: 20, paddingTop: 20, fontSize: 15, color: color.white }}> is your balance </Text>
                    </View>
                    <View
                        style={styles.mainbody}
                    >
                        <View style={styles.merchangContainer}>
                            <TextInput
                                placeholder="Enter amount"
                                placeholderTextColor={color.button_blue}
                                returnKeyType="next"
                                onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={text => this.setState({ username: text })}
                            />

                        </View>
                        <Text style={{ paddingBottom: 10, paddingTop: 10, fontSize: 15, color: color.white, marginLeft: 30, }}> Select Bank </Text>
                        <View style={{
                            flex: 1, borderRadius: 13, borderWidth: 1, borderColor: color.button_blue, marginLeft: 30,
                            marginRight: 30,
                        }}>
                            <FlatList
                                style={{ paddingBottom: 5 }}
                                data={this.state.wallet.banks}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.id}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader}
                            />

                        </View>

                        <Button onPress={() => this.props.navigation.navigate('qr')} style={styles.buttonContainer} block iconLeft>
                            <Text style={{ color: color.button_blue, fontWeight: '600', fontSize: 14 }}>Withdraw</Text>
                        </Button>




                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

  
    _handleCategorySelect = (index) => { this.setState({ selected_category: index }); }
    renderItem = ({ item }) => {
        return (

            <TouchableOpacity style={this.state.selected_category === item.id ?
                styles.blackcardo : styles.blackcard}
                onPress={() => this._handleCategorySelect(item.id)}
                underlayColor="red">
                <TouchableOpacity style={{ flex: 1 }}>
                    <Text   style={this.state.selected_category === item.id ?
                styles.banksel : styles.bank}>{item.beneficiary_bank_name}</Text>
                    <Text style={this.state.selected_category === item.id ?
                styles.numbersel : styles.number}>{item.beneficiary_account_number}</Text>
                    <Text style={this.state.selected_category === item.id ?
                styles.numbersel : styles.number}>{item.beneficiary_account_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 20 }}>
                    <Icon
                        name="trash"
                        size={30}
                        type='font-awesome'
                        color={this.state.selected_category === item.id ?
                            color.white : color.button_blue}
                    />
                </TouchableOpacity>
            </TouchableOpacity>

        )

    }
}
const styles = StyleSheet.create({
    mainbody: {
        flex: 1,

        backgroundColor: color.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },

    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        width: Dimensions.get('window').width,
    },
    Qrcontainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20
    },

    title: {
        marginRight: 13,
        marginLeft: 13,
        fontSize: 19,
        color: color.white,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat-Regular'
    },

    qrbuttonContainer: {
        flex: 1,
        backgroundColor: color.button_blue,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        borderRadius: 13,
        paddingRight: 10,
        borderColor: '#fff',
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

        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 30,
    },
    price: {
        color: color.white,
        margin: 2,
        fontSize: 25,
        fontFamily: 'Montserrat-Bold'
    },
    card: {
        justifyContent: 'center',
        shadowColor: '#fff',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    merchangContainer: {
        marginTop: 15,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
    },
    input: {
        height: 45,
        borderColor: color.button_blue,
        marginBottom: 15,
        color: color.button_blue,
        paddingHorizontal: 10,
        flex: 1,
        borderRadius: 15,
        borderWidth:0.5,
        justifyContent: 'center',
      
        
    },
    buttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderRadius: 15,
        marginBottom: 20,
    },

    blackcard: {
        borderRadius: 15,
        margin: 12,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: color.button_blue,

    },
    blackcardo: {
        borderRadius: 15,
        margin: 12,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: color.button_blue

    },

    bank: {
        fontSize: 15,
        color: color.button_blue,
        fontFamily: 'Montserrat-Bold'
    },
    number: {
        fontSize: 15,
        color: color.button_blue,
        fontFamily: 'Montserrat-Regular'
    },
    name: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: color.button_blue,
    },



    banksel: {
        fontSize: 15,
        color: color.white,
        fontFamily: 'Montserrat-Bold'
    },
    numbersel: {
        fontSize: 15,
        color: color.white,
        fontFamily: 'Montserrat-Regular'
    },
    namesel: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: color.white,
    },
});

