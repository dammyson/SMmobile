
import React, { Component } from 'react';
import { StatusBar, BackHandler, StyleSheet,Clipboard, AsyncStorage,  TouchableOpacity, View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase'
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
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
 // firebase.messaging().subscribeToTopic("global");
}
async getToken() {
  let fcmToken = await AsyncStorage.getItem('FBToken');
  console.warn(fcmToken);
  console.log(fcmToken);
  this.setState({token: fcmToken})
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken);
      console.warn(fcmToken);
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('FBToken', fcmToken);
          this.setState({token: fcmToken})
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
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
