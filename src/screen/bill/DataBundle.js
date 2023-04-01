// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, Image, ImageBackground, TextInput, Dimensions, FlatList, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Pin from '../../component/view/Pin';
import { getToken, getWallet, processResponse, makeUrlStringFromObject } from '../../component/utilities';
import color from '../../component/color'
import CustomAlert from '../../component/view/CustomAlert';
import SelectPhoneNumber from '../../component/view/SelectPhoneNumber';
export default class DataBundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            bank: '',
            data: '',
            amount: '',
            phone: '',
            show_alert: false,
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
            amount: 0,
            operation_message: '',
            name: '',
            custormer_code: '',
            wallet: '',
            product_name: 'Select product',
            product_list: [],
        };
    }

    async componentWillMount() {
        this.setState({
            auth: await getToken(),
            wallet: JSON.parse(await getWallet())
        })

    }


    segmentClicked = (index) => {
        console.warn(index);
        this.setState({
            activeIndex: index
        })

        this.getProductRequest(index)
    }


    getProductRequest(product) {
        console.warn(URL.urlthree + '/utility/' + product)
        const { auth, wallet } = this.state
        this.setState({ loading: true });
        fetch(URL.urlthree + '/utility/' + product + '/databundle', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(processResponse)
            .then(res => {
                console.warn(res)
                const { statusCode, data } = res;
                console.warn(data.data)
                this.setState({ loading: false, })
                if (statusCode == 200) {
                    this.setState({ product_name: 'Select product', product_list: data.data })
                }

            })
            .catch(error => {
                console.warn(error)
                alert(error.message);
                this.setState({ loading: false })
            });
    };



    atemptRecharge() {
        const { amount, product_name, custormer_code } = this.state

        if (custormer_code == '' || product_name == 'Select product') {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }
        this.setState({ pin: true, })


    }


    handleSuccessPin(code) {
        this.makePaymentRequest()
        this.setState({ pin: false, })
    }


    makePaymentRequest() {
        const { auth, wallet, item, amount, product_name, custormer_code } = this.state

        if (custormer_code == '' || product_name == 'Select product') {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }
        var details = {
            'amount': amount,
            'customer': custormer_code,
            'type': item.biller_name,
            'item_code': item.item_code,
            'biller_code': item.biller_code,
            'wallet_id': wallet.id
        };
      


        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('customer', custormer_code);
        formData.append('type', item.biller_name);
        formData.append('item_code', item.item_code);
        formData.append('biller_code', item.biller_code);
        formData.append('wallet_id', wallet.id);

        console.warn(formData)
        this.setState({ loading: true });
        fetch(URL.urlthree + '/utility/purchase', {
            method: 'POST', headers: {

                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                if (statusCode == 200) {
                    this.setState({
                        loading: false,
                        view_success: true,
                        operation_message: data.message,
                    })
                } else if (statusCode == 412) {
                    this.setState({ loading: false, view_error: true, operation_message: data.message })
                } else {
                    this.setState({ loading: false, view_error: true, operation_message: data.message })
                }
            })
            .catch((error) => {
                console.warn(error);
                this.setState({ loading: false, view_error: true, operation_message: error.message })
            });

    };

    render() {
        if (this.state.loading) {
            return (

                <ImageBackground
                    source={require('../../assets/user_bg.png')}
                    style={{ width: Dimensions.get('window').width,  height: Dimensions.get('window').height,}}
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
                { this.state.show_contacts ? this.renderSelectContact() :
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
                        {this.state.show_alert ? this.renderAlert() : null}
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
                        <Text style={styles.title}>Data</Text>
                    </View>
                    <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                </View>


                <View style={{ marginLeft: 20, justifyContent: 'center', marginBottom: 10, marginTop: 15 }}>
                    <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>Choose Network </Text>
                </View>

                <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, marginBottom: 20 }}>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center' }, this.state.activeIndex == "mtn" ? { opacity: 1 } : { opacity: 0.5 }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("mtn")}
                            active={this.state.activeIndex == "mtn"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/mtn.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "mtn" ? styles.active_network_text : styles.inactive_network_text]}> MTN   </Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "9mobile" ? { opacity: 1 } : { opacity: 0.5 }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("9mobile")}
                            active={this.state.activeIndex == "9mobile"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/etis.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "9mobile" ? styles.active_network_text : styles.inactive_network_text]}> 9MOBILE</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "glo" ? { opacity: 1 } : { opacity: 0.5 }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("glo")}
                            active={this.state.activeIndex == "glo"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/glo.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "glo" ? styles.active_network_text : styles.inactive_network_text]}> GLO</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                    <View style={[{ flex: 1, marginLeft: 5, marginRight: 5, alignItems: 'center', }, this.state.activeIndex == "airtel" ? { opacity: 1 } : { opacity: 0.5 }]} >
                        <TouchableOpacity style={styles.network_card} transparent
                            onPress={() => this.segmentClicked("airtel")}
                            active={this.state.activeIndex == "airtel"}
                        >
                            <Image
                                style={{ margin: 10, width: 50, height: 50, justifyContent: 'center', resizeMode: 'contain' }}
                                source={require('../../assets/airtel.png')}
                            />

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[this.state.activeIndex == "airtel" ? styles.active_network_text : styles.inactive_network_text]}> AIRTEL</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={styles.mainContent}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Bundle </Text>
                        <TouchableOpacity onPress={() => this.setState({ show_alert: true })} style={styles.inputtwo}>
                            <Text style={[{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }, this.state.product_name == 'Select product' ? { color: '#0F0E4350' } : {}]}>{this.state.product_name} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Phone Number</Text>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="Input Phone Number"
                                defaultValue={this.state.phone}
                                placeholderTextColor='#3E3E3E50'
                                returnKeyType="next"
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ custormer_code: text })}
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
                                <Text style={{ color: '#4b47b7', fontSize: 12, fontWeight: 'bold' }}>Choose from contacts  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Amount </Text>
                        <View style={styles.inputBudget}>
                            <Text style={[styles.budget]}> {this.state.amount}</Text>
                        </View>
                    </View>


                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.atemptRecharge()}  >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Enter</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>
        )
    }

    onPress() {
        this.props.navigation.navigate('home')
    }
    success() {
        return (
            <Success
                onPress={() => this.onPress()}
                name={'Ayobami Ayeni'}
                message={this.state.message} />
        );
    }

    error() {
        return (
            <Error
                onPress={() => this.onPress()}
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
            custormer_code: index.phoneNumbers[0].number,
            show_contacts: false
        });

    }





    renderAlert() {

        return (
            <CustomAlert
                onSelect={(v) => this._handleCountrySelect(v)}
                title={'Hold on'}
                showButton={this.state.show_alert}
                onClose={() => this.setState({ show_alert: false })}
                Body={() => this.renderList()}
            />
        )
    }


    renderList() {

        return (
            <>
                {this.state.product_list.length < 1 ?
                    <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            name="info"
                            size={100}
                            type='material'
                            color={color.primary_color}
                        />
                        <Text style={{ margin: 20, fontSize: 12, color: color.primary_color, fontFamily: 'Poppins-SemiBold', }}>Please select a provider </Text>
                    </View> :

                    <View style={{ paddingTop: 1, paddingBottom: 10, flex: 1, }}>
                        <FlatList
                            style={{ paddingBottom: 5 }}
                            data={this.state.product_list}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListHeaderComponent={this.renderHeader}
                        />
                    </View>
                }

            </>

        )
    }

    _handleCategorySelectNew = (item) => {
        this.setState({ show_alert: false })
        this.setState({
            product_name: item.biller_name.toUpperCase(),
            amount: item.amount,
            item: item,

        })

    }
    renderItem = ({ item, }) => {
        return (
            <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginBottom: 15, marginTop: 15, borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5 }}
                onPress={() => this._handleCategorySelectNew(item)} underlayColor="red">
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>

                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={styles.nameList}>{item.biller_name.toUpperCase()}</Text>

                    </View>
                </View>

            </TouchableOpacity>

        )

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
       
    },
    mainContent: {
        flex: 1,

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
    sideContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: Dimensions.get('window').width,
       
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#2D2C71',
        textAlign: 'center',
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
        paddingLeft: 12,
        flexDirection: 'row'
    },
    inputtwo: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        alignItems: 'center',
        paddingLeft: 12,
        flexDirection: 'row'
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 5
    },
    active_network_text: {
        fontFamily: 'Poppins-Bold',
        color: '#FFC107',
        textAlign: 'center',
        fontSize: 10,
    },
    inactive_network_text: {
        fontFamily: 'Poppins-Medium',
        color: '#5D5D5D50',
        textAlign: 'center',
        fontSize: 10,
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

