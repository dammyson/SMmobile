// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, Image, ImageBackground, TextInput, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Pin  from '../../component/view/Pin';
import { getToken, getWallet, processResponse } from '../../component/utilities';
import color from '../../component/color'
import SelectPhoneNumber from '../../component/view/SelectPhoneNumber';
export default class Airtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            bank: '',
            data: '',
            pin: '',
            amount: '',
            phone: '',
            loading: false,
            view_success: false,
            view_error: false,
            pin: false,
            show_contacts: false,
            auth: '',
            activeIndex: "",
            view_balance: false,
            message: '',
            wallet: '',
            code: [],
        };
    }

  async  componentWillMount() {
        const wallet = JSON.parse(await getWallet())
        this.setState({
            auth: await getToken(),
            wallet: wallet,
            balance: wallet.balance,
            bank_list: wallet.bank_accounts
        })
        if (wallet.bank_accounts.length > 0) {
            this.setState({
                selected_bank_details: wallet.bank_accounts[0]
            })
        }

    }


    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }
    rechargPhone() {
        const { pin, amount, auth, phone, wallet, activeIndex } = this.state
        this.setState({ view_balance: false })


        if (phone == "" || amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }

        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('wallet_id', wallet.id);
        formData.append('amount', amount);
        formData.append('mobilenumber', phone);
        formData.append('product', activeIndex);

        fetch(URL.urlthree + '/airtime/purchase', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(this.processResponse)
            .then(res => {
                this.setState({ loading: false })
               
                const { statusCode, data } = res;
                console.warn(statusCode, data );
                if (statusCode == 200) {
                    if (data.data.status == 'success') {
                        this.setState({ view_success: true, message: data.message })
                    } else {
                        this.setState({ view_error: true, message: data.message })
                    }
                } else if (statusCode == 412) {
                    this.setState({ view_error: true, message: data.message })
                } else {
                    this.setState({ view_error: true, message: "Error Processing operation please try again later" })
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });

    }

    atemptRecharge() {

        const { amount, phone, activeIndex, } = this.state
        if (amount < 100) {
            Alert.alert('Validation failed', 'Minimum recharg ammont is ₦100', [{ text: 'Okay' }])
            return
        }
        else {
            if (phone.length != 11) {
                Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
                return
            } else {

                    if(activeIndex==""){
                        Alert.alert('Validation failed', 'Please select a network provider', [{ text: 'Okay' }])
                        return
                    }else{
                        this.setState({pin:true})
            }
            }
        }

    }


    handleSuccessPin(code){
        this.rechargPhone()
        this.setState({ pin: false, })
    }



    processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    render() {
        if (this.state.loading) {
            return (

                <ImageBackground
                    source={require('../../assets/user_bg.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.welcome}>
                            <PulseIndicator color={color.slide_color_dark} size={70} />
                        </View>
                    </View>
                </ImageBackground>
            );
        }

        return (
            <>
            { this.state.show_contacts ? this.renderSelectContact()  :
             <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.state.view_success ?
                        this.success()
                        :
                        this.state.view_error ?
                            this.error()
                            : this.state.pin ?
                                this.number()
                                :
                                this.airtime()}
                </Content>
            </Container>
    }
            </>
        );
    }


    airtime() {
        return (
            <View style={styles.body}>
                <View style={{ height: 20 }}></View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Icon
                            name="arrowleft"
                            size={30}
                            type='antdesign'
                            color={color.primary_color}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={styles.title}>Airtime</Text>
                    </View>
                    <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                </View>


                <View style={{ marginLeft: 20, justifyContent: 'center', marginBottom: 10, marginTop: 15 }}>
                    <Text style={{ color: '#2E2E2E80', fontFamily: 'Poppins-Medium', fontSize: 12 }}>   Choose Network </Text>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginBottom: 20 }}>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center' }, this.state.activeIndex == "MTN" ?  { backgroundColor: '#fff' } : {backgroundColor: '#ffffff50' }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("MTN")}
                            active={this.state.activeIndex == "MTN"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/mtn.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "MTN" ? styles.active_network_text : styles.inactive_network_text]}> MTN   </Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "9MOBILE" ?  { backgroundColor: '#fff' } : {backgroundColor: '#ffffff50' }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("9MOBILE")}
                            active={this.state.activeIndex == "9MOBILE"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/etis.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "9MOBILE" ? styles.active_network_text : styles.inactive_network_text]}> 9MOBILE</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "GLO" ? { backgroundColor: '#fff' } : {backgroundColor: '#ffffff50' }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("GLO")}
                            active={this.state.activeIndex == "GLO"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/glo.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "GLO" ? styles.active_network_text : styles.inactive_network_text]}> GLO</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "AIRTEL" ?  { backgroundColor: '#fff' } : {backgroundColor: '#ffffff50' }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("AIRTEL")}
                            active={this.state.activeIndex == "AIRTEL"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/airtel.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "AIRTEL" ? styles.active_network_text : styles.inactive_network_text]}> AIRTEL</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={styles.mainContent}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Amount </Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Input Amount "
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ amount: text })}
                            />
                          
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Phone Number</Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Input Phone Number"
                                defaultValue={this.state.phone}
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ phone: text })}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Icon
                                    name="phone"
                                    size={22}
                                    type='entypo'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginRight: 7, }}>
                        <TouchableOpacity onPress={() => this.setState({ show_contacts: true })} >
                            <Text style={{ color:'#4b47b7', fontSize: 12, fontWeight: 'bold' }}>Choose from contacts  </Text>
                        </TouchableOpacity>
                    </View>
                    </View>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() =>this.atemptRecharge() }  >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Enter</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>
        )
    }

    onPress () {
       this.props.navigation.navigate('home')
      }
    success() {
        return (
            <Success 
            onPress={()=> this.onPress() } 
            name={'Ayobami Ayeni'} 
            message={this.state.message} />
        );
    }

    error() {
        return (
            <Error 
            onPress={()=> this.onPress() } 
            name={'Ayobami Ayeni'} 
            message={this.state.message} />
        );
    }

    number() {
        return (
            <Pin
                onSuccess={(pin) => this.handleSuccessPin(pin)}
                onFail={() => this.setState({ pin: false })}
                onClose={() => this.setState({ pin: false })}
            />
        );
    }


    renderSelectContact() {
        return (
            <SelectPhoneNumber
                onSelect={(v) => this._handleCategorySelect(v)}
                onClose={() => this.setState({ show_contacts: false })} />
        )
    }


    _handleCategorySelect = (index) => {
        console.warn(index)
        this.setState({
            phone: index.phoneNumbers[0].number,
            show_contacts: false
        });

    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,
        marginHorizontal:10

    },
    sideContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 14,
        color: '#2D2C71',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'
    },
    textInputContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
    input: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        flexDirection: 'row'
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 10,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 29,
    },
    network_card: {
        backgroundColor: '#fff',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 5
    },
    active_network_text: {
        fontFamily: 'Poppins-Bold',
        color: '#FFC107',
        textAlign: 'center',
        fontSize: 10,
        marginBottom:10,
    },
    inactive_network_text: {
        fontFamily: 'Poppins-Medium',
        color: '#5D5D5D50',
        textAlign: 'center',
        fontSize: 10,
        marginBottom:10,
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        margin: 3,
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#d1d1d1",
    },
    successModalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },


});

