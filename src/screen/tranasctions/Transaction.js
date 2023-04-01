
// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image, AsyncStorage, StatusBar } from 'react-native';
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import {
    LineChart,
} from "react-native-chart-kit";
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../component/color'
import Moment from 'moment';
import { getType } from '../../component/utilities';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityIndicator from '../../component/view/ActivityIndicator';
import { baseUrl, getToken, getUser, getWallet } from '../../utilities';

// in Expo - swipe left to see the following styling, or create your own
const chartConfig = {
    backgroundColor: '#FFF',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `#000`,
    style: {
        borderRadius: 10
    }
};

const data = {
    labels: ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43, 53],
            color: (opacity = 1) => `rgba(251, 192, 47, ${opacity})`, // optional
            strokeWidth: 5 // optional
        }
    ],
};

const graphStyle = {
    marginVertical: 2,
};

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            activeIndex: 1,
            loading: true,
            data: '',
            auth: '',
            wallet: '',
            show_menu: true,
            show_graph: true,
            show_graph_line: false,
            credit_items: [],
            cr_amount: 0,
            dr_amount: 0,
            debit_items: [],

        };
    }


  async  componentDidMount() {

    this.setState({ 
        wallet: JSON.parse(await getWallet()),  
        data: JSON.parse(await getUser()),  
        auth: await getToken()
      })
    
     
        this.getWalletTransactionRequest()
     
    }



    getWalletTransactionRequest() {
        const { auth, wallet } = this.state
        this.setState({ loading: true });

        fetch(baseUrl() + '/transactions/', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(this.processResponse)
            .then(res => {
                
                const { statusCode, data } = res;
                console.warn(data)
                if (statusCode == 200) {
                   // this.sortTransactions(data.data, wallet.id)
                }
            })
            .catch(error => {
                console.warn(error)
                alert(error.message);
                this.setState({ loading: false })
            });
    };

    processResponse(response) {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
            statusCode: res[0],
            data: res[1]
        }));
    }

    currencyFormat(n) {
        return n.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    sortTransactions(data, id) {
        let cr_array = [];
        let dr_array = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].debit_wallet_id == id) {
                dr_array.push(data[i])
            } else {
                cr_array.push(data[i])
            }
        }
        var cr_amount = 0
        for (let i = 0; i < cr_array.length; i++) {
            cr_amount = cr_amount + parseInt(cr_array[i].amount);
        }
        var dr_amount = 0
        for (let i = 0; i < dr_array.length; i++) {
            dr_amount = dr_amount + parseInt(dr_array[i].amount);
        }
        this.setState({ loading: false })
        this.setState({ credit_items: cr_array, cr_amount: cr_amount, debit_items: dr_array, dr_amount: dr_amount })

    }

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }



    renderCreditResuts(data) {
        Moment.locale('en');
        const { wallet } = this.state
        let cat = [];
        for (var i = 0; i < data.length; i++) {
            let id = i;
            cat.push(
                <TouchableOpacity onPress={() => this.selectTransaction(data[id])} style={styles.resultBox}>
                    <View style={styles.resultDescription}>
                        <View style={styles.resultTextDescription}>
                            {data[i].status == 'success' ?
                                <Text style={{ fontFamily: 'Poppins-Light', marginLeft:3, color: 'green', fontWeight: '600', fontSize: 8, }}>{data[i].status} </Text>
                                :
                                <Text style={{ fontFamily: 'Poppins-Light', color: 'red', marginLeft:3, fontWeight: '600', fontSize: 8, }}>{data[i].status} </Text>
                            }
                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#0F0E43', fontSize: 12, marginLeft:3, }}>{Moment(data[i].created_at).format('llll')} </Text>

                            <View style={{ }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 10, opacity: 0.8, }}>{data[i].dr_first_name} {data[i].dr_last_name}</Text>
                            </View>

                        </View>
                        <View style={styles.resultButtonContainer}>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: '#2D2C71', fontSize: 14, }}>N {data[i].amount}  </Text>
                        </View>
                    </View>
                </TouchableOpacity >
            );
        }
        return cat;
    }

    renderDebitResuts(data) {
        Moment.locale('en');
        const { wallet } = this.state
        let cat = [];
        for (var i = 0; i < data.length; i++) {
            let id = i;
            cat.push(
                <TouchableOpacity onPress={() => this.selectTransaction(data[id])} style={styles.resultBox}>

                    <View style={styles.resultDescription}>
                        <View style={styles.resultTextDescription}>

                            {data[i].status == 'success' || data[i].status == 'Success' ?
                                <Text style={{ fontFamily: 'Poppins-Light',  color: 'green', fontWeight: '600', fontSize: 8, }}>{data[i].status} </Text>
                                :
                                <Text style={{ fontFamily: 'Poppins-Light', color: 'red', fontWeight: '600', fontSize: 8, }}>{data[i].status} </Text>
                            }


                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#0F0E43', fontSize: 12, }}>{Moment(data[i].created_at).format('llll')} </Text>
                            <View style={{ }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 10, opacity: 0.8,}}>{data[i].cr_first_name} {data[i].cr_last_name} {data[i].category == 'bills_payment' ? data[i].biller_category : getType(data[i].category)} </Text>
                            </View>
                        </View>
                        <View style={styles.resultButtonContainer}>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: '#2D2C71', fontSize: 14, }}>N{data[i].amount}  </Text>
                        </View>
                    </View>
                </TouchableOpacity >
            );
        }
        return cat;
    }


    selectTransaction(item) {
        this.props.navigation.navigate('transaction_d', { items: item })
    }

    render() {
        const width = Dimensions.get('window').width - 60
        const height = 220
        if (this.state.loading) {
            return (
                <ActivityIndicator />
            );
        }
        return (
            <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height, }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#3AA34E" />
                <LinearGradient colors={['#3AA34E', '#005A11']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1, height: Dimensions.get('window').height, }}>

                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', height: 60, paddingLeft: 20, width: Dimensions.get('window').width, }}>
                            <View style={{ justifyContent: 'center', width: 30, alignItems: 'center' }}></View>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.title}>Transaction</Text>
                            </View>


                            <TouchableOpacity onPress={() => this.getWalletTransactionRequest()} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                <Icon
                                    name="reload"
                                    size={20}
                                    type='material-community'
                                    color={color.primary_color}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainContent}>
                            {this.state.show_menu ? this._renderSubMenu() : null}
                            <View>
                                {this.state.activeIndex == 0 ? this.renderCredit() : this.renderDebit()}
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }



    renderCredit() {
        return (
            <ScrollView>
                {this.renderGraph("Credit", this.state.cr_amount, [])}
                {this.renderCreditResuts(this.state.credit_items)}
            </ScrollView>
        )
    }

    renderDebit() {
        return (
            <ScrollView>
                {this.renderGraph("Debit", this.state.dr_amount, [])}
                {this.renderDebitResuts(this.state.debit_items)}
            </ScrollView>
        )
    }

    renderGraph(type, amount, balance, data) {
        return (

            <View style={styles.sideContent}>
                <View style={{}}>
                <View style={{ justifyContent: 'center', flexDirection: 'row',  alignItems: 'center',  }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 22, color: '#3aa34e90', textAlign: 'center', }}>NGN {this.currencyFormat(amount)}</Text>
                   </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row',  alignItems: 'center',  }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', marginLeft: 20, fontSize: 11, color: '#3E3E3E70', textAlign: 'center' }}>Total Balance </Text>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#3E3E3E70', textAlign: 'center', marginRight: 20, }}>NGN{this.state.wallet.balance}</Text>
                    </View>
                    {this.state.show_graph_line ?
                        <>
                            <View style={styles.whitecard}>
                                <LineChart
                                    data={data}
                                    width={Dimensions.get('window').width - 8}
                                    height={200}
                                    chartConfig={chartConfig}
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', justifyContent: 'flex-end', marginRight: 20, marginBottom: 6, }}>
                                <Icon
                                    name="graph"
                                    size={20}
                                    type='simple-line-icon'
                                    color="green"
                                />
                                <Text style={{ marginLeft: 10, fontFamily: 'Poppins-Regular', color: '#2D2C71', marginRight: 10, fontSize: 14, }}>Hide graph </Text>
                                <TouchableOpacity onPress={() => this.setState({ show_graph_line: false })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                                    <Icon
                                        active
                                        name="eye-with-line"
                                        type='entypo'
                                        color={'#707070'}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View></> : null}

                </View>

            </View>


        );
    }

    _renderSubMenu() {
        return (
            <View style={{ flexDirection: 'row', borderTopLeftRadius: 20, borderTopRightRadius: 20,  backgroundColor:'#EFF2F5' }}>


                <TouchableOpacity style={[this.state.activeIndex == 1 ? styles.activeType : styles.inActiveType]}
                    onPress={() => this.segmentClicked(1)}>

                    <Text style={[this.state.activeIndex == 1 ? styles.toggleText : styles.toggleTextInactive]}>Debit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[this.state.activeIndex == 0 ? styles.activeType : styles.inActiveType]}
                    onPress={() => this.segmentClicked(0)}
                >

                    <Text style={[this.state.activeIndex == 0 ? styles.toggleText : styles.toggleTextInactive]}>Credit</Text>
                </TouchableOpacity>



            </View>
        );

    }

}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,


    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,
        width: Dimensions.get('window').width,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#EFF2F5'

    },
    sideContent: {
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: color.white,


    },
    sideContenttwo: {
        flex: 1,

    },
    filter: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    whitecard: {
        padding: 10,
        borderRadius: 15,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"

    },
    resultButtonContainer: {
        marginLeft: 3,
        marginRight: 1,
        borderRadius: 20,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        alignItems: 'center',
    },
    resultTextDescription: {
        flex: 1

    },
    resultDescription: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultBox: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 2,
        marginTop: 2,
        borderColor: '#70707040',
        borderBottomWidth: 0.4
    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    activeType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    inActiveType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    toggleText: {
        color: color.black,
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
    toggleTextInactive: {
        color: '#5F5C7F',
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
});






