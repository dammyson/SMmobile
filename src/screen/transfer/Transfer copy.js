// React native and others libraries imports
import React, { useState, useEffect } from 'react';
import { Alert, StatusBar, TextInput, Dimensions, Switch, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
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
import { getWallet, getPref, getUserType, processResponse } from '../../component/utilities';
import color from '../../component/color'
import { lightTheme } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';
import SlideUpAlert from '../../component/SlideUpAlert';
import { font } from '../../constants';
import { baseUrl, getToken } from '../../utilities';
import PopUpAlert from '../../component/view/PopUpAlert';
import MiniCardBalance from '../../component/view/MiniCardBalance';


const Transfer = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [bloading, setBLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [isAddToBeneficiary, setIsAddToBeneficiary] = useState(false);
    const [pin, setPin] = useState(false);
    const [option, setOption] = useState(0);
    const [items, setItems] = useState([]);
    const [selectBank, setSelectBank] = useState(false);
    const [addBank, setAddBank] = useState(false);
    const [viewBanks, setViewBanks] = useState(false);
    const [failed, setFailed] = useState(false);
    const [done, setDone] = useState(false);
    const [selectedBankDetails, setSelectedBankDetails] = useState(null);
    const [bankList, setBankList] = useState([]);
    const [payVisible, setPayVisible] = useState(false);
    const [viewBalance, setViewBalance] = useState(false);
    const [data, setData] = useState('');

    const [balance, setBalance] = useState(0);
    const [auth, setAuth] = useState('');
    const [amount, setAmount] = useState(10);
    const [userId, setUserId] = useState('');
    const [wallet, setWallet] = useState('');
    const [bankName, setBankName] = useState('Select Bank');
    const [bankCode, setBankCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [role, setRole] = useState('');
    const [paymentDetail, setPaymentDetail] = useState({});
    const [operationMessage, setOperationMessage] = useState('An Error Occurred. Please try again');


    const [alert, setAlert] = useState({ height: 350, type: 1 })
    const [showAlert, setShowAlert] = useState(false)
    const [destinationText, setDestinationText] = useState('Select  Destination')


    const initiate = async () => {
        const pre = await getPref();
        setTimeout(async () => {
            if (await getPref() == "Instant") {
                setIsEnabled(false)
            } else {
                setIsEnabled(true)
            }
        }, 500);
    }

    const toggleSwitch = () => {
        if (isEnabled) {
            updateWalletPref(null)
            setIsEnabled(false)
        } else {
            updateWalletPref('Instant')
            setIsEnabled(true)
        }

    }


    const loadData = async () => {
        const wallet = JSON.parse(await getWallet())
        console.warn(wallet.balance.data.currentBalance);

        setAuth(await getToken())
        console.warn(await getToken())
        setWallet(wallet)
        setRole(await getUserType())
        setBalance(wallet.balance.data.currentBalance)
        // this.setState({

        //     wallet: wallet,
        //     balance: wallet.balance,
        //     bank_list: wallet.bank_accounts,
        //     role: await getUserType()
        // })
        // if (wallet.bank_accounts.length > 0) {
        //     const bank_accounts = wallet.bank_accounts;
        //     for (let i = 0; i < bank_accounts.length; i++) {
        //         if (!bank_accounts[i].is_virtual_account) {
        //             this.setState({ selected_bank_details: bank_accounts[i] })
        //         }
        //     }
        // }

    }


    useEffect(() => {
        initiate()
        loadData()
    }, []);


    const setOptions = (data) => {
        setShowAlert(false)
        setDestinationText(data.label)
        setOption(data.value)
    };

    const getWalletRequest = () => {
        dispatch(SHOW_LOADER("Getting wallet"))

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

                setBalance(res.data.balance.data.currentBalance)
                setPoint(res.data.points)
                setLedgerBalance(res.data.balance.data.availableBalance)
                setWallet(res.data)


            })
            .catch(error => {
                alert(error.message);
                //hide Loading
            });


    };

    const handleSuccessPin = (code) => {
        console.warn(option)
        setPin(false)
        if (option == 1) {
            processMyBankTransfer(code)
        } else if (option == 2) {
            processIDTransfer(code)
        } else if (option == 3) {
            processOtherBankTransfer(code)
        }


    }

    const processMyBankTransfer = () => {
        console.warn("my bank")

        // if (accountNumber == "" || accountName == "" || bankCode == "" || amount == "") {
        //     Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
        //     return
        // } else {

        // }

        //show loader
        var action_url = '/transfers'

        var formData = JSON.stringify({
            sender_wallet_id: wallet.id,
            amount: Number(amount),
            pin: code,
            narration: "internal",
            islocal: false,
            //account_number: accountNumber,
            //bank_code: bankCode
            account_number: "8013171401",
            bank_code: "999240"

        })

        console.warn(formData)

        dispatch(SHOW_LOADER("Sending to bank account"))

        fetch(baseUrl() + action_url, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                dispatch(HIDE_LOADER())
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                //hide loader
                if (statusCode == 200 || statusCode == 201) {
                    setDone(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 401) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 422) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 412) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else {
                    setFailed(true)
                    setOperationMessage('Something went wrong please try again later')

                }

            })
            .catch((error) => {
                alert(error.message);
                setFailed(true)
                setOperationMessage('Something went wrong please try again later')
            });
    }

    const getDetailRequest = () => {

        dispatch(SHOW_LOADER("Getting wallet"))

        if (userId == "" || amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        }

        console.warn(userId, amount)
        //shoe loader

        fetch(baseUrl() + '/wallets/holder/' + userId, {
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
                //hide loader
                if (statusCode == 200) {
                    setPaymentDetail(data.data)
                    setPayVisible(true)

                } else {
                    Alert.alert("User with this ID does not exit");
                }


            })
            .catch(error => {
                Alert.alert(error.message);
                // hide loader
            }).finally(() => dispatch(HIDE_LOADER())
            )
    };


    const processIDTransfer = (pin) => {


        if (amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        } else {

        }
        var action_url = '/transfers'

        var formData = JSON.stringify({
            sender_wallet_id: wallet.id,
            amount: Number(amount),
            pin: pin,
            narration: "internal",
            islocal: true,
            reciever_wallet_id: paymentDetail.wallet_id,

        })

        console.error(formData)
        //show loader

        fetch(baseUrl() + action_url, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data);


                if (statusCode == 200) {
                    setDone(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 401) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 422) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 412) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else {
                    setFailed(true)
                    setOperationMessage('Something went wrong please try again later')
                }

            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                //hide loader
                setFailed(true)
                setOperationMessage('Something went wrong please try again later')
            }).finally(() => dispatch(HIDE_LOADER())
            )

    };


    const selectedBank = (v) => {
        setSelectBank(false)
        console.warn(v);
        setSelectedBankDetails(v)

    }

    const selBank = (v) => {
        console.warn(v);
        setBankCode(v.bankCode)
        setBankName(v.name)
        setViewBanks(false)
    }

    const getBeneficiaryProcess = (text) => {
        setAccountName('')
        if (text.length == 10 && bankCode != "") {
            bRequest(bankCode, text, auth)
        } else if (text.length == 10 && bankCode == "") {
            Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
        }
    }

    const bRequest = (bank_code, account_number_entered, token) => {
        console.warn()
        setBLoading(true)
        setAccountNumber(account_number_entered)

        // const formData = {
        //     account_number: account_number_entered,
        //     bank_code: bank_code
        // }

        const formData = {
            account_number: "8013171401",
            bank_code: "999240"
        }
        console.warn(formData)
        fetch(baseUrl() + '/bank', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }, body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => {
                setBLoading(false)
                console.warn(res.data.data);
                if (res.status) {
                    setBLoading(false)
                    setAccountName(res.data.data.accountName)

                } else {
                    setBLoading(false)
                    Alert.alert('Validation failed', 'Select Bank and enter account number again', [{ text: 'Okay' }])
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                setBLoading(false)
            });
    }



    const processOtherBankTransfer = (code) => {

        if (accountNumber == "" || accountName == "" || bankCode == "" || amount == "") {
            Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
            return
        } else {

        }

        //show loader
        var action_url = '/transfers'

        var formData = JSON.stringify({
            sender_wallet_id: wallet.id,
            amount: Number(amount),
            pin: code,
            narration: "internal",
            islocal: false,
            //account_number: accountNumber,
            //bank_code: bankCode
            account_number: "8013171401",
            bank_code: "999240"

        })
        console.warn(action_url)
        console.warn(formData)

        dispatch(SHOW_LOADER("Sending to bank account"))

        fetch(baseUrl() + action_url, {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                dispatch(HIDE_LOADER())
                const { statusCode, data } = res;
                console.warn(statusCode, data);
                //hide loader
                if (statusCode == 200 || statusCode == 201) {
                    setDone(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 401) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 422) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else if (statusCode == 412) {
                    setFailed(true)
                    setOperationMessage(data.message)
                } else {
                    setFailed(true)
                    setOperationMessage('Something went wrong please try again later')

                }

            })
            .catch((error) => {
                alert(error.message);
                setFailed(true)
                setOperationMessage('Something went wrong please try again later')
            });

    }

    const updateWalletPref = async (auth) => {

        var Dbody = JSON.stringify({
            auto_withdrawal: auth,
        });
        //show loader
        fetch(URL.urltwo + '/wallet/' + wallet.id + '/preferences', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }, body: Dbody,
        })
            .then(processResponse)
            .then(res => {
                //hide loader
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
                            AsyncStorage.setItem('wallet_pre', data.data.auto_withdrawal);
                            setIsEnabled(true)

                        } else {
                            AsyncStorage.setItem('wallet_pre', 'null');
                            setIsEnabled(false)
                        }

                    }
                }

            })
            .catch(error => {
                alert(error.message);
                // hide loader
            });


    };





    const _transfer = () => {
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
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={lightTheme.PRIMARY_COLOR}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>Transfer</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>
                    <View style={styles.mainbody}>

                        <MiniCardBalance balance={balance} />

                        <View style={{}}>
                            {/* <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>From </Text>
                                <View style={styles.input}>
                                    <View style={{ flex: 1, justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>sendmonny Wallet </Text>
                                    </View>
                                </View>
                            </View> */}
                            <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>To </Text>
                                <View style={styles.input}>
                                    <View style={{ flex: 1, marginLeft: 2, justifyContent: 'center', }}>
                                        <TouchableOpacity onPress={() => setShowAlert(true)}>
                                            <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{destinationText}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                            <View style={styles.textInputContainer}>
                                <Text style={styles.actionbutton}>Amount </Text>
                                <View style={styles.inputtwo}>
                                    <TextInput
                                        defaultValue={amount}
                                        placeholder="Enter Amount "
                                        placeholderTextColor='#3E3E3E'
                                        returnKeyType="next"
                                        keyboardType="numeric"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                        maxLength={10}
                                        onChangeText={text => setAmount(text)}
                                    />
                                    <View style={{ width: 60, margin: 4, justifyContent: 'center', backgroundColor: '#D0F4D7', alignItems: 'center' }} >
                                        <Text style={{ fontSize: 12, color: 'green', fontFamily: 'Poppins-SemiBold', }}>NGN </Text>
                                    </View>
                                </View>
                            </View>

                            {
                                option == 1 ?
                                    SendToBankAccount() :
                                    option == 2 ?
                                        sendToSMWallet() :
                                        null
                            }

                        </View>
                    </View>
                </View>
            </>
        )
    }


    const _selectBank = () => {
        return (
            <SelectBank
                items={[]}
                onSelect={(v) => selectedBank(v)}
                onClose={() => setSelectBank(false)}
                removeBank={(data) => setBankList(data)} />
        )
    }

    const _Bank = () => {
        return (
            <Bank
                onSelect={(v) => selBank(v)}
                onClose={() => setViewBanks(false)}
            />
        )
    }

    // const handAddBank = (data) => {

    //     if (data.bank_accounts.length > 0) {

    //         setBankList(data.bank_accounts)
    //         const bank_accounts = data.bank_accounts;
    //         for (let i = 0; i < bank_accounts.length; i++) {
    //             if (!bank_accounts[i].is_virtual_account) {
    //                 setSelectedBankDetails(bank_accounts[i])
    //             }
    //         }
    //     }
    // }

    const _addBank = () => {
        return (
            <AddBank
                onClose={() => setAddBank(false)}
                onAdd={(data) => handAddBank(data)}
            />
        )
    }

    const _pin = () => {
        return (
            <Pin
                onSuccess={(pin) => handleSuccessPin(pin)}
                onFail={() => setPin(false)}
                onClose={() => setPin(false)}
            />
        );
    }
    const onPress = () => {
        navigation.replace('home')
    }
    const success = () => {
        return (
            <Success
                onPress={() => onPress()}
                name={'Ayobami Ayeni'}
                message={operationMessage}
            />

        );
    }

    const error = () => {
        return (
            <Error
                onPress={() => onPress()}
                name={'Ayobami Ayeni'}
                message={operationMessage} />
        );
    }


    const _myBankAccount = () => {

        return (
            <View style={{ marginTop: 15, marginBottom: 99 }}>


                {selectedBankDetails !== null ?
                    <>
                        <View style={[styles.textInputContainer]}>
                            <View style={[styles.input, { height: 80 }]}>
                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }} >
                                    <View style={{ justifyContent: 'center', flex: 1, marginRight: 15, alignItems: 'flex-start', marginVertical: 15 }} >
                                        <Text style={{ fontSize: 14, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{selectedBankDetails.bank_name} </Text>
                                        <Text style={{ fontSize: 10, marginTop: 10, color: '#3E3E3E', fontFamily: 'Poppins-Regurlar', marginRight: 10 }}>{selectedBankDetails.account_number} </Text>
                                        <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{selectedBankDetails.account_name} </Text>
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
                                <View style={{ backgroundColor: '#D2D1F2', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }} >
                                    <Switch
                                        trackColor={{ false: '#D2D1F2', true: '#D2D1F2' }}
                                        thumbColor={isEnabled ? '#4C46E9' : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => this.toggleSwitch()}
                                        value={isEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                    :
                    <View style={{ marginLeft: 20, flexDirection: 'row', marginBottom: 20 }} >
                        <TouchableOpacity onPress={() => setAddBank(true)} style={{ marginLeft: 20, height: 60, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                            <Icon
                                active
                                name="plus"
                                type='entypo'
                                color='#2D2C71'
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectBank(true)} style={{ marginLeft: 30, height: 60, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                            <FontAwesome5

                                name="hand-point-up"
                                color='#2D2C71'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>}

                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 7, opacity: 0.5, fontSize: 11, color: '#0F0E43', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>₦25 is charged for this Bank transfer. You can only transfer ₦5000 at a time.   </Text>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { marginBottom: 9 }]} block iconLeft>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => setPin(true)} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Transfer </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        )
    }


    const sendToSMWallet = () => {
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
                            onChangeText={text => setUserId(text)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('qr', { operation: 'top' })} style={{ marginLeft: 20, flex: 1, height: 65, width: 70, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D5D4E2' }} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}> Scan QR code  </Text>
                    </TouchableOpacity>


                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={[styles.buttonContainer, { flex: 1, marginTop: 0 }]} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => getDetailRequest()} >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}> Transfer </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    const SendToBankAccount = () => {
        return (
            <View style={{ marginTop: 15, marginBottom: 20 }}>
                <View style={{ marginLeft: 20, flexDirection: 'row', backgroundColor: 'red' }} >
                    <Text style={{ marginRight: 20, marginTop: 7, opacity: 0.5, fontSize: 11, color: '#0F0E43', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>Select from beneficiary  </Text>
                </View>
                <View style={styles.textInputContainer}>
                    <Text style={styles.actionbutton}>Bank   </Text>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={() => setViewBanks(true)} style={{ flex: 1, justifyContent: 'center' }} >
                            <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{bankName} </Text>
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
                            onChangeText={text => getBeneficiaryProcess(text)}

                        />
                    </View>
                </View>



                <View style={styles.textInputContainer}>
                    <Text style={styles.actionbutton}>Account Name </Text>
                    <View style={styles.input}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >
                            <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}>{accountName} </Text>
                            {bloading ? <PulseIndicator color={color.slide_color_dark} size={40} /> : null}
                        </View>
                    </View>
                </View>
                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 7, opacity: 0.5, fontSize: 11, color: '#0F0E43', textAlign: 'center', fontFamily: 'Poppins-Regular' }}>₦25 is charged for this Bank transfer. You can only transfer ₦5000 at a time.   </Text>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => processThirdBank()}  >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Transfer</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>)
    }



    const processThirdBank = () => {
        if (bloading) {
            Alert.alert('Validation failed', 'Please wait for bank details to load', [{ text: 'Okay' }])
            return
        }
        setPin(true)
    }





    const renderSelectDestination = () => {
        const body = () => {
            return (
                <View style={{ flex: 1 }}>
                    {destinations.map((item) => (
                        <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: '#BFBFBF', paddingVertical: 25, paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => setOptions(item)} style={{ flex: 1, }}>
                                <Text style={{ color: lightTheme.PRIMARY_TEXT_COLOR, fontSize: 14, fontFamily: font.BOLD }}>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{ marginBottom: 15, marginTop: 20 }}>
                    </View>
                </View>
            )
        }
        return (
            <SlideUpAlert
                title={'Hold on'}
                height={alert.height}
                showButton={true}
                onClose={() => setShowAlert(false)}
                Body={() => body()} />
        )
    }

    const UserIDConfirmation = () => {
        const header = () => {
            return (
                <View style={{ height: 0, }}>

                </View>
            )
        }

        const body = () => {
            return (
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }} >
                        {paymentDetail != null ?
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, textAlign: 'center', paddingBottom: 10, marginTop: 5, }}>{paymentDetail.first_name} {paymentDetail.last_name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>Marchant ID:</Text>
                                    <Text style={{ fontFamily: 'Montserrat-bold', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}> {paymentDetail.user_id}</Text>
                                </View>
                            </View>

                            : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#2D2C71', fontSize: 18, textAlign: 'center', paddingBottom: 10, marginTop: 5, }}>Guest</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>User ID:</Text>
                                    <Text style={{ fontFamily: 'Montserrat-bold', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}> 00000000</Text>
                                </View>
                            </View>}


                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, }}>Are you sure you want to transfer {amount} to this User?</Text>
                    </View>

                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 5, }}>
                        <TouchableOpacity onPress={() => [setPin(true), setPayVisible(false)]} style={{ marginLeft: 20, flex: 1, height: 65, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: lightTheme.PRIMARY_COLOR }} >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}> Yes </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPin(false)}
                            style={{ marginLeft: 20, flex: 1, height: 65, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFECB4' }} >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#FFC107', fontSize: 14 }}> No  </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginHorizontal: 5, marginVertical: 15 }} >
                        <View style={{ justifyContent: 'center', flex: 2, marginRight: 1, alignItems: 'flex-start' }} >
                            <Text style={{ fontSize: 12, color: '#3E3E3E', fontFamily: font.SEMI_BOLD }}>Add to Your beneficiary </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', }} >
                            <View style={{ backgroundColor: '#D2D1F2', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }} >
                                <Switch
                                    trackColor={{ false: '#D2D1F2', true: '#D2D1F2' }}
                                    thumbColor={isAddToBeneficiary ? '#4C46E9' : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setIsAddToBeneficiary(true)}
                                    value={isAddToBeneficiary}
                                />
                            </View>
                        </View>
                    </View>


                </View>
            )
        }
        return <PopUpAlert Header={() => header()} Body={() => body()} height={350} />

    }


    return (
        <>
            {viewBanks ?
                _Bank()
                :
                addBank ?
                    _addBank()
                    :
                    <Container style={{ backgroundColor: '#fff' }}>
                        <Content>
                            {
                                selectBank ?
                                    _selectBank()
                                    : _transfer()
                            }
                        </Content>
                        {showAlert ? renderSelectDestination() : null}
                        {payVisible ? UserIDConfirmation() : null}
                        {failed ? error() : null}
                        {done ? success() : null}
                        {pin ? _pin() : null}

                    </Container>
            }

        </>

    );

}

export default Transfer



const destinations = [
    { label: 'Bank Account', value: 1 },
    { label: 'Sendmonny Wallets', value: 2 },
]
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



