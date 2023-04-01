import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Alert, StatusBar, TextInput, Image, Clipboard, Dimensions, PermissionsAndroid, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView, ImageBackground } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import ViewShot from 'react-native-view-shot'
import { getData } from '../utilities';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from "react-native-fs"
import CameraRoll from "@react-native-community/cameraroll";
import Share from 'react-native-share'
import color from '../color'


const GiveAwayShareReceipt = ({ amount, mc, onDownload, onShare, onClose }) => {
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
        doSomethingWith(DATA)

    }

    const doSomethingWith = (DATA) => {
        console.warn(DATA);
        const image = DATA;
        let shareOptions = {
            title: "React Native Share Example",
            type: 'image/png',
            url: image,
            subject: "Check out this photo!"
        }

        Share.open(shareOptions)
            .then((res) => onShare())
            .catch(err => console.log('err', err))
    }


    return (<>

        <View style={styles.mainbody}>


            <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                <TouchableOpacity onPress={() => onClose()} >
                    <Icon
                        name="close"
                        size={30}
                        type='antdesign'
                        color={color.red}
                    />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Text style={styles.title}>Transaction Details</Text>
                </View>
                <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
            </View>

            <View style={{ height: 40, }} />
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <ViewShot style={{ width: 305, height: 305, }} ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} >


                    <ImageBackground
                        style={{ width: 300, justifyContent: 'center', alignItems: 'center', height: 300, elevation: 5 }}
                        source={require('../../assets/receipt.png')}
                    >

                        <View style={{width: 300, flex: 1, marginRight: 15, marginLeft: 15,  justifyContent: 'center', alignItems: 'center', }}>
                         
                        </View>
                        <View style={{width: 300, flex: 1, marginRight: 15, marginLeft: 15,  justifyContent: 'center', alignItems: 'center', }}>
                         
                         </View>

                        <View style={{width: 300, flex: 1, marginRight: 15, marginLeft: 15, justifyContent: 'center', alignItems: 'flex-start', }}>
                            <Text style={styles.purpos_test}>{amount}</Text>
                        </View>

                        <View style={{ width: 300, flex: 1,   }}>
                            <Text style={styles.code_text}>{mc}</Text>
                        </View>


                    </ImageBackground>



                </ViewShot>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={styles.downloadButtonContainer} onPress={async () => {
                    const uri = await viewShotRef.current.capture()
                    setUri(uri)
                    checkPermission(uri)

                }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#FFC107', fontSize: 12, marginRight: 10 }}>Download</Text>
                    <Icon
                        name="download"
                        size={30}
                        type='antdesign'
                        color={'#FFC107'}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareButtonContainer} onPress={async () => {
                    const uri = await viewShotRef.current.capture()
                    setUri(uri)
                    onQrShare(uri)

                }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#4C46E9', fontSize: 12, marginRight: 10 }}>Share</Text>
                    <Icon
                        name="share"
                        size={30}
                        type='entypo'
                        color={'#4C46E9'}
                    />
                </TouchableOpacity>

            </View>



        </View>
    </>);
}


export default GiveAwayShareReceipt;

const styles = StyleSheet.create({

    mainbody: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        paddingTop: 20,
        position: 'absolute',
        backgroundColor: 'gray'



    },
    code_text: {
        marginTop: 10,
        marginRight: 35,
        marginLeft: 13,
        fontSize: 15,
        color: '#000',
       
        fontWeight: '400',
        fontFamily: 'Montserrat-Regular'
    },
    purpos_test: {
        marginTop: 10,
        fontSize: 20,
        color:  color.button_blue,
        textAlign: 'center',
        marginLeft: 13,
        fontWeight: '400',
        fontFamily: 'Montserrat-Regular'
       
    },
    title: {
        marginTop: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 17,
        color: color.button_blue,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: 'Montserrat-Bold'
    },
    textInputContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
    Qrcontainer: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 2,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 9,
    },
    downloadButtonContainer: {
        height: 65,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#FFECB4',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButtonContainer: {
        height: 65,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#D2D1F2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


});
