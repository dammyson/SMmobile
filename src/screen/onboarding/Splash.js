
import React, { Component } from 'react';
import { StatusBar, BackHandler, StyleSheet,Clipboard, AsyncStorage,  TouchableOpacity, View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Toast} from 'native-base';
export default class Splash extends Component {
  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        token: "", 
 }

  }

  async componentDidMount() {
    console.warn(new Date())
    this.checkPermission();  
    setTimeout(() => {
      this.initPage();
     
    //this.props.navigation.navigate('Home'); 
    }, 3000);
  }

  initPage = () => {
    AsyncStorage.getItem('step').then((value) => {
      console.log(value)
      if (value == 'one') {
        this.props.navigation.replace('addpin')
      } else if (value == null) {
        this.props.navigation.replace('Intro')
      } else if (value == "two") {
        this.props.navigation.replace('complete')
      }
      else if (value == "three") {
        this.props.navigation.replace('home')
      }
      else {
        this.props.navigation.replace('Intro')
      }

    })

  }

   //1
async checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled == 1) {
    console.warn('enabled');
    this.getToken();
  } else {
    console.warn('not enabled');
    this.requestUserPermission();
  }

}
async getToken() {
  let fcmToken = await AsyncStorage.getItem('FBToken');
  console.warn(fcmToken);
  console.log(fcmToken);
  this.setState({token: fcmToken})
  if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log(fcmToken);
      console.warn(fcmToken);
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('FBToken', fcmToken);
          this.setState({token: fcmToken})
      }
  }
}

async requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    this.getToken()
    console.log('Authorization status:', authStatus);
  }

}


handlerLongClick(info) {
  Clipboard.setString(info)
  Toast.show({
      text: 'Text copied to clipboard !',
      position: 'top',
      type: 'success',
      buttonText: 'Dismiss',
      duration: 1500
  });

};

  render() {
    return (
      <View style={styles.backgroundImage}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>




      </View>
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
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor:'#fff'
  },
  logo: {
    width: 250,
    height: 110,
    justifyContent: 'center',
    resizeMode: 'contain'
  }
  ,
});
