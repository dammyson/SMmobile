// React native and others libraries imports
import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, } from 'react-native';
import { View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import color from '../color'



export default class HalfVirtualBalanceCard extends Component {
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
                <View style={styles.card_body} >
                    <View style={styles.currency_container}>
                        <View style={{ marginLeft: 10, padding: 4, backgroundColor: '#3AA34E', justifyContent: 'center', borderRadius: 40, marginBottom: 5,  }}>
                            <Icon
                                name="currency-ngn"
                                type='material-community'
                                size={10}
                                color={color.white}
                            />
                        </View>

                        <View style={{ alignItems: 'center', marginLeft:5}}>
                            <Text style={{ color: "#3E3E3E90", fontSize:10, fontWeight: '200',  fontFamily: 'Poppins-Regular', }}>{name}</Text>
                        </View>
                    </View>

                    <View style={styles.details_container}>
                        <View style={styles.card_part_two}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: "#3AA34E", fontSize: 15, }}>{currency}  {balance}</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}
HalfVirtualBalanceCard


const styles = StyleSheet.create({

    card_container: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        width: Dimensions.get('window').width / 2 - 25,
       // flexDirection: 'row',
       
    },
    card_body: {
        backgroundColor: '#3AA34E30',
        borderRadius: 10,
        paddingLeft:10
    },
    currency_container: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    details_container: {
        marginTop: 1,
        marginBottom: 15
    },
    card_part_one: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    card_part_two: {
        marginLeft: 12,
        marginRight: 20
    },
    card_part_three: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },





});



