import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../../screen/wallet/Wallet';
import Transactions from '../../screen/tranasctions/Transaction';
import Setting from '../../screen/setting/Settings';

import { Icon} from 'react-native-elements'
import colors from './../color';




const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.primary_color}
      inactiveColor='black'
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon
            name="home"
            type='antdesign'
            color={color}
          /> 
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => (
            <Icon
            name="creditcard"
            type='antdesign'
            color={color}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon
              active
              name="setting"
              type='antdesign'
              color={color}
            />
          ),
        }}
      />

    </Tab.Navigator>
);

export default MainTabScreen;