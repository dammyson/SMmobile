import React from 'react';
import { Alert, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, } from 'react-native-elements'
import ActivityIndicator from './ActivityIndicator'
import URL from '../server'
import { getToken, getWallet, processResponse } from '../../component/utilities';

export default class Pin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            auth: '',
            loading: false

        };
    }

    async componentWillMount() {
        this.setState({
            auth: await getToken(),
        })
    }

    render() {
        const { onClose} = this.props;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4C46E9', '#2D2C71']} style={styles.backgroundImage} block iconLeft>
                <View style={{ height: 40 , justifyContent:'flex-end', alignItems:'flex-end'}}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 25 }}>

                        <TouchableOpacity onPress={() => onClose()}>
                            <Icon
                                name="closecircle"
                                size={20}
                                type='antdesign'
                                color={'red'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 18, marginBottom: 6, fontWeight: '500' }}> Enter your pin</Text>

                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#fff', textAlign: 'center', fontSize: 13, marginBottom: 30, }}>
                            We will require this pin to process transactions </Text>
                    </View>
                </View>
                <View style={{ height: 40 }}></View>
                <View style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    {this.renderDot()}
                </View>
                <View style={{ height: 40 }}></View>
                <View style={{ flex: 1.4 }}>
                    {this.renderNumber()}
                </View>
                <View style={{ height: 40 }}></View>
                {this.state.loading ? <ActivityIndicator /> : null}
            </LinearGradient>
        );
    }

    renderNumber() {
        let rows = [];
        let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['', 0, '<=']];
        for (let i = 0; i < 4; i++) {
            rows.push(<View key={i} style={styles.row}>{this.rendernumberRow(nums[i])}</View>);
        }
        return rows;
    }

    rendernumberRow(nums) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(
                <TouchableOpacity
                    key={nums[j]}
                    style={styles.btn}
                    onPress={() => this._onPressButton(nums[j])}>
                    {nums[j] == '<=' ?
                        <Icon
                            name="ios-backspace"
                            size={30}
                            type='ionicon'
                            color={'#fff'}
                        /> :
                        <Text style={styles.btnText}>{nums[j]}</Text>}
                </TouchableOpacity>
            );
        }
        return row;
    }

    renderDot() {
        let row = [];
        for (let j = 1; j < 5; j++) {
            row.push(
                <View style={styles.input_border}>
                    {j <= this.state.code.length ? <View style={styles.input_solid} /> : null}
                </View>
            );
        }
        return row;
    }

    _onPressButton(text) {
        const { label, icon, onChange, onSuccess} = this.props;
        if (text == '<=') {
            var instant_array = []
            instant_array = this.state.code
            instant_array.pop()
            this.setState({ code: instant_array })
        } else {
            var instant_array = []
            instant_array = this.state.code
            instant_array.push(text)
            this.setState({ code: instant_array })

        }
        if (this.state.code.length == 4) {
            var ar = this.state.code.toString().replace(/,/g, "")
            onSuccess(ar)
           // this.verifyPin(ar)
        }
    }

    onFail() {
        const { onFail, } = this.props;
        onFail()

    }
    verifyPin(pin) {
        const { onSuccess, } = this.props;
        const { auth, } = this.state



        this.setState({ loading: true })

        const formData = new FormData();
        formData.append('transaction_pin', pin);
        fetch(URL.url + '/transaction-pin/validate', {
            method: 'POST', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
            }, body: formData,
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                if (statusCode == 201) {
                    this.setState({ loading: false })
                    onSuccess(pin)
                } else {
                    this.setState({ loading: false, view_balance: true, aler_message: 'Wrong Transaction Pin' })
                    Alert.alert(
                        'Alert',
                        'Wrong transaction Pin',
                        [
                            { text: 'Retry', onPress: () => this.setState({ code: [] }), style: 'cancel' },
                            { text: 'Cancle', onPress: () => this.onFail(), style: 'destructive' },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch((error) => {
                console.log("Api call error");
                console.warn(error);
                alert(error.message);
                this.setState({ loading: false })
            });

    }


}

Pin;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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