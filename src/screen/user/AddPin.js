// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, ImageBackground, TouchableOpacity, Dimensions, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import URL from '../../component/server'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { processResponse } from '../../component/utilities';
import ActivityIndicator from '../../component/view/ActivityIndicator'
import ResetPinOne from '../../component/view/ResetPinFirst'
import ResetPinTwo from '../../component/view/ResetPinSecond'
import { baseUrl, getToken } from '../../utilities';

import { connect } from 'react-redux';
import { HIDE_LOADER, SHOW_LOADER } from '../../actions/loaderAction';
import { lightTheme } from '../../theme/colors';

class AddPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      auth: "",
      type: "",
      pin: "",
      pin_confirmation: '',
      confirm: false,
      done: false,
    };
  }


  async componentDidMount() {
    this.setState({ auth: await getToken() })
  }


  getCodeOne(code) {
    if (code.length == 4) {
      this.setState({ pin: code, confirm: true })

    }
  }
  getCodeTwo(code) {

    if (code.length == 4) {
      this.addPinRequest(code)
    }
  }


  addPinRequest(pin_confirmation) {
    const { pin, auth, } = this.state
    if (pin == "" || pin_confirmation == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (pin == pin_confirmation) {
      } else {
        Alert.alert('Validation failed', 'Pin are not the same pls enter them again', [{ text: 'Okay' }])
        return
      }
    }

    let formData = JSON.stringify({
      pin: pin,
      pin_confirmation: pin_confirmation,
    })


    this.props.showLoading()

    fetch(baseUrl() + '/transaction-pin/create', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      }, body: formData,
    })
      .then(processResponse)
      .then(res => {
        this.props.hidLoading()
        const { statusCode, data } = res;
       
        if (statusCode === 201) {
          console.warn(statusCode, data, "THISSS");
          this.setState({ done: true,  confirm: false })
          AsyncStorage.setItem('step', 'c');
        } else {
          this.setState({ confirm: false })
          Alert.alert('Operation failed', 'Please check your phone network and retry', [{ text: 'Okay' }])
        }
      })
      .catch((error) => {
        console.log("Api call error");
        console.warn(error);
        alert(error.message);
        this.props.hidLoading()
      });

  }


  firstPin(data) {
    this.setState({ pin: data, confirm: true })
  }
  seconePin(data) {
    this.addPinRequest(data)
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/primary.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Container style={{ backgroundColor: 'transparent' }}>
          <Content>
            {this.state.confirm ?
              this.renderConfirm()
              : this.state.done ?
                this.renderDone()
                : this.renderBody()
            }
          </Content>
        </Container>
      </ImageBackground>

    );
  }

  renderBody() {
    return (<ResetPinOne OnComplete={(data) => this.firstPin(data)} />
    )
  }

  renderConfirm() {
    return (<ResetPinTwo OnClose={() => this.setState({ confirm: false })} OnComplete={(data) => this.seconePin(data)} />)
  }

  renderDone() {
    return (<View style={styles.body}>
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/correct.png')} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 25 }}>
          <Text style={{ color: '#0F0E43', fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>All Set </Text>
          <Text style={{ color: '#2E2E2E', fontFamily: 'Poppins-Light', fontSize: 12 }}>You are all set to explore Sendmonny now.</Text>
        </View>

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[lightTheme.PRIMARY_COLOR, lightTheme.PRIMARY_COLOR]} style={styles.buttonContainer} block iconLeft>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.props.navigation.replace('home')}  >
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </View>
    )
  }


}



const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(SHOW_LOADER("Setting pin")),
    hidLoading: () => dispatch(HIDE_LOADER())
  }
};
export default connect(null, mapDispatchToProps)(AddPin)



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
    height: Dimensions.get('window').height,
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
    justifyContent: 'center',
    alignItems: 'center',
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

