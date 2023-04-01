// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon, Tile } from 'react-native-elements';



import color from '../../component/color'


export default class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }


    componentWillMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
            }
        })


    }


    render() {

        return (
            <ImageBackground
                source={require('../../assets/gray.png')}
                style={styles.backgroundImage}
                resizeMode="cover">
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                <View style={styles.body}>
                    <View style={styles.titleContainer}>


                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => {
                               this.props.navigation.goBack()
                            }}>
                                <Icon
                                    name="arrowleft"
                                    size={30}
                                    type='antdesign'
                                    color={color.primary_color}
                                />

                            </TouchableOpacity>




                        </View>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image
                                style={styles.logo}
                                source={require('../../assets/logo_blue.png')}
                            />
                        </View>

                        <View style={{ width: 40 }}></View>

                    </View>
                    <ScrollView>
                        <View>
                            <Text style={styles.title}>Frequently Asked Questions </Text>
                             {this.renderTicket()}
                        </View>
                    </ScrollView>


                </View>
            </ImageBackground>
        );
    }

    renderTicket() {
        let items = [];
        for (let i = 0; i < texts.length; i++) {

            items.push(
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.subTitle}> {texts[i].title} </Text>
                    <Text style={styles.bodyText}>  {texts[i].text}  </Text>

                </View>
            )

        };
        return items;
    }

}



const texts = [
    {
      title: 'Q: Why can’t i sign in?',

      text: 'A: please make sure your phone number is registered licensed Nigerian network provider.',
    },

    {
      title: 'Q: How do i top up my wallet?',

      text: 'A: you can either top-up from bank or from a merchant around you.',
    }, 

    {
      title: 'Q: How do i make payments?',

      text: 'A: click on pay to either scan seller QR or input their ID to pay',
    },

     {
      title: 'Q: How do i reset my pin?',

      text: 'A: Go to ‘account settings’ then click on ‘reset pin’ and provide information needed',
    }];

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    body: {
        flex: 1,
        width: Dimensions.get('window').width,

        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    titleContainer: {
        height: 100,
        backgroundColor: '#2D2C71',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 20
    },

    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        resizeMode: 'contain'


    },
    arrowContainer: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 20,
    },

    title: {
        marginTop: 20,
        marginBottom: 2,
        marginRight: 20,
        marginLeft: 20,
        fontSize: 20,
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    subTitle: {
        marginTop: 20,
        marginBottom: 2,
        marginRight: 20,
        marginLeft: 20,
        fontSize: 15,
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold'
    },
    bodyText: {
        marginTop: 20,
        marginBottom: 2,
        marginRight: 10,
        marginLeft: 20,
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Montserrat'
    },

});



