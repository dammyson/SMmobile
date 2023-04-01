// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Linking, ImageBackground, StatusBar, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Content, View, Text, Button, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Icon, Avatar } from 'react-native-elements'
import Modal, { ModalContent } from 'react-native-modals';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient';
import { getFmc ,getChatNumber} from '../../component/utilities';
import color from '../../component/color'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            enterCode: true,
            spinner: false,
            view_balance: false,
            visible_log_merchant: false
        };
    }


    componentWillMount() {

    }


    logOut() {
        try {

            this.setState({ visible_log_merchant: false })
           AsyncStorage.clear();
            setTimeout(() => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                  });
            }, 500);

            return true;
        }
        catch (exception) {
            return false;
        }



    }


    async handlerLongClick() {
        console.warn(await getFmc());
        Linking.openURL("whatsapp://send?text=" + "Hi I'm from sendmonny app and I have a problem." + "&phone="+getChatNumber())
    };

   render() {

        return (
            <ImageBackground
                source={require('../../assets/user_bg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >  
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#4C46E9" />
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#4C46E9', '#272669']}>
                            <View style={styles.body}>
                                <Text style={styles.title}>Settings</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('account') } style={styles.item}>
                                    <Text style={styles.menu}>Account Setting</Text>
                                    <Icon active name="user" type='font-awesome' color='#fff' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('permission') } style={styles.item}>
                                    <Text style={styles.menu}>Permission</Text>
                                    <Icon active name="hand-pointing-up" type='material-community' color='#fff' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('faq')} style={styles.item}>
                                    <Text style={styles.menu}>FAQs</Text>
                                    <Icon active name="question-circle" type='font-awesome' color='#fff'/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.handlerLongClick()} style={styles.item}>
                                    <Text style={styles.menu}>Chat with us</Text>
                                    <Icon active name="whatsapp" type='material-community' color='#fff'   />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('about')} style={styles.item}>
                                    <Text style={styles.menu}>About</Text>
                                    <Icon active name="info" type='entypo' color='#fff'/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('privacy') } style={styles.item}>
                                    <Text style={styles.menu}>Privacy Policy</Text>
                                    <Icon active name="shield-lock" type='material-community' color='#fff'/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('terms')} style={styles.item}>
                                    <Text style={styles.menu}>Terms And Conditions</Text>
                                    <Icon active name="progress-download" type='material-community' color='#fff'/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.setState({ visible_log_merchant: true })} style={[styles.item, { marginBottom: 100 }]}>
                                    <Text style={styles.menu}>Log out</Text>
                                    <Icon active name="logout-variant" type='material-community' color='#fff' />
                                </TouchableOpacity>

                            </View>

                        </LinearGradient>

                        <Modal
                            visible={this.state.view_balance}
                            overlayBackgroundColor='#fff'
                            overlayOpacity={0.5}
                        >
                            <ModalContent style={styles.modal}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 1, paddingBottom: 10 }}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'left', paddingBottom: 10, marginTop: 25, flex: 1 }}>Enter pin </Text>
                                        <TouchableOpacity onPress={() => this.setState({ view_balance: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                                            <Icon
                                                name="close"
                                                size={20}
                                                type='antdesign'
                                                color="#fff"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ alignItems: 'center', paddingTop: 1, paddingBottom: 10, }}>
                                        <OTPInputView
                                            style={{
                                                width: '70%', height: 70, marginLeft: 30,
                                                marginRight: 30, justifyContent: 'center', color: '#fff',
                                            }}
                                            pinCount={4}
                                            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                            // onCodeChanged = {code => { this.setState({code})}}
                                            autoFocusOnLoad
                                            codeInputFieldStyle={styles.underlineStyleBase}
                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                            onCodeFilled={(code => {
                                                this.props.navigation.navigate('addpin') 
                                            })}
                                        />
                                    </View>
                                    <Button style={styles.modalbuttonContainer} block iconLeft>
                                        <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Proceed </Text>
                                    </Button>
                                </View>
                            </ModalContent>
                        </Modal>


                        <Modal
                            visible={this.state.visible_log_merchant}
                        >
                            <ModalContent style={styles.modal}>
                                <View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 1, paddingBottom: 10 }}>
                                        <TouchableOpacity onPress={() => this.setState({ visible_log_merchant: false })} style={{ marginLeft: 10, backgroundColor: '#000' }}>
                                            <Icon
                                                name="close"
                                                size={20}
                                                type='antdesign'
                                                color="#fff"
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.delavartar}>
                                        <Avatar
                                            source={require('../../assets/bank.png')}
                                            size="large"
                                            icon={{ name: 'rocket', color: 'orange', type: 'font-awesome' }}
                                            overlayContainerStyle={{ backgroundColor: 'white', }}
                                            onPress={() => console.log("Works!")}
                                            containerStyle={{ borderRadius: 15, }}
                                        />
                                    </View>


                                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'center', paddingBottom: 10, marginTop: 25, }}>Leaving so soon ?</Text>
                                    <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center', paddingBottom: 10, marginLeft: 10, marginRight: 10, }}>Are you sure you want to log out</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Button onPress={() => this.logOut()} style={styles.modalbuttonContainer} block iconLeft>
                                            <Text style={{ color: '#fdfdfd', fontWeight: '400' }}>Yes </Text>
                                        </Button>
                                        <Button onPress={() => this.setState({ visible_log_merchant: false })} style={styles.modalTansButtonContainer} block iconLeft>
                                            <Text style={{ color: color.button_blue, fontWeight: '400' }}>No </Text>
                                        </Button>
                                    </View>

                                </View>
                            </ModalContent>
                        </Modal>


                    </Content>
                </Container>
            </ImageBackground>
        );
    }



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: 20,
        color: 'red'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    item: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 10,
        borderColor: '#e3e3e3',
        alignItems: 'center',
        paddingRight: 15
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center'

    },
    sideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        flex: 1,
    },
    menu: {
        flex: 1,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 12,
        color: '#fff',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    title: {
        flex: 1,
        marginTop: 40,
        marginRight: 30,
        marginLeft: 30,
        fontSize: 16,
        color: '#fff',
        textAlign: 'left',
        fontFamily: 'Montserrat-Medium'
    },
    modal: {
        width: Dimensions.get('window').width - 60,

    },
    modalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: "#707070",
        color: 'blue'
    },

    underlineStyleHighLighted: {
        borderColor: "green",
    },


    modal: {
        width: Dimensions.get('window').width - 60,

    },
    modalbuttonContainer: {
        backgroundColor: color.slide_color_dark,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
        flex: 1
    },
    modalTansButtonContainer: {
        borderColor: color.button_blue,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 30,
        backgroundColor: 'transparent',
        flex: 1
    },

    borderStyleHighLighted: {
        borderColor: "red",
    },
    delavartar: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

