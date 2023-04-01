// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, StatusBar, ImageBackground, Image, Dimensions, StyleSheet, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { View, Text, Button, } from 'native-base';
import { Avatar, Badge, Card, Icon, SocialIcon, Tile } from 'react-native-elements';



import color from '../../component/color'


export default class Terms extends Component {
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
                            <Text style={styles.title}>Terms And Conditions </Text>
                            <Text style={styles.bodyText}>These terms and conditions are an agreement between Mobile Application Developer and you. This Agreement sets forth the general terms and conditions of your use of the sendmonny mobile Application and any of its products or services (collectively, "Mobile Application" or "Services"). </Text>
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
      title: 'Accounts and membership',
      text: 'You must be at least 18 years of age to use this Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are at least 18 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.',
    },
    {
        title: 'Backups',
        text: 'We are not responsible for content residing in the Mobile Application. In no event shall we be held liable for any loss of any Content. It is your sole responsibility to maintain Apropriate backup of your Content. Notwithstanding the foregoing, on some occasions and in certain circumstances, with absolutely no obligation, we may be able to restore some or all of your data that has been deleted as of a certain date and time when we may have backed up data for our own purposes. We make no guarantee that the data you need will be available.',
      },
      {
        title: 'Links to other mobile Applications',
        text: 'Although this Mobile Application may link to other mobile Applications, we are not, directly or indirectly, implying any Approval, association, sponsorship, endorsement, or affiliation with any linked mobile Application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile Applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any mobile Application which you access through a link from this Mobile Application. Your linking to any other off-site mobile Applications is at your own risk.',
      },
      {
        title: 'Prohibited uses',
        text: 'In addition to other terms as set forth in the Agreement, you are prohibited from using the Mobile Application or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related mobile Application, other mobile Applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related mobile Application, other mobile Applications, or the Internet. We reserve the right to terminate your use of the Service or any related mobile Application for violating any of the prohibited uses.',
      },
      {
      
        title: 'Intellectual property rights',

        text: 'This Agreement does not transfer to you any intellectual property owned by Mobile Application Developer or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Mobile Application Developer. All trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services, are trademarks or registered trademarks of Mobile Application Developer or Mobile Application Developer licensors. Other trademarks, service marks, graphics and logos used in connection with our Mobile Application or Services may be the trademarks of other third-parties. Your use of our Mobile Application and Services grants you no right or license to reproduce or otherwise use any Mobile Application Developer or third-party trademarks.',
      },
      { 

      	title: 'Limitation of liability',

         text: 'To the fullest extent permitted by Applicable law, in no event will Mobile Application Developer, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Mobile Application Developer has been advised as to the possibility of such damages or could have foreseen such damages. However, nothing in this disclaimer shall exclude or limit our liability for fraud, for death or personal injury caused by our negligence, or for any other liability which cannot be excluded or limited under Applicable law.',
      },
      {

      	title: 'Indemnification',

         text: 'You agree to indemnify and hold Mobile Application Developer and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Mobile Application or Services or any willful misconduct on your part.',
      },
      {

      	title: 'Severability',

         text: 'All rights and restrictions contained in this Agreement may be exercised and shall be Applicable and binding only to the extent that they do not violate any Applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.',

      },
      {

      	title: 'Dispute resolution',
        text: 'The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Nigeria without regard to its rules on conflicts or choice of law and, to the extent Applicable, the laws of Nigeria. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the state and federal courts located in Lagos, Nigeria, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.',

      },
      {

      	title: 'Changes and amendments',

         text: 'We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will post a notification in our Mobile Application. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes.',
      },
      {

      	title: 'Acceptance of these terms',

         text: 'You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services.',
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



