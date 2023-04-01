// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, Share, StatusBar, ImageBackground, Image, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import URL from '../../component/server'
import { PulseIndicator } from 'react-native-indicators';

import PTRView from 'react-native-pull-to-refresh';
import color from '../../component/color'
import GiveAwayShare from '../../component/view/GiveAwayShare';
import QrView from '../../component/view/qrview';
import { qrImage } from './../../component/utilities/Base64';
import { getToken, getWallet, getData, processResponse } from '../../component/utilities';
import GiveAwayShareMerchant from '../../component/view/GiveAwayShareMerchant';

export default class Ongoing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            code: '',
            amount: '',
            number: '',
            total_reach: '',
            details: '',
            show_share: false,
            show_qr: false,
            show_share_merchant: false,
        };
    }


    async componentDidMount() {
        const { items } = this.props.route.params;
        console.warn(items)
        this.setState({
            details: items,

        });

        const wallet = JSON.parse(await getWallet())
        this.setState({
            auth: await getToken(),
            data: JSON.parse(await getData()),
            wallet: wallet,
        })


    }

    onShare = async (message, code) => {
        try {
            const result = await Share.share({
                message:
                    message + ' give away with ' + code + " code",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };



    render() {

        const { details } = this.state
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
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
                                    <Text style={styles.title}>Giveaway</Text>
                                </View>
                                <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                            </View>


                            <View style={{ margin: 10, borderColor: '#3E3E3E30', borderBottomWidth: 0.6 }}>
                                <Text style={{ textAlign: 'left', marginBottom: 10, color: color.button_blue, fontFamily: 'Montserrat-Bold', opacity: 0.7, marginTop: 5, marginLeft: 20, fontSize: 12, marginRight: 40, }}>Ongoing Giveaway</Text>
                            </View>


                            <View style={styles.mainbody}>
                                <View style={styles.ongoin_container}>
                                    <Text style={{ textAlign: 'left', marginBottom: 10, color: color.button_blue, fontFamily: 'Montserrat-Bold', opacity: 0.7, marginTop: 5, fontSize: 13, marginRight: 10, }}>{details.purpose}</Text>
                                    <TouchableOpacity onPress={() => this.handlerLongClick(details.redemption_code)} style={styles.inputBudget}>
                                        <Text style={styles.copy}>Tap to copy code</Text>
                                        <Text style={[styles.budget]}>{details.redemption_code} </Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row' }} >
                                        <TouchableOpacity onPress={() => this.shareCode(details.is_donor_to_claim)} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                            <View style={{ marginRight: 20, flexDirection: 'row' }} >
                                                <Icon
                                                    name="share"
                                                    size={30}
                                                    type='entypo'
                                                    color={color.primary_color}
                                                />

                                            </View>
                                            <Text style={styles.copy}>Share Code</Text>
                                        </TouchableOpacity>


                                        <View style={{ flex: 1 }} />
                                        {details.is_donor_to_claim ?
                                            <TouchableOpacity onPress={() => this.setState({ show_qr: true })} style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                                <View style={{ marginRight: 20, flexDirection: 'row' }} >
                                                    <Icon
                                                        name="qrcode"
                                                        size={30}
                                                        type='antdesign'
                                                        color={color.primary_color}
                                                    />

                                                </View>
                                                <Text style={styles.copy}>Qr Code</Text>
                                            </TouchableOpacity>

                                            : null}

                                    </View>


                                </View>


                                <View style={{ flex: 1, margin: 20 }}>

                                    <View style={styles.details_container}>

                                        <View style={{ backgroundColor: '#FFECB4', margin: 5, borderRadius: 35, padding: 15, }}>
                                            <Image
                                                source={require('../../assets/hand_g.png')}
                                                style={{ height: 20, width: 20, resizeMode: 'contain' }}

                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={[styles.detail_header,]}>Amount Donated  </Text>
                                            <Text style={[styles.detail_value, { color: '#EF9D00' }]}>NGN  {details.amount}</Text>
                                        </View>
                                    </View>


                                    <View style={styles.details_container}>
                                        <View style={{ backgroundColor: '#C9C7F8', margin: 5, borderRadius: 35, padding: 15, }}>
                                            <Image
                                                source={require('../../assets/target.png')}
                                                style={{ height: 20, width: 20, resizeMode: 'contain' }}

                                            />
                                        </View>

                                        <View style={{ marginLeft: 10, flex: 1 }}>
                                            <Text style={styles.detail_header}>Target Reach  </Text>
                                            <Text style={styles.detail_value}>{details.number_of_people}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ext_donate', { items: details })} style={{ marginLeft: 10, }}>
                                            <Icon
                                                name="add-user"
                                                size={20}
                                                type='entypo'
                                                color={color.button_blue}
                                            />
                                        </TouchableOpacity>
                                    </View>


                                    <View style={styles.details_container}>

                                        <View style={{ backgroundColor: '#EFF2F5', margin: 5, borderRadius: 35, padding: 15, }}>
                                            <Image
                                                source={require('../../assets/image_g.png')}
                                                style={{ height: 20, width: 20, resizeMode: 'contain' }}

                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.detail_header}>Remaining Amount  </Text>
                                            <Text style={styles.detail_value}>NGN {(details.number_of_people - details.redemptions_count) * details.amount}</Text>
                                        </View>
                                    </View>


                                    <View style={styles.details_container}>

                                        <View style={{ backgroundColor: '#EFF2F5', margin: 5, borderRadius: 35, padding: 15, }}>
                                            <Image
                                                source={require('../../assets/goal.png')}
                                                style={{ height: 20, width: 20, resizeMode: 'contain' }}

                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.detail_header}>Total Reached </Text>
                                            <Text style={styles.detail_value}>{details.redemptions_count}</Text>
                                        </View>
                                    </View>
                                    {details.is_donor_to_claim == 1 ?
                                        <View style={styles.details_container}>
                                            <View style={{ backgroundColor: '#C9C7F8', margin: 5, borderRadius: 35, padding: 15, }}>
                                                <Icon
                                                    name="tachometer"
                                                    size={20}
                                                    type='font-awesome'
                                                    color={color.button_blue}
                                                />
                                            </View>

                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={styles.detail_header}>Daily Limit  </Text>
                                                {details.limit_daily_redemption == 0 || details.limit_daily_redemption == null ?
                                                    <Text style={styles.detail_value}>{'No Limit Set'}</Text>
                                                    :
                                                    <Text style={styles.detail_value}>{details.limit_daily_redemption}</Text>
                                                }

                                            </View>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('limit', { items: details })} style={{ marginLeft: 10, }}>
                                                <Icon
                                                    name="add-to-list"
                                                    size={20}
                                                    type='entypo'
                                                    color={color.button_blue}
                                                />
                                            </TouchableOpacity>
                                        </View> : null}

                                    <View style={{ height: 20 }} />
                                </View>

                            </View>
                        </View>

                    </View>
                </Content>
                {this.state.show_share ? this.rendShare(details) : null}
                {this.state.show_share_merchant ? this.rendShareMerchant(details) : null}
                {this.state.show_qr ? this.rendQr() : null}
            </Container>
        );
    }
    shareCode(is_donor) {
        console.warn(is_donor)
        if (is_donor == '1') {
            this.setState({ show_share_merchant: true })
        } else {
            this.setState({ show_share: true })
        }

    }
    handlerLongClick(info) {
        Clipboard.setString(info)
        Toast.show({
            text: 'Text copied to clipboard !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

    };

    onDownload(messages) {
        Toast.show({
            text: 'Giveaway Code ' + messages + ' !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });

        this.setState({ show_share: false })
    }

    rendShare(details) {

        return (
            <GiveAwayShare
                onClose={() => this.setState({ show_share: false })}
                purpose={details.purpose}
                code={details.redemption_code}
                onShare={() => this.onDownload('shared')}
                onDownload={() => this.onDownload("saved to device")} />
        )
    }


    onQRDownload(messages) {
        Toast.show({
            text: 'QR Code ' + messages + ' !',
            position: 'top',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 1500
        });
    }

    rendQr() {
        let base64Logo = qrImage();
        return (
            <QrView user_id={this.state.wallet.id}
                title={this.state.data.user_id}
                qrImage={base64Logo}
                onClose={() => this.setState({ show_qr: false })}
                showClose={true}
                onShare={() => this.onQRDownload('shared')}
                onDownload={() => this.onQRDownload("Downloaded")} />
        )
    }




    rendShareMerchant(details) {
        return (
            <GiveAwayShareMerchant
                onClose={() => this.setState({ show_share_merchant: false })}
                purpose={details.purpose}
                wallet_id={this.state.wallet_id}
                code={details.redemption_code}
                onShare={() => this.onDownload('shared')}
                onDownload={() => this.onDownload("saved to device")} />
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,

    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#fff'
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
        color: '#000',
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat-Bold'
    },
    card_container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20
    },
    ongoin_container: {
        marginRight: 20,
        marginLeft: 20,

    },
    ongoin_row: {
        marginTop: 20
    },
    details_container: {
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#acada6'

    },
    detail_header: {
        textAlign: 'left',
        color: color.button_blue,
        fontFamily: 'Poppins-Regular',
        opacity: 0.7,
        marginTop: 5,
        fontSize: 12,
        marginRight: 40,
    },
    detail_value: {
        textAlign: 'left',
        color: color.button_blue,
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginBottom: 3,
    },
    inputBudget: {
        height: 65,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#d1d1d1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    budget: {
        marginLeft: 10,
        fontSize: 14,
        color: color.button_blue,
        fontFamily: 'Poppins-SemiBold',
    },
    copy: {
        color: color.button_blue,
        fontFamily: 'Poppins-Medium',
        opacity: 0.7,
        marginTop: 5,
        fontSize: 12,
    },


});



