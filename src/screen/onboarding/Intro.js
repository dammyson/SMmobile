
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Dimensions, ImageBackground, Image, } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import color from '../../component/color'


const slides = [
  {
    key: 'somethun',
    title: 'Put your money where \n your phone is',
    text: ' Petty transactions shouldn’t cause you  trouble. Create a sendmonny wallet now to pay and receive payments without worries',
    image: require('../../assets/inone.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Fund your mobile wallet  ',
    text: 'Never run out of money. Fund your wallet from a bank, a friend or a sendmonny merchant near you anytime.',
    image: require('../../assets/intwo.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun-dos',
    title: 'Quick as a flash!',
    text: 'Make express payment with just a scan. Spending and receiving money has never been this seamless',
    image: require('../../assets/inthree.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun-dos',
    title: 'No more change wahala',
    text: 'Step into a new world of stress-free money transactions now',
    image: require('../../assets/infour.png'),
    backgroundColor: '#febe29',
  }
];

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: true
    };
  }

  async componentDidMount() {

  }
  _renderItem = (item) => {
    return (
      
        <View style={styles.mainContent}>
          <View style={styles.imagContainer}>
          <Image style={styles.image} source={item.item.image} />
          </View>
        
          <Text style={styles.title}>{item.item.title}</Text>
          <Text style={styles.maintext}>{item.item.text}</Text>
          <Text style={styles.text}></Text>
        </View>
  

    );
  }
  _renderNextButton = () => {
    return (
      <View  style={{ backgroundColor:color.slide_color_dark, borderColor: color.slide_color_dark, borderWidth: 1, justifyContent: 'center', borderRadius: 10, marginTop: 10, }}>
        <Text style={styles.actionbutton}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <TouchableOpacity  onPress={() =>  this.props.navigation.navigate('Welcome')}  style={{ backgroundColor:color.slide_color_dark, borderColor: color.slide_color_dark, borderWidth: 1, justifyContent: 'center', borderRadius: 10, marginTop: 10, }}>
        <Text style={styles.actionbutton}>Done</Text>
      </TouchableOpacity>

    );
  };
  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        showNextButton={true}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        activeDotStyle={{ backgroundColor: color.slide_color_dark }}
      />
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'

  },
  imagContainer:{
    height: 400,
    width: Dimensions.get('window').width,

    alignItems:'flex-end',
    marginBottom:30
  },
  image: {
    resizeMode:'cover'
    
  },
  text: {
    color: '#5D5D5D',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 20,
    fontFamily: 'Montserrat-Light',
  },
  title: {
    marginTop: 10,
    fontSize: 17,
    color: '#0F0E43',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold',
  },
  maintext: {
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    color: '#5D5D5D',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  actionbutton: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 14,
    color: color.white,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: '600'
  },

});
