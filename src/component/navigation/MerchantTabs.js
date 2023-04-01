import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Icon, } from 'react-native-elements';
import { View, Text } from 'react-native';
import colors from './../color';
import Home from '../../screen/wallet/Wallet';
import Transactions from '../../screen/tranasctions/Transaction';
import Setting from '../../screen/setting/Settings';


const Tab = createBottomTabNavigator();

class AppNavigator extends Component {

  render() {
    let menuBarIcon;

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              return <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 40, }}>
                <Icon
                  active
                  name="home"
                  type='antdesign'
                  size={20}
                  color={color}
                />
                <Text style={{ color: color, fontFamily: 'Poppins-Medium', fontSize: 10, opacity: 0.6 }}> Home </Text>
              </View>
                ;
            }
            else if (route.name === 'Transactions') {
              return <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 40, }}>
                <Icon
                  active
                  name="creditcard"
                  type='antdesign'
                  size={20}
                  color={color}
                />
                <Text style={{ color: color, fontFamily: 'Poppins-Medium', fontSize: 10, opacity: 0.6 }}> Transactions </Text>
              </View>
                ;
            }
            else if (route.name === 'Settings') {
              return <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 40, }}>
                <Icon
                  active
                  size={20}
                  color={color}
                  name="setting"
                  type='antdesign'
                />
                <Text style={{ color: color, fontFamily: 'Poppins-Medium', fontSize: 10, opacity: 0.6 }}> Settings </Text>
              </View>;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.primary_color,
          inactiveTintColor: '#000',
          style: { height: 50 },
          showLabel: false,
          keyboardHidesTabBar: true

        }}
      >


        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Settings" component={Setting} />

      </Tab.Navigator>

    );
  }

}

export default AppNavigator;