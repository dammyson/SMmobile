// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, ImageBackground, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'
import { getToken, processResponse,getWallet } from '../../component/utilities';

import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Pin from '../../component/view/Pin';
import Moment from 'moment';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import GiveAwayShare from '../../component/view/GiveAwayShare';
import GiveAwayShareMerchant from '../../component/view/GiveAwayShareMerchant';

export default class UpdateDonation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            done: false,
            failed: false,
            pin: false,
            items: [],
            qty: 0,
            amount: 0,
            balance: 0,
            code: [],
            operation_message: '',
            name: '',
            show_share: false,
            show_share_merchant: false,
            details: '',
            wallet_id:'',
        };
    }


    async componentWillMount() {
        const { items } = this.props.route.params;
        console.warn(items);
        this.setState({
            details: items,
            amount: items.amount
        });

       

        const wallet = JSON.parse(await getWallet())
        this.setState({
            wallet_id: wallet.id,
        })

        this.setState({ auth: await getToken() })
        this. getWalletRequest() 


    }

    getWalletRequest() {
        const { auth } = this.state
        console.warn(new Date)
        this.setState({ loading: true });
        fetch(URL.urltwo + '/wallet', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                AsyncStorage.setItem('wallet', JSON.stringify(res.data));
                this.setState({
                    wallet: res.data,
                    wallet_id: res.data.id,
                    balance: res.data.balance,
                    loading: false
                })
            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });

    };



    handleSuccessPin(code) {
        this.updateDonationProcess()
        this.setState({ pin: false, })
    }



    updateDonationProcess() {
        Moment.locale('en');
        const { qty,  wallet, auth, details } = this.state
        console.warn(wallet);
        if (qty == 0 ) {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }

       

        var Dbody = JSON.stringify({
            number_of_people: qty,
            from: Moment(new Date).format('YYYY-MM-DD'),
            to: "2029-07-30",
        });

        this.setState({ loading: true })
        fetch(URL.urlfour + '/api/donations/'+ details.id+'/extend', {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: Dbody,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn("updated result",statusCode, data);
                if (statusCode == 200) {
                    this.setState({
                        loading: false,
                        done: true,
                        operation_message: data.message,
                        details: data.data,
                    })
                } else if (statusCode == 412) {
                    this.setState({
                        loading: false,
                        visible: true
                    })
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                } else {
                    this.setState({
                        loading: false,
                        visible: true
                    })
                    this.setState({ loading: false, failed: true, operation_message: data.message })
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });
    }

    render() {
        const { details } = this.state
        if (this.state.loading) {
            return (
                <ActivityIndicator />
            );
        }
        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.state.done ?
                        this.success()
                        : this.state.failed ?
                            this.error()
                            :
                            this.state.pin ?
                                this.number()
                                :
                                this.donate()}
                </Content>
                {this.state.show_share ? this.rendShare(details) : null}
                {this.state.show_share_merchant ? this.rendShareMerchant(details) : null}
            </Container>
        );
    }


    donate() {
        const { state, goBack } = this.props.navigation;
        const { details } = this.state
        return (
            <View style={styles.backgroundImage}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                        <TouchableOpacity onPress={() => goBack()} >
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={color.primary_color}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>Update Donate</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>

                    <View style={styles.mainbody}>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Name </Text>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Enter Give away Name"
                                    placeholderTextColor='#3E3E3E'
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    defaultValue={details.purpose}
                                    autoCorrect={false}
                                    editable={false}
                                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                    onChangeText={text => this.setState({ name: text })}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Amount </Text>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Enter Amount "
                                    placeholderTextColor='#3E3E3E'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                    defaultValue={details.amount}
                                    editable={false}
                                    onChangeText={text => this.setState({ amount: text })}
                                />
                            </View>
                        </View>

                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Reach  To Be Added,  current reach ({details.number_of_people})</Text>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Enter Reach "
                                    placeholderTextColor='#3E3E3E'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                    onChangeText={text => this.setState({ qty: text })}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Budget </Text>
                            <View style={styles.inputBudget}>
                                <Text style={[styles.budget]}> NGN
                          <Text style={[styles.budget, this.state.qty * this.state.amount > this.state.balance ? { color: 'red' } : null]}> {this.state.qty * this.state.amount}</Text> </Text>
                            </View>
                        </View>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.setState({ pin: true })} >
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Update Giveaway</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                       


                    </View>
                </View>
            </View>
        )
    }

    onPress() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    onSuccessPress() {
        if(this.state.is_donor == 'false'){
            this.setState({ done: false, show_share: true })
        }else{
            this.setState({ done: false, show_share_merchant: true })
        }
       
    }
    success() {
        return (
            <Success
                onPress={() => this.onSuccessPress()}
                name={'Ayobami Ayeni'}
                message={this.state.operation_message}
            />

        );
    }

    error() {
        return (
            <Error
                onPress={() => this.onPress()}
                name={'Ayobami Ayeni'}
                message={this.state.operation_message} />
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

    onDownload(messages) {
        Toast.show({
            text: 'Giveaway Code ' + messages + ' !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

        this.setState({ show_share: false })
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    onClosePress() {

        this.setState({ show_share: false })
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    rendShare(details) {

        return (
            <GiveAwayShare
                onClose={() => this.onClosePress()}
                purpose={details.purpose}
                code={details.redemption_code}
                onShare={() => this.onDownload('shared')}
                onDownload={() => this.onDownload("saved to device")} />
        )
    }


    onClosePressGiveAway() {

        this.setState({ show_share_merchant: false })
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });
    }

    rendShareMerchant(details) {
        return (
            <GiveAwayShareMerchant
                onClose={() => this.onClosePressGiveAway()}
                purpose={details.purpose}
                wallet_id={this.state.wallet_id}
                code={details.redemption_code}
                onShare={() => this.onDownload('shared')}
                onDownload={() => this.onDownload("saved to device")} />
        )
    }

}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,


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
        fontFamily: 'Montserrat-Bold'
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
        paddingLeft: 12
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 14,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    inputBudget: {
        height: 65,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#d1d1d1',
        justifyContent: 'center',
    },
    budget: {
        marginLeft: 10,
        fontSize: 14,
        color: 'green',
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },
    successModalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        padding: 1,
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
    white: {
        color: 'white'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    input_border: {
        height: 28,
        width: 28,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 3,
        borderRadius: 14,
        margin: 10,
        marginLeft: 20,
        marginRight: 20
    },
    input_solid: {
        height: 26,
        width: 26,
        backgroundColor: '#fff',
        borderRadius: 10
    }

});



