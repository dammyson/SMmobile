import React from 'react'
import { StyleSheet, StatusBar, Dimensions, View, ImageBackground} from 'react-native'
import PropTypes from 'prop-types';
import { PulseIndicator } from 'react-native-indicators';
import color from '../color';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width


const ActivityIndicator = ({name, message, onPress }) => {


  return (
   
    <View
    style={styles.loadingBackgroundImage}
    resizeMode="cover"
>
    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.welcome}>
            <PulseIndicator color={'#2D2C71'} size={70} />
        </View>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    loadingBackgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'#FFF',
        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
    },
    
});

export default ActivityIndicator