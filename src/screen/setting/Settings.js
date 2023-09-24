// React native and others libraries imports
import React, { Component } from 'react';
import { AsyncStorage, Linking, ImageBackground, StatusBar, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Content, View, Text, Button, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Icon, Avatar } from 'react-native-elements'
import { getFmc, getChatNumber } from '../../component/utilities';
import color from '../../component/color'
import { lightTheme } from '../../theme/colors';

import { SafeAreaView } from 'react-native-safe-area-context';
import { font } from '../../constants';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Settings=()=>{
   
    const navigation = useNavigation();
    const dispatch = useDispatch();

   const  onItemClick = (item) => {
        if (item.value == "account") {
        //   setShowAccount(true)
        } else if (item.value == "privacy") {
          navigation.navigate('Privacy');
        } else if (item.value == "logout") {
            logOut()
        }
        else if (item.value == "support") {
          Linking.openURL("https://www.uis.edu/form/mobile-app-support-form");
        }
    
      }


   const logOut=()=> {
        try {
            AsyncStorage.clear();
            setTimeout(() => {
                navigation.reset({
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



    // async handlerLongClick() {
    //     console.warn(await getFmc());
    //     Linking.openURL("whatsapp://send?text=" + "Hi I'm from sendmonny app and I have a problem." + "&phone=" + getChatNumber())
    // };

  

        return (
           
                <View
                    source={require('../../assets/user_bg.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fffs" />
                    <Container style={{ backgroundColor: 'transparent' }}>
                        <Content>
                            <View style={styles.body}>
                                <View style={{ flex: 1, marginHorizontal: 15, marginBottom:100 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: lightTheme.BLACK_TEXT_COLOR, fontFamily: font.BOLD, fontSize: 16 }}>Settings</Text>

                                    </View>
                                    {items.map((item) => (<>
                                        <View style={{ marginVertical: 25 }}>
                                            <Text style={styles.subTitle}>{item.title}  </Text>
                                            <View style={{ height: 0.8, backgroundColor: lightTheme.INACTIVE_COLOR, opacity: 0.5 }} />
                                        </View>


                                        {item.menu_item.map((menu_item) => (
                                            <TouchableOpacity onPress={() => onItemClick(menu_item)} style={styles.menuItem}>

                                                <View style={styles.menuTextItme} >
                                                    <Text style={styles.label}>{menu_item.text} </Text>
                                                </View>
                                                <View style={{}} >
                                                    <Icon
                                                        name="chevron-small-right"
                                                        size={30}
                                                        type='entypo'
                                                        color={lightTheme.BLACK_TEXT_COLOR}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        ))}

                                    </>

                                    ))}


                                   

                                </View>
                                <View styles={{height: 100}} />
                            </View>
                        </Content>
                    </Container>
                </View>
        );
    }

export default Settings


const items = [
    {
        title: 'ACCOUNT',
        menu_item: [
            {
                text: 'Account Settings',
                value: 'account'
            },
            {
                text: 'Account Verification',
                value: 'notification'
            },
            {
                text: 'Change Transaction PIN',
                value: 'change'
            },
            {
                text: 'Recover PIN',
                value: 'delet'
            }
        ]
    },

    {
        title: 'SUPPORT',
        menu_item: [
            {
                text: 'FAQs',
                value: 'account'
            },
            {
                text: 'Chat with us',
                value: 'notification'
            }
        ]
    },
    {
        title: 'OTHERS',
        menu_item: [
            {
                text: 'About us',
                value: 'about-us'
            },
            {
                text: 'Permission',
                value: 'permission'
            },
            {
                text: 'Privacy Policy',
                value: 'policy'
            },
            {
                text: 'Logout',
                value: 'logout'
            }
        ]
    }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff'
    },

    body: {
        flex: 1,
        backgroundColor: '#fff'
    },
    subTitle: {
        fontSize: 12,
        color: lightTheme.PRIMARY_INACTIVE_COLOR,
        opacity: 0.5,
        fontFamily: font.BOLD,
        marginBottom: 10,
    },

    label: {
        fontSize: 12,
        color: lightTheme.BLACK_TEXT_COLOR,
        fontFamily: font.SEMI_BOLD,
    },
    menuItem: {
        flexDirection: 'row',
        marginHorizontal: 15,
        paddingBottom: 10,
        marginVertical: 5,
        alignItems: 'center'
    },
    menuTextItme: {
        flex: 1,
        marginLeft: 5,

    },
    name: {
        fontSize: 12,
        color: lightTheme.PRIMARY_COLOR,
        fontFamily: font.REGULAR,
        marginBottom: 10,
    },


});

