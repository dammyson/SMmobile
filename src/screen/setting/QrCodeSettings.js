// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, TextInput, ImageBackground, Clipboard, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { Container, Content, View, Text,Toast, Button, } from 'native-base';

import { Avatar, Badge, Card, Icon, SocialIcon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { qrImage } from './../../component/utilities/Base64';
import RNFS from "react-native-fs"
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

import color from '../../component/color'
import QrView from '../../component/view/qrview';
import { getUser } from '../../utilities';



export default class QrCodeSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            merchant: 'ay345',
            items: [],
            visible: false,
            view_balance: false,
            data: '',
            qrCode: '',
            rub: false
        };
    }



    async componentDidMount() {
        this.setState({
            data: JSON.parse(await getUser()),
        })
      
        console.warn(await getUser());
    }


    openShareScreen() {
        if (this.qrCode) {
            const shareOptions = {
                type: 'image/jpg',
                title: '',
                url: this.qrCode
            };
            Share.open(shareOptions)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }
    }

    

    checkPermission = async () => {

        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission

        if (Platform.OS === 'ios') {
            this.saveQrToDisk();
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
                    this.saveQrToDisk();
                } else {
                    //If permission denied then show alert 'Storage Permission Not Granted'
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                //To handle permission related issue
                console.warn(err);
            }
        }
    };



    saveQrToDisk() {
        console.warn('thisisi')
        this.svg.toDataURL((data) => {
            RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, 'base64')
                .then((success) => {
                    return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath + "/some-name.png", 'photo')
                })
                .then(() => {
                    this.setState({ busy: false, imageSaved: true })

                })
        })
    }


    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Content>
                    {this.donate()}
                </Content>
            </Container>
        );
    }


    donate() {
        const { goBack } = this.props.navigation;
       
        return (
            <View style={styles.backgroundImage}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, }}>
                        <TouchableOpacity onPress={() => goBack()} >
                            <Icon
                                name="arrowleft"
                                size={30}
                                type='antdesign'
                                color={color.primary_color}
                            />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Text style={styles.title}>QR Code</Text>
                        </View>
                        <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                    </View>


                    <View style={styles.mainbody}>
                       {this.rendQr()}

                    </View>
                </View>
            </View>
        )
    }

onDownload(messages){
    Toast.show({
        text: 'QR Code '+ messages +' !',
        position: 'top',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 1500
    });
}

    rendQr(){
        let base64Logo = qrImage();
        const { goBack } = this.props.navigation;
        return(
            <QrView user_id={this.state.data.user_id} 
            title={this.state.data.user_id} 
            qrImage ={base64Logo} 
            onClose={()=> goBack()}
            showClose={false}
            onShare={()=> this.onDownload('shared')}   
            onDownload={()=> this.onDownload("Downloaded")} />
        )
    }

}

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



