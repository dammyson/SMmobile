import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';

import Crypto from '../screen/crypto/index'
import BitWallet from '../screen/wallet/BitWallet';
import BuyBitCoin from '../screen/crypto/BuyBitCoin';
import RecieveBitCoin from '../screen/crypto/RecieveBitCoin';
import BitWithDraw from '../screen/crypto/BitWithDraw';
import BitAddress from '../screen/crypto/BitAddress';

/*
*/

//console.disableYellowBox = true;

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
      <Root>
       
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: true,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, 
              headerShown: false,
             }}
             initialRouteName="bitcoinhome">

              <Stack.Screen name="crypto" component={Crypto}   />
              <Stack.Screen name="bitcoinhome" component={BitWallet}   />
              <Stack.Screen name="buybitcoin" component={BuyBitCoin}   />
              <Stack.Screen name="receivebitcoin" component={RecieveBitCoin}   />
              <Stack.Screen name="bitwithdraw" component={BitWithDraw}   />
              <Stack.Screen name="bitaddress" component={BitAddress}   />
          
          </Stack.Navigator>
        
       
        </Root>
      );
  }

}
export default AppStack;