// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TextInput, Dimensions, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col, } from 'native-base';
import URL from '../../component/server'
import { getToken, getData,makeUrlStringFromObject, processResponse } from '../../component/utilities';
import color from '../../component/color'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from '../../component/view/ActivityIndicator'
export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false,
            view_balance: false,
            data: '',
            email:'',
            fname: '',
            auth: '',
            user: '',
            date: '',
        };
    }
    async componentWillMount() {
        this.setState({
            auth: await getToken(),
        })
        const name = JSON.parse(await getData())
        console.warn(name)
        this.setState({
            data: name,
            email:  name.email,
            lname:  name.last_name,
            fname: name.first_name
        })
    }

    updateDetailsRequest() {
        
        const { auth, fname, lname, email} = this.state
        console.warn(auth);
        
      
    
        if (fname == "" || lname == "" || email == "") {
            Alert.alert('Validation failed', 'Make changes to the field(s) and continue', [{ text: 'Okay' }])
            return
          }

        this.setState({ loading: true });

       
        var details = {
            'email': email,
            'first_name': fname.trim(),
            'last_name': lname.trim()
          };

        fetch(URL.url + '/profile/update' , {
            method: 'PATCH', headers: {
                Accept: 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'Bearer ' + auth,
            }, body: makeUrlStringFromObject(details),
            redirect: 'follow'
        })
        .then(processResponse)
        .then(res => {
            const { statusCode, data } = res;
               this.setState({ loading: false });
                console.warn(statusCode, data)
                if(statusCode == 200  || statusCode == 201){
                    AsyncStorage.setItem('data', JSON.stringify(data.data));
                    this.getWalletRequest()
                    this.setState({
                        loading: false,
                        email:  data.data.email,
                        lname:  data.data.last_name,
                        fname: data.data.first_name
                    })
                }else if(statusCode == 422){
                    Alert.alert('Validation error', 'Please make sure your name does not contain spaces or special characters', [{ text: 'Okay' }])
                  }else{
                    Alert.alert('Operation failed', 'Please try again', [{ text: 'Okay' }])
                }
                

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });


    }

    getWalletRequest() {
        const { auth } = this.state
        console.warn(URL.urltwo)

        this.setState({ loading: true });
        fetch(URL.urltwo + '/wallet', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + auth,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res);
                AsyncStorage.setItem('wallet', JSON.stringify(res.data));
                this.setState({
                    loading: false
                })
                Alert.alert('Operation successfull', 'User details updated succefully', [{ text: 'Okay' }])

            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });
    };



    render() {


        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    {this.renderBody()}
                </Content>
                {this.state.loading ? <ActivityIndicator /> : null}
            </Container>
        );


    }
    renderBody() {
        const placeholder = {
            label: 'Select  Gender',
            value: null,
            color: "#000",
        };
        return (
            <View style={styles.body}>
                <View style={{ height: 20 }}></View>
                <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() =>this.props.navigation.goBack()} >
                        <Icon
                            name="arrowleft"
                            size={30}
                            type='antdesign'
                            color={color.primary_color}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Text style={styles.title}>Update profile</Text>
                    </View>
                    <View style={{ justifyContent: 'center', width: 40, alignItems: 'center' }}></View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 15 }}>
                    <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Regular', fontSize: 14 }}>Fill in these details to complete your registration </Text>
                </View>

                <View style={styles.mainContent}>


                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Email  </Text>
                        <View style={styles.input}>
                            <TextInput
                                defaultValue={this.state.data.email}
                                placeholder="Enter Email"
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                onSubmitEditing={() => this.fnameInput.focus()}
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ email: text })}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Icon
                                    name="mail"
                                    size={22}
                                    type='feather'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Phone  </Text>
                        <View style={styles.input}>
                            <TextInput
                                defaultValue={this.state.data.phone}
                                placeholder=""
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                editable={false}
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ fname: text })}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Icon
                                    name="phone"
                                    size={22}
                                    type='feather'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>First Name  </Text>
                        <View style={styles.input}>
                            <TextInput
                                defaultValue={this.state.data.first_name}
                                placeholder="Enter First Name"
                                placeholderTextColor='#3E3E3E'
                                returnKeyType="next"
                                onSubmitEditing={() => this.lnameInput.focus()}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ fname: text })}
                                ref={(input) => this.fnameInput = input}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Icon
                                    name="user"
                                    size={22}
                                    type='feather'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={styles.textInputContainer}>
                        <Text style={styles.actionbutton}>Last Name  </Text>
                        <View style={styles.input}>
                            <TextInput
                                defaultValue={this.state.data.last_name}
                                placeholder="Enter Last Name"
                                placeholderTextColor='#3E3E3E'
                                onSubmitEditing={()=> this.updateDetailsRequest()}
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1, fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold', }}
                                onChangeText={text => this.setState({ lname: text })}
                                ref={(input) => this.lnameInput = input}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <Icon
                                    name="user"
                                    size={22}
                                    type='feather'
                                    color={'#3E3E3E'}
                                />
                            </View>
                        </View>
                    </View>



                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.updateDetailsRequest()}  >
                            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Next</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>

        )
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
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainContent: {
        flex: 1,

    },
    sideContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        width: Dimensions.get('window').width,
        backgroundColor: '#fff'
    },
    title: {
        marginTop: 2,
        marginBottom: 2,
        marginRight: 13,
        marginLeft: 13,
        fontSize: 15,
        color: '#2D2C71',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    textInputContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
    input: {
        height: 65,
        borderColor: '#3E3E3E',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        paddingLeft: 12,
        flexDirection: 'row'
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 14,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        height: 65,
      
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 29,
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "#d1d1d1",
        margin: 3,
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#d1d1d1",
    },

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
        fontSize: 12, color: '#3E3E3E', fontFamily: 'Poppins-SemiBold',
        paddingRight: 30,
        // to ensure the text is never behind the icon
    },
});

