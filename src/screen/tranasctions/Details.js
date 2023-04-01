// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Clipboard, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';
import Moment from 'moment';
import { getWallet, getType } from '../../component/utilities';
import color from '../../component/color'
import Receipt from '../../component/view/Receipt';



export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            done: false,
            items: [],
            auth: '',
            code: 'd37f4b1041',
            balance: 0,
            wallet: {},
            details: {}
        };
    }


    async componentDidMount() {
        const wallet = JSON.parse(await getWallet())
        this.setState({
            balance: wallet.balance,
            wallet: wallet
        })
        const { items } = this.props.route.params;
        this.setState({
            details: items,

        });

    }






    render() {

        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.renderBody()}
                </Content>
            </Container>
        );

    }

    onDownload(messages){
        Toast.show({
            text: 'Receipt '+ messages +' !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });
    }


    renderBody() {
        Moment.locale('en');
        const { details, wallet } = this.state
        return (
            <View style={styles.backgroundImage}>
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
                            <Text style={styles.title}>Transaction Details </Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>

                    <View style={styles.mainbody}>
                    <Receipt  onDownload={()=> this.onDownload("Downloaded")}  details={details} wallet={wallet} balance={this.state.balance}/>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('dispute')} >
                            <Icon
                                name="chat"
                                size={30}
                                type='material-community'
                                color={'#3AA34E'}
                            />
                            <Text style={{ marginLeft: 20, fontFamily: 'Poppins-SemiBold', color: '#2D2C71', fontSize: 14 }}>Dispute Transaction</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        )
    }

    renderReceit(details){
        return(<Receipt details={details}/>)
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#3AA34E'
    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    avarterContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        width: Dimensions.get('window').width,
        marginLeft: 30,
        marginRight: 30,
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
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20
    },
    ongoin_container: {
        backgroundColor: '#fff',
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 4,
        marginTop: 20

    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },


});



