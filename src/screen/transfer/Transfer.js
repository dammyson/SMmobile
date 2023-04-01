// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, Dimensions,Switch, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { View, Text, Content, Container, Button, Toast } from 'native-base';
import { Icon, Avatar } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import RNPickerSelect from 'react-native-picker-select';
import ActivityIndicator from '../../component/view/ActivityIndicator'
import SelectBank from '../../component/view/SelectBank'
import AddBank from '../../component/view/AddBank'
import Pin from '../../component/view/Pin';
import Success from '../../component/view/Success'
import Error from '../../component/view/Error'
import Bank from '../../component/view/Bank'
import { getToken, getWallet, getPref, getUserType, processResponse } from '../../component/utilities';
import color from '../../component/color'

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bloading: false,
            isEnabled: false,
            pin: false,
            option: 0,
            items: [],
            select_bank: false,
            add_bank: false,
            view_banks: false,
            failed: false,
            done: false,
            selected_bank_details: null,
            bank_list: [],
            pay_visible: false,
            view_balance: false,
            data: '',
            showBalance: true,
            balance: 0,
            auth: '',
            amount: '',
            user_id: '',
            wallet: '',

            bank_name: 'Select Bank',
            bank_code: '',
            account_number: '',
            account_name: '',
            role: '',
            payment_detail: null,
            operation_message: 'An Error Occured Please try again'
        };
    }

    async componentDidMount() {
        const pre = await getPref();
        setTimeout(async () => {
          if (await getPref() == "Instant") {
            this.setState({ isEnabled: true })
          } else {
            this.setState({ isEnabled: false })
          }
        }, 500);
      }
    
      toggleSwitch() {
        if (this.state.isEnabled) {
          this.updateWalletPref(null)
          this.setState({ isEnabled: false })
        } else {
          this.updateWalletPref('Instant')
          this.setState({ isEnabled: true })
        }
    
      }
    

    async componentWillMount() {
        const wallet = JSON.parse(await getWallet())
        this.setState({
            auth: await getToken(),
            wallet: wallet,
            balance: wallet.balance,
            bank_list: wallet.bank_accounts,
            role: await getUserType()
        })
        if (wallet.bank_accounts.length > 0) {
            const bank_accounts = wallet.bank_accounts;
            for (let i = 0; i < bank_accounts.length; i++) {
                if (!bank_accounts[i].is_virtual_account) {
                    this.setState({ selected_bank_details: bank_accounts[i] })
                }
            }
        }

    }


    setOption(data) {
        var index = data.value
        this.setState({
            option: index,
        })
    };

    getWalletRequest() {
        const { auth } = this.state
        console.warn(URL.urltwo)

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
                    balance: res.data.balance,
                    ledger_balance: res.data.ledger_balance,
                    loading: false
                })

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


    };

    handleSuccessPin(code) {
        this.setState({ pin: false })
        const { option } = this.state
        if (option == 1) {
            this.processMyBankTransfer()
        } else if (option == 2) {
            this.processIDTransfer(code)
        } else if (option == 3) {
            this.processOtherBankTransfer()
        }


    }

    processMyBankTransfer() {
        console.warn("my bank")

        const { amount, auth, selected_bank_details } = this.state
        if (amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }

        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('wallet_bank_id', selected_bank_details.id);
        formData.append('amount', amount);
        // formData.append('transaction_pin', pin);

        fetch(URL.urltwo + '/wallet/withdrawal', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res)
                this.setState({ loading: false })
                if (res.data.status == 'success') {
                    this.setState({ done: true, operation_message: res.message })
                } else {
                    this.setState({ failed: true, operation_message: res.message })
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                this.setState({ loading: false })
                this.setState({ failed: true, operation_message: 'Something went wrong please try again later' })

            });
    }

    getDetailRequest() {
        const { user_id, auth, amount } = this.state

        if (user_id == "" || amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }


        this.setState({ loading: true });

        fetch(URL.urltwo + '/wallet/holder/' + user_id, {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data)
                this.setState({
                    loading: false,
                })
                if (statusCode == 200) {
                    this.setState({
                        payment_detail: data.data,
                        pay_visible: true
                    })
                } else {
                    alert("User with this ID does not exit");
                }


            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });
    };


    processIDTransfer(pin) {

        const { amount, auth, wallet, payment_detail, } = this.state

        if (amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        } else {

        }
        var action_url = '/wallet/topup'
        var formData = new FormData();

        formData.append('sender_wallet_id', wallet.id);
        formData.append('recipient_id', payment_detail.id);
        formData.append('amount', amount);
        formData.append('transaction_pin', pin);


        this.setState({
            loading: true,
        })

        fetch(URL.urltwo + action_url, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                this.setState({
                    visible: false,
                    loading: false,
                })

                if (statusCode == 200) {
                    this.setState({ done: true, operation_message: data.message })
                } else if (statusCode == 401) {
                    this.setState({ failed: true, operation_message: data.message })
                } else if (statusCode == 422) {
                    this.setState({ failed: true, operation_message: data.message })
                } else if (statusCode == 412) {
                    this.setState({ failed: true, operation_message: data.message })
                } else {
                    this.setState({ failed: true, operation_message: 'Something went wrong please try again later' })
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                this.setState({ loading: false })
                this.setState({ failed: true, operation_message: 'Something went wrong please try again later' })
            });

    };


    selectedBank(v) {
        this.setState({
            selected_bank_details: v,
            select_bank: false
        })
    }

    selBank(v) {
        this.setState({
            bank_code: v.bankcode,
            bank_name: v.bankname,
            view_banks: false
        });
    }

    getBeneficiaryProcess(text) {

        const { bank_code, account_number, auth } = this.state

        this.setState({ account_name: '' })
        if (text.length == 10 && bank_code != "") {
            this.bRequest(bank_code, text, auth)
        } else if (text.length == 10 && bank_code == "") {
            Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
        }




    }

    bRequest(bank_code, account_number_entered, token) {

        this.setState({ bloading: true, account_number: account_number_entered })
        const formData = new FormData();

        formData.append('bankcode', bank_code);
        formData.append('accountnumber', account_number_entered);
        fetch(URL.urltwo + '/ext/banks/beneficiary-details', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }, body: formData,
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res);
                if (res.responsecode == '00') {
                    this.setState({
                        bloading: false,
                        account_name: res.accountname
                    })

                } else {
                    this.setState({
                        bloading: false,
                    })
                    Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ bloading: false })
            });
    }



    processOtherBankTransfer() {

        const { bank_name, amount, auth, bank_code, account_number, account_name, wallet, data } = this.state


        if (account_number == "" || account_name == "" || bank_code == "" || amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        } else {

        }

        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('amount', amount);
        formData.append('debit_wallet_id', wallet.id);
        formData.append('beneficiary_bank_name', bank_name);
        formData.append('beneficiary_bank_code', bank_code);
        formData.append('beneficiary_account_number', account_number);
        formData.append('beneficiary_account_name', account_name);

        fetch(URL.urltwo + '/wallet/transfer/external-bank', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                this.setState({ loading: false })
                if (statusCode == 200 || statusCode == 201) {
                    this.setState({ done: true, operation_message: data.message })
                } else if (statusCode == 401) {
                    this.setState({ failed: true, operation_message: data.message })
                } else if (statusCode == 422) {
                    this.setState({ failed: true, operation_message: data.message })
                } else if (statusCode == 412) {
                    this.setState({ failed: true, operation_message: data.message })
                } else {
                    this.setState({ failed: true, operation_message: 'Something went wrong please try again later' })
                }

            })
            .catch((error) => {
                alert(error.message);
                this.setState({ failed: true, operation_message: 'Something went wrong please try again later' })
            });

    }

    async updateWalletPref(auth) {
        const { wallet } = this.state
        var Dbody = JSON.stringify({
          auto_withdrawal: auth,
        });
        this.setState({ loading: true })
        fetch(URL.urltwo + '/wallet/' + wallet.id + '/preferences', {
          method: 'POST', headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + await getToken(),
            'Content-Type': 'application/json',
          }, body: Dbody,
        })
          .then(processResponse)
          .then(res => {
            this.setState({ loading: false })
            const { statusCode, data } = res;
            console.warn(statusCode, data);
            if (statusCode == 200) {
              if (data.error) {
    
              } else {
                Toast.show({
                    text: 'Wallet Prefrence updated!',
                    position: 'top',
                    type: 'success',
                    buttonText: 'Dismiss',
                    duration: 1500
                  });
                if (data.data.auto_withdrawal == 'Instant') {
                  AsyncStorage.setItem('wallet_pre',data.data.auto_withdrawal);
                  this.setState({
                    isEnabled: true
                  })
    
                } else {
                    AsyncStorage.setItem('wallet_pre', 'null');
                  this.setState({
                    isEnabled: false
                  })
                }
    
              }
            }
    
          })
          .catch(error => {
            alert(error.message);
            this.setState({ loading: false })
          });
    
    
      };


    render() {
        return (
            <>
                {this.state.view_banks ?
                    this._Bank()
                    :
                    this.state.add_bank ?
                        this._addBank()
                        :
                        <Container style={{ backgroundColor: '#fff' }}>
                            <Content>
                                {
                                    this.state.select_bank ?
                                        this._selectBank()
                                        :
                                        this.state.pin ?
                                            this._pin()
                                            :
                                            this.state.done ?
                                                this.success()
                                                :
                                                this.state.failed ?
                                                    this.error() :

                                                    this._transfer()
                                }
                            </Content>
                            {this._modalView()}
                            {this.state.loading ? <ActivityIndicator /> : null}
                        </Container>
                }

            </>

        );
    }
    _transfer() {
        const placeholder = {
            label: 'Select  Destination',
            value: null,
            color: "#000",
        };
        return (
            <>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
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
                            <Text style={styles.title}>Transfer</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>
                    <View style={styles.mainbody}>
                        <View style={styles.card_container}>
                            <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#3AA34E', '#005A11']} style={styles.card_body} >
                                <View style={styles.currency_container}>
                                    <View style={{ marginLeft: 10, padding: 6, backgroundColor: '#ffffff20', justifyContent: 'center', borderRadius: 40, marginBottom: 5 }}>
                                        <Icon
                                            name="currency-ngn"
                                            type='material-community'
                                            size={18}
                                            color={color.white}
                                        />
                                    </View>
                                </View>
                                <View style={styles.detatails_container}>
                                    <View style={styles.card_part_one}>
                                        <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}> Naira Wallet</Text>
                                        {this.state.showBalance ?
                                            <TouchableOpacity onPress={() => this.setState({ showBalance: false })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                <Icon
                                                    active
                                                    name="eye-with-line"
                                                    type='entypo'
                                                    color={'#ffffff70'}
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ showBalance: true })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                                <Icon
                                                    active
                                                    name="eye"
                                                    type='entypo'
                                                    color={'#ffffff70'}
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={styles.card_part_two}>

                                        {this.state.showBalance ?
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN {this.state.balance}</Text>
                                            :
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>NGN ****</Text>
                                        }

                                    </View>
                                    <View style={styles.card_part_three}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>Ledger Balance</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#fff', width: 2, marginRight: 10 }} />
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            {this.state.showBalance ?
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN {this.state.ledger_balance}</Text>
                                                :
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>NGN *****</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={{}}>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>From </Text>
                                <View style={styles.input}>
                                    <View style={{ flex: 1, justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>sendmonny Wallet </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>To </Text>
                                <View style={styles.input}>
                                    <View style={{ flex: 1, marginLeft: 2, justifyContent: 'center', }}>
                                        <RNPickerSelect
                                            placeholder={placeholder}
                                            placeholderTextColor={'#000'}
                                            items={[
                                                { label: 'My Bank Account', value: 1 },
                                                { label: 'Other Bank Account', value: 3 },
                                                { label: 'Other sendmonny Wallets', value: 2 },
                                            ]}
                                            onValueChange={value => {
                                                this.setOption({
                                                    value
                                                });
                                            }}
                                            style={pickerSelectStyles}
                                            value={this.state.account}
                                            useNativeAndroidPickerStyle={false}

                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>Amount </Text>
                                <View style={styles.inputtwo}>
                                    <TextInput
                                        defaultValue={this.state.amount}
                                        placeholder="Enter Amount "
                                        placeholderTextColor='#3E3E3E'
                                        returnKeyType="next"
                                        keyboardType="numeric"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                        maxLength={10}
                                        onChangeText={text => this.setState({ amount: text })}
                                    />
                                    <View style={{ width: 60, margin: 4, justifyContent: 'center', backgroundColor: '#D0F4D7', alignItems: 'center' }} >
                                        <Text style={{ fontSize: 12, color: 'green', fontFamily: 'Poppins-SemiBold', }}>NGN </Text>
                                    </View>
                                </View>
                            </View>

                            {
                                this.state.option == 1 ?
                                    this._myBankAccount() :
                                    this.state.option == 2 ?
                                        this._myBankAccountthree() :
                                        this.state.option == 3 ?
                                            this._OtherBankAccountthree() :
                                            null
                            }

                        </View>
                    </View>
                </View>
            </>
        )
    }


    _selectBank() {
        return (
            <SelectBank
                items={this.state.bank_list}
                onSelect={(v) => this.selectedBank(v)}
                onClose={() => this.setState({ select_bank: false })}
                removeBank={(data) => this.setState({ bank_list: data })} />
        )
    }

    _Bank() {
        return (
            <Bank
                onSelect={(v) => this.selBank(v)}
                onClose={() => this.setState({ view_banks: false })}
            />
        )
    }

    handAddBank(data) {

        if (data.bank_accounts.length > 0) {
            this.setState({
                bank_list: data.bank_accounts,
            })
            const bank_accounts = data.bank_accounts;
            for (let i = 0; i < bank_accounts.length; i++) {
                if (!bank_accounts[i].is_virtual_account) {
                    this.setState({ selected_bank_details: bank_accounts[i] })
                }
            }
        }
    }

    _addBank() {
        return (
            <AddBank
                onClose={() => this.setState({ add_bank: false })}
                onAdd={(data) => this.handAddBank(data)}
            />
        )
    }

    _pin() {
        return (
            <Pin
                onSuccess={(pin) => this.handleSuccessPin(pin)}
                onFail={() => this.setState({ pin: false })}
                onClose={() => this.setState({ pin: false })}
            />
        );
    }
    onPress() {
        this.props.navigation.replace('home')
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


    _myBankAccount() {
        const { selected_bank_details } = this.state
        return (
            <View style={{ marginTop: 15, marginBottom: 99 }}>


                {selected_bank_details !== null ?
                <>
                    <View style={[styles.textInputContainer]}>
                        <View style={[styles.input,{height:80}]}>
                            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
                                <View style={{ justifyContent: 'center', flex: 1, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
                                    <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{selected_bank_details.beneficiary_bank_name} </Text>
                                    <Text style={{ fontSize: 10, marginTop: 10, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', marginRight: 10 }}>{selected_bank_details.beneficiary_account_number} </Text>
                                    <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{selected_bank_details.beneficiary_account_name} </Text>
                                </View>
                                <View style={{ justifyContent: 'center', marginRight: 15, }} >
                                    <Image
                                        style={{ height: 50, width: 80, resizeMode: 'contain' }}
                                        source={require('../../assets/bank.png')}
                                    />
                                </View>



                            </View>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginHorizontal: 25 }} >
              <View style={{ justifyContent: 'center', flex: 2, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
                <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>Auto Withdraw </Text>
                <Text style={{ fontSize: 12, marginTop: 5, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', marginRight: 10 }}>Transfer your money to
your Bank automatically.</Text>

              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', }} >
                <View style={{ backgroundColor:'#D2D1F2', alignItems: 'center', justifyContent: 'center', borderRadius:12 }} >
                  <Switch
                    trackColor={{ false: '#D2D1F2', true: '#D2D1F2' }}
                    thumbColor={this.state.isEnabled ? '#4C46E9' : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.toggleSwitch()}
                    value={this.state.isEnabled}
                  />
                </View>
              </View>
            </View>
                    </>
                    :
                    <View style={{ marginLeft: 20, flexDirection: 'row', marginBottom: 20 }} >
                        <TouchableOpacity onPress={() => this.setState({ add_bank: true })} style={{ marginLeft: 20, height: 60, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                            <Icon
                                active
                                name="plus"
                                type='entypo'
                                color='#2D2C71'
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ select_bank: true })} style={{ marginLeft: 30, height: 60, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                            <FontAwesome5

                                name="hand-point-up"
                                color='#2D2C71'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>}

                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 7, opacity: 0.5, fontSize: 11, color: '#0F0E43', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>₦25 is charged for this Bank transfer. You can only transfer ₦5000 at a time.   </Text>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { marginBottom: 9 }]} block iconLeft>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.setState({ pin: true })} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Transfer </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }


    _myBankAccountthree() {
        return (
            <View style={{ marginTop: 15, marginBottom: 20 }}>
                <View style={styles.textInputContainer}>
                    <Text style={styles.actionbutton}>ID Number  </Text>
                    <View style={styles.inputtwo}>
                        <TextInput
                            placeholder="Enter ID Number  "
                            placeholderTextColor='#3E3E3E'
                            returnKeyType="next"
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                            maxLength={10}
                            onChangeText={text => this.setState({ user_id: text })}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15, }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('qr', { operation: 'top' })} style={{ marginLeft: 20, flex: 1, height: 65, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}> Scan QR code  </Text>
                    </TouchableOpacity>


                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { flex: 1, marginTop: 0 }]} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.getDetailRequest()} >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}> Transfer </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    _OtherBankAccountthree() {
        return (<View style={{ marginTop: 15, marginBottom: 20 }}>
            <View style={styles.textInputContainer}>
                <Text style={styles.actionbutton}>Bank   </Text>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => this.setState({ view_banks: true })} style={{ flex: 1, justifyContent: 'center' }} >
                        <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{this.state.bank_name} </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.actionbutton}>Bank Account </Text>
                <View style={styles.inputtwo}>
                    <TextInput
                        placeholder=""
                        placeholderTextColor='#3E3E3E'
                        returnKeyType="next"
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                        maxLength={10}
                        onChangeText={text => this.getBeneficiaryProcess(text)}

                    />
                </View>
            </View>



            <View style={styles.textInputContainer}>
                <Text style={styles.actionbutton}>Account Name </Text>
                <View style={styles.inputt}>
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
                        <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{this.state.account_name} </Text>
                        {this.state.bloading ? <PulseIndicator color={color.slide_color_dark} size={40} /> : null}
                    </View>
                </View>
            </View>
            <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 7, opacity: 0.5, fontSize: 11, color: '#0F0E43', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>₦25 is charged for this Bank transfer. You can only transfer ₦5000 at a time.   </Text>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.processThirdBank()}  >
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Transfer</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>)
    }



    processThirdBank() {
        if (this.state.bloading) {
            Alert.alert('Validation failed', 'Please wait for bank details to load', [{ text: 'Okay' }])
            return
        }
        this.setState({ pin: true })
    }


    _modalView() {
        return (
            <>
                <Modal
                    visible={this.state.pay_visible}
                >
                    <ModalContent style={{ width: Dimensions.get('window').width - 80, }}>
                        <View>


                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} >
                                <View style={styles.avartar}>
                                    <Avatar
                                        rounded
                                        source={require('../../assets/bank.png')}
                                        size="medium"
                                        icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                        overlayContainerStyle={{ backgroundColor: 'white', }}
                                        onPress={() => console.log("Works!")}
                                        containerStyle={{ borderRadius: 15, }}
                                    />
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} >
                                {this.state.payment_detail != null ?
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center', paddingBottom: 10, marginTop: 5, }}>{this.state.payment_detail.first_name} {this.state.payment_detail.last_name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>Marchant ID:</Text>
                                            <Text style={{ fontFamily: 'Montserrat-bold', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}> {this.state.payment_detail.user_id}</Text>
                                        </View>

                                    </View>

                                    : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#2D2C71', fontSize: 18, textAlign: 'center', paddingBottom: 10, marginTop: 5, }}>Guest</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>Marchant ID:</Text>
                                            <Text style={{ fontFamily: 'Montserrat-bold', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}> 00000000</Text>
                                        </View>

                                    </View>}





                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>Are you sure you want to transfer {this.state.amount} to this User?</Text>

                            </View>

                            <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 5, }}>



                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']}
                                    style={{ marginLeft: 20, flex: 1, height: 65, borderRadius: 5, justifyContent: 'center', alignItems: 'center', }} >
                                    <TouchableOpacity onPress={() => this.setState({ pay_visible: false, pin: true })} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}> Yes </Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <TouchableOpacity onPress={() => this.setState({ pay_visible: false })}
                                    style={{ marginLeft: 20, flex: 1, height: 65, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFECB4' }} >
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#FFC107', fontSize: 14 }}> No  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalContent>
                </Modal>



            </>
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
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
    },

    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 15,
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30
    },
    card_body: {
        backgroundColor: 'green',
        borderRadius: 10,
        flexDirection: 'row',
    },
    currency_container: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'flex-start',
    },
    detatails_container: {
        flex: 1,
        marginTop: 15,
    },
    card_part_one: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 20,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    tiles_container: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    tile_body: {
        backgroundColor: 'green',
        borderRadius: 10,
        flexDirection: 'row',
    },

    list_container: {
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 75

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
        marginRight: 25,
        marginLeft: 25,

    },
    input: {
        height: 60,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        backgroundColor: color.grey
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
    inputtwo: {
        height: 60,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        flexDirection: 'row'
    },
    buttonContainer: {
        height: 65,
        flex: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 30,
        borderRadius: 5,
    },
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



