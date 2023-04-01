import React from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import {getData,} from '../utilities';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width


export default class Success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: [],
            auth: '',
            loading:false,
            lname:'',
            fname:''
           
        };
    }

    async componentWillMount() {
        const name = JSON.parse(await getData())
        this.setState({
            fname: name.first_name,
            lname: name.last_name
        })
      }

    render() {
        const { name, message, onPress  } = this.props;
        const {  fname, lname, } = this.state
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#3AA34E', '#1D5227']} style={styles.backgroundImage} block iconLeft>
    <View style={{ flex: 1.6 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: 23, marginBottom: 20, fontWeight: '900' }}>Successful </Text>
           
             <LottieView style={{ height:260, }} source={require('../../assets/check.json')} autoPlay  loop={false}/>
        </View>
    </View>

    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', borderRadius: 15 }}>
        <View style={{ alignItems: 'center' }}>
  <Text style={{ color: '#3AA34E', fontSize: 16, fontWeight: '500' }}> Dear {fname} {lname}</Text>

            <Text style={{ fontFamily: 'Poppins-Light', color: '#3E3E3E', textAlign: 'center', fontSize: 13, margin: 20, }}>
               {message}
            </Text>
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4b47b7', '#0f0e43']} style={styles.buttonContainer} block iconLeft>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}  onPress={onPress}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fdfdfd', fontSize: 14 }}>Continue</Text>
            </TouchableOpacity>
        </LinearGradient>

    </View>
</LinearGradient>
  )
}

}

Success;

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        height: 65,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        borderRadius: 5,
    },

    
});
