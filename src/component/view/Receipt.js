import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Alert, StatusBar, TextInput, Image, ImageBackground, Clipboard, Dimensions, PermissionsAndroid, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import ViewShot from 'react-native-view-shot'
import { getData } from '../../component/utilities';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { qrImage } from './../../component/utilities/Base64';
import RNFS from "react-native-fs"
import CameraRoll from "@react-native-community/cameraroll";
import Share from 'react-native-share'
import color from '../../component/color'
import Moment from 'moment';
Moment.locale('en');
import { getType } from '../../component/utilities';

const Receipt = ({ details, wallet, balance, onDownload, onShare }) => {
    const viewShotRef = useRef(null)
    const [uri, setUri] = useState('')

    const checkPermission = async (DATA) => {

        if (Platform.OS === 'ios') {
            saveQrToDisk(DATA);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    saveQrToDisk(DATA);
                } else {
                    //If permission denied then show alert 'Storage Permission Not Granted' ggg
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };



    const saveQrToDisk = (DATA) => {
        CameraRoll.save(DATA, 'photo', 'downloads');
        onDownload()
    }

    /**
  * This functions share a image passed using the
  * url param
  */
    const shareSingleImage = async () => {
        const shareOptions = {
            title: 'Share file',
            url: images.image1,
            failOnCancel: false,
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            setResult('error: '.concat(getErrorString(error)));
        }
    };


    const onQrShare = (DATA) => {
        const image = DATA
        let shareOptions = {
            title: "React Native Share Example",
            message: "Check out this photo!",
            url: image,
            subject: "Check out this photo!"
        }

        Share.open(shareOptions)
            .then((res) => onShare())
            .catch(err => console.log('err', err))
    }
    return (<>
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} >
            <View style={styles.ongoin_container}>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 14, color: '#2D2C71', textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>Transaction Amount  </Text>
                    <Text style={{ fontSize: 30, color: '#3AA34E', textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>NGN {details.amount}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, color: '#2D2C71', textAlign: 'center', fontFamily: 'Poppins-Light' }}>Balance</Text>
                        <View style={{ backgroundColor: '#2D2C71', width: 0.5, marginLeft: 6, marginRight: 6 }} />
                        <Text style={{ fontSize: 12, color: '#2D2C71', textAlign: 'center', fontFamily: 'Poppins-Light' }}>N{balance}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 15, backgroundColor: '#EFF2F5', }}>

                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>TYPE</Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{details.debit_wallet_id == wallet.id ? 'Debit' : 'Credit'}</Text>
                    </View>


                    <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />
                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>CATEGORY</Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{details.category == 'bills_payment' ? details.biller_category : getType(details.category)}</Text>
                    </View>
                    <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />






                    {details.debit_wallet_id == wallet.id ?

                        <>
                            <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>BENFICIARY</Text>
                                <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>

                                    {details.category == 'donation' ? 'Donation'
                                        :
                                        details.category == 'bills_payment' ?
                                            details.biller_product
                                            :
                                            details.cr_first_name + ' ' + details.cr_last_name}






                                </Text>
                            </View>
                            <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />
                        </>



                        :

                        <>
                            <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>Sender</Text>
                                <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>

                                    {details.category == 'donation' ? 'Donation'
                                        :
                                        details.category == 'bills_payment' ?
                                            details.biller_product
                                            :
                                            details.dr_first_name + ' ' + details.dr_last_name}
                                </Text>
                            </View>
                            <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />
                        </>

                    }

                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>TIME </Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{Moment(details.created_at).format('LT')}</Text>
                    </View>
                    <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />
                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>TRANSACTION ID</Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{details.reference}</Text>
                    </View>

                    <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />

                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>DATE</Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{Moment(details.created_at).format('llll')}</Text>
                    </View>
                    <View style={{ backgroundColor: '#2D2C7150', height: 0.5, marginLeft: 15, marginRight: 15, }} />
                    <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7, marginTop: 7, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10, flex: 1, color: '#4B4B4B50', textAlign: 'left', fontFamily: 'Poppins-Regular' }}>STATUS</Text>
                        <Text style={{ fontSize: 12, flex: 1.3, color: '#3E3E3E', textAlign: 'left', fontFamily: 'Poppins-Medium' }}>{details.status == 'success' ? 'Successful' : 'Failed'}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 15, marginLeft: 15, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ height: 40, width: 40 }}
                            source={require('../../assets/logo_blue.png')}
                        />
                    </View>
                    <TouchableOpacity style={{marginRight:20}} onPress={async () => {
                        const uri = await viewShotRef.current.capture()
                        setUri(uri)
                        checkPermission(uri)

                    }}>

                        <Icon
                            name="download"
                            size={30}
                            type='antdesign'
                            color={'#FFC107'}
                        />
                    </TouchableOpacity>
                </View>


            </View>

        </ViewShot>

    </>);
}


export default Receipt;

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

