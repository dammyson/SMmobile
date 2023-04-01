// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, FlatList, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'

import color from '../../component/color'
import { getToken, processResponse } from '../../component/utilities';

import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Pin from '../../component/view/Pin';
import Moment from 'moment';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import CustomAlert from '../../component/view/CustomAlert';

export default class Utilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            auth:'',
            done: false,
            product_name:'Select product',
            show_alert: false,
            failed: false,
            pin: false,
            product_list: [],
            item:{},
            qty: 0,
            amount: 0,
            balance: 0,
            code: [],
            operation_message: '',
            name: '',
            custormer_code:''
        };
    }


    async componentDidMount() {
        this.setState({ auth: await getToken() })
       this.getProductRequest()


    }

    handleSuccessPin(code) {
        this.setState({ pin: false, })
        this.makePaymentRequest()
       
    }


    getProductRequest() {
        const { auth, wallet } = this.state
        this.setState({ loading: true });
        fetch(URL.urlthree + '/utility/lcc', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(data.data )
                this.setState({ loading: false,})
                if (statusCode == 200) {
                    this.setState({ product_list: data.data })
                }
               
            })
            .catch(error => {
                console.warn(error)
                alert(error.message);
                this.setState({ loading: false })
            });
    };

    makePaymentRequest() {
        const { auth, wallet, item, amount, custormer_code } = this.state
        //this.setState({ loading: true });

        console.warn( auth, wallet, item, amount, custormer_code )
        
    };

    render() {
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
                {this.state.show_alert ? this.renderAlert() : null}
            </Container>
        );
    }


    donate() {
        const { state, goBack } = this.props.navigation;
        const placeholder = {
            label: 'Select  Destination',
            value: null,
            color: "#000",
        };
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
                            <Text style={styles.title}>Utilities</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>
                    <View style={styles.mainbody}>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Biller </Text>
                            <TouchableOpacity onPress={() => this.setState({ show_alert: true })} style={styles.inputtwo}>
                                <Text style={[{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', },  this.state.product_name == 'Select product' ? { color: '#0F0E4350' } : {}]}>{this.state.product_name} </Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>E-Tag Code</Text>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="E-Tag Code"
                                    placeholderTextColor='#3E3E3E50'
                                    defaultValue={this.state.custormer_code}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                    onChangeText={text => this.setState({ custormer_code: text })}
                                />
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <Text style={styles.actionbutton}>Amount </Text>
                            <View style={styles.inputtwo}>
                                <TextInput
                                    defaultValue={this.state.amount}
                                    placeholder="Enter Amount "
                                    placeholderTextColor='#3E3E3E50'
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                    maxLength={10}
                                    onChangeText={text => this.setState({ amount: text })}
                                />
                                <View style={{ width: 60, height:50, justifyContent: 'center',  borderRadius: 5, backgroundColor: '#D0F4D7', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 12, color: 'green', fontFamily: 'Poppins-SemiBold', }}>NGN </Text>
                                </View>
                            </View>
                        </View>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.setState({ pin: true })} >
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Enter</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        )
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
        )
    }

    _handleCategorySelect = (item) => {
        this.setState({ show_alert: false })
        this.setState({
            product_name:item.biller_name.toUpperCase(),
            item:item
         })
        console.warn(item)
       
      }
    renderItem = ({ item, }) => {
        return (
          <TouchableOpacity style={{ marginLeft: 20, marginRight: 20, marginBottom: 15, marginTop: 15, borderBottomColor: '#d1d1d1', borderBottomWidth: 0.5 }}
            onPress={() => this._handleCategorySelect(item)} underlayColor="red">
            <View style={{ flex: 1, flexDirection: 'row', justifyContent:'center' }}>
    
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                              
                            </View>
              <View style={{ flex: 1, }}>
                <Text style={styles.nameList}>{item.biller_name.toUpperCase()}</Text>
    
              </View>
            </View>
    
          </TouchableOpacity>
    
        )
    
      }
    

    onPress() {
        this.props.navigation.replace('donationlist')
    }
    success() {
        return (
            <Success
                onPress={() => this.onPress()}
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
        height: 50,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12
    },
    inputtwo: {
        height: 50,
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
    inputBudget: {
        height: 50,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#EFF2F5',
        justifyContent: 'center',
    },
    budget: {
        marginLeft: 10,
        fontSize: 14,
        color: 'green',
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30,
        // to ensure the text is never behind the icon
    },
});



