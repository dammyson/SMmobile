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
            activeIndex: 0,
            loading: true,
            data: '',
            auth: '',
            wallet: '',

        };
    }


    componentDidMount() {
        AsyncStorage.getItem('auth').then((value) => {
            if (value == '') { } else {
                this.setState({ auth: value })
            }


        })
        AsyncStorage.getItem('wallet').then((value) => {
            if (value == '') { } else {
                this.setState({ wallet: JSON.parse(value) })
            }

            this.getWalletTransactionRequest()

        })


    }



    getWalletTransactionRequest() {
        const { auth, wallet } = this.state
        this.setState({ loading: true });


        fetch(URL.urltwo + '/wallet/transactions/' + wallet.id, {
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
                    this.setState({
                        items: data.data,
                        loading: false
                    })
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

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image style={{ flex: 1, width: undefined, height: undefined }} source={image} />
                </View>
            )
        })

    }
    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View>
                    <View style={{
                        margin: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#000',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 1,
                        paddingBottom: 30,
                        paddingTop: 30
                    }} >
                        <Button
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            onPress={() => this.props.navigation.navigate('createservice')} transparent>
                            <Icon name="add" ></Icon>
                            <Text style={{ color: '#4d4d4d' }}>added a service</Text>
                        </Button>
                    </View>

                </View>
            )
        }
        else if (this.state.activeIndex == 1) {
            return (
                <View>
                    <View style={{
                        margin: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#000',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 1,
                        paddingBottom: 30,
                        paddingTop: 30
                    }} >
                        <Button
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            onPress={() => this.props.navigation.navigate('createservice')} transparent>
                            <Icon name="add" ></Icon>
                            <Text style={{ color: '#4d4d4d' }}>add a service</Text>
                        </Button>
                    </View>

                </View>
            )
        } else if (this.state.activeIndex == 2) {
            return (
                <View>
                    <View style={{
                        margin: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#000',
                        borderStyle: 'dotted',
                        borderWidth: 1,
                        borderRadius: 1,
                        paddingBottom: 30,
                        paddingTop: 30
                    }} >
                        <Button
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}
                            onPress={() =>this.props.navigation.navigate('createservice')} transparent>
                            <Icon name="add" ></Icon>
                            <Text style={{ color: '#4d4d4d' }}> a service</Text>
                        </Button>
                    </View>

                </View>
            )
        }
    }

    renderResuts(data) {
        Moment.locale('en');
        const { wallet } = this.state
        let cat = [];
        for (var i = 0; i < data.length; i++) {
            cat.push(
                <View style={styles.resultBox}>

                    <View style={styles.resultDescription}>
                        <View style={styles.resultTextDescription}>

                            {data[i].status == 'success' ?
                                <Text style={{ fontFamily: 'Poppins-Light', color: 'green', fontWeight: '600', fontSize: 10, }}>{data[i].status} </Text>
                                :
                                <Text style={{ fontFamily: 'Poppins-Light', color: 'red', fontWeight: '600', fontSize: 10, }}>{data[i].status} </Text>
                            }


                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#0F0E43', fontWeight: '700', fontSize: 14, marginTop: 6, marginBottom: 6 }}>{Moment(data[i].created_at).format('llll')} </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 11, opacity: 0.78, marginRight: 5 }}>ID 154869 </Text>
                                <Icon
                                    name="ios-arrow-round-forward"
                                    size={20}
                                    type='ionicon'
                                    color="green"
                                />

                                <Text style={{ fontFamily: 'Poppins-Regular', color: '#3E3E3E', fontSize: 11, opacity: 0.78, marginLeft: 5 }}>ID 154869 </Text>

                            </View>

                        </View>


                        <TouchableOpacity style={styles.resultButtonContainer}>
                            <Text style={{ fontFamily: 'Poppins-Regular', color: '#2D2C71', fontSize: 14, }}>{data[i].debit_wallet_id == wallet.id ? '-' : '+'}N {data[i].amount}  </Text>
                        </TouchableOpacity>
                    </View>
                </View >
            );
        }
        return cat;
    }

    render() {
        const width = Dimensions.get('window').width - 60
        const height = 220
        if (this.state.loading) {
            return (

                <ImageBackground
                    source={require('../../assets/user_bg.png')}
                    style={styles.loadingBackgroundImage}
                    resizeMode="cover"
                >
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.welcome}>
                            <PulseIndicator color={color.slide_color_dark} size={70} />
                        </View>
                    </View>
                </ImageBackground>
            );
        }
        return (

            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#3AA34E', '#1D5227']} style={styles.backgroundImage} block iconLeft>
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
                                    <Text style={styles.title}>Donate</Text>
                                </View>
                                <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                            </View>

                                <View style={styles.mainContent}>

                                    {this._renderSubMenu()}

                                    {this.renderGraph()}


                                    <View>
                                        <ScrollView>
                                            {this.renderResuts(this.state.items)}
                                        </ScrollView>


                                    </View>
                                </View>
                        </View>

                    </LinearGradient>
                </Content>
            </Container>
        );
    }


    renderGraph() {
        return (

            <View style={styles.sideContent}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, color: 'green', textAlign: 'center', marginRight: 20, }}>NGN 500,000</Text>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', marginLeft: 20, fontSize: 11, color: '#3E3E3E', textAlign: 'left' }}>Total Credit     </Text>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#3E3E3E70', textAlign: 'left', marginRight: 20, }}>     NGN 500,210 </Text>
                    </View>

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

                    <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'flex-end', marginRight: 20, marginBottom: 6 }}>
                        <Icon
                            name="graph"
                            size={20}
                            type='simple-line-icon'
                            color="green"
                        />
                        <Text style={{ marginLeft: 10, fontFamily: 'Poppins-Regular', color: '#2D2C71', marginRight: 10, fontSize: 14, }}>Hide graph </Text>
                        <TouchableOpacity onPress={() => this.setState({ showBalance: false })} style={{ flexDirection: 'row', marginLeft: 30, alignItems: 'center', justifyContent: "center" }} >
                            <Icon
                                active
                                name="eye-with-line"
                                type='entypo'
                                color={'#707070'}
                                size={20}
                            />
                        </TouchableOpacity>


                    </View>

                </View>

            </View>
        );
    }

    _renderSubMenu() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={[this.state.activeIndex == 0 ? styles.activeType : styles.inActiveType]}
                    onPress={() => this.segmentClicked(0)}
                >

                    <Text style={[this.state.activeIndex == 0 ? styles.toggleText : styles.toggleTextInactive]}>Bank Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[this.state.activeIndex == 1 ? styles.activeType : styles.inActiveType]}
                    onPress={() => this.segmentClicked(1)}>

                    <Text style={[this.state.activeIndex == 1 ? styles.toggleText : styles.toggleTextInactive]}>Mobile Number</Text>
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
        borderRadius:20,
        backgroundColor:'#EFF2F5'

    },
    sideContent: {
        paddingTop: 15,
        height: 330,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',


    },
    sideContenttwo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
        paddingRight: 10,
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
        borderColor: '#707070',
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
        borderRadius: 20,
    },
    inActiveType: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,

    },
    toggleText: {
        color: color.black,
        fontSize: 10,
        fontWeight: '200',
        fontFamily: 'NunitoSans',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
    toggleTextInactive: {
        color: '#5F5C7F',
        fontSize: 10,
        fontWeight: '200',
        fontFamily: 'NunitoSans',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 4
    },
});










