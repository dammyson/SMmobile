import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Alert, StatusBar, TextInput, ImageBackground, Clipboard, Dimensions, PermissionsAndroid, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Toast } from 'native-base';
import ViewShot from 'react-native-view-shot'
import { getData } from '../../component/utilities';
import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { qrImage } from './../../component/utilities/Base64';
import RNFS from "react-native-fs"
import CameraRoll from "@react-native-community/cameraroll";

import color from '../../component/color'

const App = ({ navigation, user_id, qrImage }) => {
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
        console.warn(DATA);
        CameraRoll.save(DATA, 'photo');
    }
    return (<>
        <Container style={{ backgroundColor: 'transparent' }}>
            <Content>
                <View style={styles.backgroundImage}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                    <View style={styles.body}>
                        <View style={{ height: 20 }}></View>
                        <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
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
                        <View style={styles.mainbody}>
                            <ViewShot style={{ backgroundColor: '#fff', }} ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} >
                                <View>
                                    <Text style={styles.title}>User ID: 199487</Text>
                                    <View style={styles.Qrcontainer}>
                                        <QRCode
                                            value={"iiii"}
                                            size={Dimensions.get('window').width - 80}
                                            color="#000"
                                            backgroundColor='#fff'
                                            logo={{ uri: qrImage() }}
                                            logoSize={60}
                                        />

                                    </View>
                                </View>
                            </ViewShot>
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
                                    checkPermission(uri)

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
                    </View>
                </View>
            </Content>
        </Container>
    </>);
}


export default App;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
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
    textInputContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
    Qrcontainer: {
        backgroundColor: '#fff',
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
