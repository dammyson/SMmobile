// React native and others libraries imports
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, } from 'react-native';
import { View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import color from '../color'



export default class HalfDigitalBalanceCard extends Component {
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

    statistics = () => {
        return this.props.statistics();

    }


    render() {
        const { onClose, name, balance, currency, theme, ledger_balance, ledger_label } = this.props;

        return (
            <View style={styles.card_container}>
                <View style={[styles.card_body, { backgroundColor: theme + '40', }]} >
                    <View style={{flex:1}}>
                        <View style={styles.currency_container}>
                            <View style={{ marginLeft: 10, padding: 2, paddingHorizontal:4, backgroundColor: theme, justifyContent: 'center', borderRadius: 40, marginBottom: 2, }}>
                                <Icon
                                    name="bitcoin"
                                    type='font-awesome'
                                    size={10}
                                    color={color.white}
                                />
                            </View>

                            <View style={{ alignItems: 'center', marginLeft: 5 }}>
                                <Text style={{ color: "#3E3E3E90", fontSize: 10, fontWeight: '200', fontFamily: 'Poppins-Regular', }}>{name}</Text>
                            </View>
                        </View>

                        <View style={styles.details_container}>
                            <View style={styles.card_part_two}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: theme, fontSize: 15, }}>{currency} {balance}</Text>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: "#3E3E3E", fontSize: 10, marginTop: -5 }}>{ledger_balance}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginRight:5}}>
                    {this.statistics()}
                    </View>
                </View>

            </View>
        );
    }
}
HalfDigitalBalanceCard


const styles = StyleSheet.create({

    card_container: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        width: Dimensions.get('window').width / 2 - 25,


    },
    card_body: {
        backgroundColor: '#3AA34E50',
        borderRadius: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        flex: 1
    },
    currency_container: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    details_container: {
        marginTop: 1,
        marginBottom: 5
    },
    card_part_one: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 11,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },





});



