import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, Text, Platform, } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements'

import Home from '../screen/wallet/Home';
import Transactions from '../screen/tranasctions/Transaction';
import Setting from '../screen/setting/Settings';


import { useNavigation } from '@react-navigation/native';
import { font } from '../constants';
import { lightTheme } from '../theme/colors';



const Tab = createBottomTabNavigator();



const App = () => {

  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name == 'Transactions') {
              return (
                < View style={styles.item}>
                  <Icon
                    active
                    focused={focused}
                    name="arrow-swap"
                    type='fontisto'
                    color={color}
                    size={20}
                  />
                  <Text style={[styles.title, { color: color }]}>Transactions</Text>
                </ View>
              );
            }


            else if (route.name == 'Home') {
              return (


                < View style={styles.item}>
                  <Icon
                    active
                    focused={focused}
                    name="home"
                    type='foundation'
                    color={color}
                    size={20}
                  />
                  <Text style={[styles.title, { color: color }]}>Home</Text>
                </ View>
              );
            }



            else if (route.name == 'Settings') {
              return (
                < View style={styles.item}>
                  <Icon
                    active
                    focused={focused}
                    name="md-settings"
                    type='ionicon'
                    size={20}
                    color={color}
                  />
                  <Text style={[styles.title, { color: color }]}> Settings</Text>
                </ View>
              );
            }
          },
        })}

        tabBarOptions={{
          backgroundColor: lightTheme.WHITE_COLOR,
          initialRoute: 'Home',
          showLabel: false,
          activeTintColor: lightTheme.PRIMARY_COLOR, //'tomato',
          inactiveTintColor: '#AEB1BE',


          style: {
            height: 80,
            backgroundColor: lightTheme.WHITE_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow



          },
        }}
      >


        {/* <Tab.Screen navigation={navigation} name="Add" component={AppointmentInformation} /> */}
        {/* <Tab.Screen navigation={navigation} name="Current" component={Current} /> */}

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen navigation={navigation} name="Transactions" component={Transactions} />
      
        <Tab.Screen navigation={navigation} name="Settings" component={Setting} />
      </Tab.Navigator>
    </>

  );
}

export default App;



const styles = StyleSheet.create({

  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.19)",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 30,
    elevation: 5,
    shadowOpacity: 1,
  },
  title: {
    fontFamily: font.MEDIUM,
    marginBottom: 10,
    fontSize: 13,

    color: lightTheme.WHITE_COLOR
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS == "ios" ? 20 : 5,

  },
  special: {
    backgroundColor: lightTheme.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 70,
    height: 70,
    left: -35,
    top: -60,

    borderRadius: 35,
    borderWidth: 2
  }
});