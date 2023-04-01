// React native and others libraries imports
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, } from 'react-native';
import { View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import color from '../color'



export default class VirtualBalanceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visible: false,
            loading: true,
            view_balance: false,
            data: '',
            showBalance: true,
            showBusBalance: true,
            showBitBalance: true,
            balance: 0,
            auth: '',
            type: '',
            ledger_balance: 0,
            title: 'false'
        };
    }


    componentWillMount() {
    }




    hideBallance() {
        if (this.state.showBalance) {
            this.setState({ showBalance: false })
        } else {
            this.setState({ showBalance: true })
        }
    }

    ledger = () => {
        return this.props.ledger();

    }


    render() {
        const { onClose, name, balance, currency, theme, ledger_balance, ledger_label } = this.props;

        return (
            <View style={styles.card_container}>
                <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={theme} style={styles.card_body} >
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
                            <Text style={{ color: color.white, fontSize: 12, fontWeight: '200', flex: 1, }}>{name}</Text>
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
                                <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>{currency}  {balance}</Text>
                                :
                                <Text style={{ fontFamily: 'Poppins-Medium', color: color.white, fontSize: 22, }}>{currency} ****</Text>
                            }
                        </View>
                        <View style={styles.card_part_three}>
                            <View style={{ flex: 1.5, justifyContent: 'center' }}>
                                <Text style={{ color: color.white, fontSize: 11, fontFamily: 'Poppins-Regular', flex: 1, }}>{ledger_label}</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', width: 0.5, marginRight: 10 }} />
                            <View style={{ flex: 1, alignItems: 'flex-end', }}>

                                        {this.state.showBalance ?
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}> {currency} {" "} {ledger_balance}</Text>
                                            :
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: color.white, fontSize: 11, }}>{currency}  *****</Text>
                                        }
                                  
                            </View>
                        </View>
                    </View>
                </LinearGradient>

            </View>
        );
    }
}
VirtualBalanceCard


const styles = StyleSheet.create({

    card_container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20
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





});



