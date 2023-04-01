// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView  } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon, Tile } from 'react-native-elements';



import color from '../../component/color'


export default class Privacy extends Component {
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
                            <Text style={styles.title}>INFORMATION TECHNOLOGY NETWORK SECURITY POLICY</Text>
                            <Text style={styles.bodyText}>At sendmonny we are dedicated to protecting our users privacy and providing them with the highest level of security at any point of interaction with us, use of our website and any other sendmonny service point.  This Privacy Policy describes what personal information we collect, how we collect, what we do with it and how we protect it. We respect individuals’ right to privacy and protection of personal information. Personal Information means information about a living individual who can be identified solely with that information or when combined with information from other sources. There may be periodic updates to our Privacy Policy from time to time in line with legal, regulatory or business operating environments. The most current version will be hoisted on the www.paychange.ng Website. </Text>
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
      title: 'INFORMATION WE COLLECT/PROCESS',

      text: 'We collect and process various categories of personal information at the start of, and for the duration of your relationship with us. We will limit the collection and processing of information to information necessary to achieve legal, regulatory and legitimate business purposes. This information categories include: \n  Personal information may include: Basic personal information, including name and address, date of birth and contact details; Financial information, including account and transactional information and history; We may also require Information about your family, lifestyle and social circumstances (such as dependents, marital status, next of kin and contact details); We may also require Information about your family, lifestyle and social circumstances (such as dependents, marital status, next of kin and contact details); Communications Network hardware and software including: routers, routing tables, hubs, modems, multiplexers, switches, firewalls, private lines, and associated network management software and tools. ducation and employment information; Goods and services provided; Online profile and social media information and activity, based on your interaction with us and our websites and applications, including for example, your sendmonny profile and login information, Internet Protocol (IP) address, smart device information, location coordinates, online and mobile sendmonny security authentication, mobile phone network information and activities, searches, voice calls and spending patterns We may also use information received from third parties such as family, solicitors, business,  friends or employers, website/ social media pages made public by you, government agencies, regulators, supervisory or credit agencies'
    },
    {
    	title: 'HOW WE COLLECT INFORMATION',

      text: 'We may collect information from a range of sources and it may relate to any of our products or services we currently provide, or may have provided in the past or would provide in the near future. We collect your voluntarily given personal information when: You open an account or perform transactions such as making deposits or withdrawals from your account, payment history and transaction records. You apply for other offerings. You seek advice about our services. You seek information from our customer service provider, information concerning complaints and disputes.We seek information about your credit history from credit bureaus. You provide account information such as your personal details e.g. name, gender, date and place of birth; contact information such as address, email address, and mobile numbers, provide your employment information. You provide information concerning your identity e.g. photo ID, passport information, National ID card and nationality. \n You use your login credentials for online activities and sendmonny mobile apps. We conduct necessary due diligence for Anti money laundry / Counter Financing of terrorism (AML/CFT) and financial crime checks; and obtain information that we need to support our legal, regulatory, contractual or business obligations, e.g. information about transaction details, detection of any suspicious and unusual activities. Advertising or targeting cookies or similar technologies may be used to track your responses to adverts and messages forms, which help us to ensure we present you with the most relevant content and services. (Cookies are small text files used to memorize and tailor your preferences so as to improve your experience on our site.',
    }, 
    {
    	 title: 'HOW WE PROTECT YOUR INFORMATION',

      text: 'We have taken necessary measures to protect against loss, unauthorised modification, access and misuse of information under our control. Your personal information provided to us remains secure because we have put in place strict measures and technologies to prevent fraud and intrusion. Our employees are trained in the necessary Information Security Standards to respect and preserve confidentiality, integrity and availability of information held by Paychange.',

    },
    {
    	title: 'YOUR RIGHTS/RESPONSIBILITY',
      text: 'YOUR RIGHTS/RESPONSIBILITY Right of Information – in emphasizing the need for transparency over the use of personal information, we will ensure your right to be informed upon request of the use of same. Rights to Access – Individuals have the right to access their personal information retained by sendmonny and obtain information on the processing of the same. Right to Restrict Processing – You have the right to block or withdraw your consent on the use of your personal information as previously described. Where processing is restricted however, sendmonny is bound by applicable laws to store personal information. Right to Rectification – You have the right to rectification of inaccurate personal information and to update incomplete personal information Right to Erasure – You have the right to request that we delete your personal information. Our compliance to this request is however subject to the law and regulations by which the sendmonny is bound. \n  Right to Portability – you have the right to data portability Right to Objection – you have a right to object to the processing and use of your personal information to the extent allowed by the applicable laws and regulations. Marketing – You have a right to object to direct marketing Your responsibility is to ensure the information provided to sendmonny is accurate and inform sendmonny on any changes to enable us to update your information with us and continue to serve you better. You are responsible for keeping any User ID, Passwords, PINs, token issued to you for access to specific products and services, confidential.',
    },
    {
    	title: 'CONTACT US',
    	text: 'For enquiries, comments and questions, reach us at our Head Office, 24 Adeola Odeku Victoria Island, Lagos State, Nigeria; or our contact details located on our website www.paychange.ng.',
    },
]
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



