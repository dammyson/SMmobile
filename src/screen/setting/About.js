// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView  } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon, Tile } from 'react-native-elements';



import color from '../../component/color'


export default class About extends Component {
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

                        <View style={{flex:1, alignItems: 'center', justifyContent:'center', flexDirection: 'row' }}>
                 <Image
               style={styles.logo}
               source={require('../../assets/logo_blue.png')} 
               /> 
                 </View>

                 <View style={{ width: 40 }}></View>

                 </View>
                 <ScrollView>
                        <View>
                            <Text style={styles.title}>About sendmonny </Text>
                            <Text style={styles.bodyText}>sendmonny is a mobile application that makes it easy for merchants and buyers to transact monies below N5000. What we want to do is to help you process small money transactions seamlessly and by doing so, bring financial inclusion to the world.  </Text>
                            <Text style={styles.bodyText}> sendmonny is built to simplify the way businesses recieve payments and how consumers make them, this is no easy task in a dynamic world, but by constantly experiencing and listening to you, we have built a product that can help people find stability in their daily lives and provide added value to their businesses. </Text>
                            <Text style={styles.bodyText}> We are a team of learning individuals building a constantly evolving product. Our job is to channel your worries away from how to make/receive payment to other more important areas of your life. At our core, we are listeners: constantly taking your opinions, worries, needs and optimizing our product to provide more value for you and your businesses everytime.' </Text>
                           
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
                <View style={{marginBottom: 5 }}>
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
      title: 'Put your money',
      text: 'Create a sendmonny wallet, and pay for petty \n transactions with your mobile phone.',
    },
    {
      
        title: 'Put your money',
        text: 'Create a sendmonny wallet, and pay for petty \n transactions with your mobile phone.',
      }
  ];
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
       height:100,
       backgroundColor:'#2D2C71',
      width: Dimensions.get('window').width,
      justifyContent:'center',
      flexDirection:'row',
      paddingTop:20
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



