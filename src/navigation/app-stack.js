import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';

import Splash from '../screen/onboarding/Splash';
import Intro from '../screen/onboarding/Intro';
import Welcome from '../screen/user/Welcome';
import Login from '../screen/user/Login';
import Register from '../screen/user/Register';
import Otp from '../screen/user/Otp';
import AppPin from '../screen/user/AddPin';
import ChangePin from '../screen/user/ChangePin';
import AddBank from '../screen/user/AddBank';
import Scan from '../screen/activities/Scan';


import Home from '../screen/activities/Home';
import Withdrawal from '../screen/activities/Withdrawal'
import QRCode from '../screen/activities/QRCode'
import SelectBank from '../screen/activities/SelectBank';

import Settings from '../screen/setting/Settings';
import Account from '../screen/setting/Account';
import UserDetail from '../screen/setting/UserDetails';
import QrCodeSettings from '../screen/setting/QrCodeSettings';


import Withdraw from '../screen/withdraw/Withdraw'

import MerchantWithdraw from '../screen/withdraw/MerchantWithdraw'
import Merchants from '../screen/merchant/Merchants'
import MerchantHome from '../screen/merchant/Home'

import MerchantsQRSetting from '../screen/merchant/QRCodeSetting'


import Wallet from '../screen/activities/Clone';
import BusinessWallet from '../screen/merchant/BusinessWallet';
import UserTop from '../screen/activities/UserTop';
import MTopUp from '../screen/merchant/MTopUp';
import ComingSoon from '../screen/activities/ComingSoon';
import MSoon from '../screen/merchant/Msoon';
import TopUp from '../screen/merchant/TopUp';



import Bill from '../screen/bill/Bill';
import Airtime from '../screen/activities/Airtime';
import Terms from '../screen/setting/Terms';
import Privacy from '../screen/setting/Privacy';
import About from '../screen/setting/About';
import Permission from '../screen/setting/Permission';
import ForgetPin from '../screen/user/ForgetPin';

import FAQ from '../screen/setting/FAQ';


import NW from '../screen/activities/New_wallet';
import GiveAwayH from '../screen/giveAway/index';
import Donate from '../screen/giveAway/Donate';
import MDonate from '../screen/giveAway/MDonate';
import Redeem from '../screen/giveAway/Redeem';
import Ongoing from '../screen/giveAway/Ongoing';
import DonationList from '../screen/giveAway/DonationList';


import Transfer from '../screen/transfer/Transfer';
import Virtual from '../screen/wallet/Virtual';
import TopBankDetails from '../screen/topUp/TopBankDetails';
import Complete from '../screen/user/Complete';
import ResetPin from '../screen/user/ResetPin';
import Details from '../screen/tranasctions/Details';
import Dispute from '../screen/tranasctions/Dispute';
import PhoneAuthScreen from '../screen/topUp/PhoneAuthScreen'; 
import Pay from '../screen/activities/Pay';
import Nnew from '../screen/setting/NEWN';
import Utilities from '../screen/bill/Utilities';
import Crypto from './crypto-stack'
import UpdateDonation from '../screen/giveAway/UpdateDonation';
import NewAirtime from '../screen/bill/NewAirtime';
import LCC from '../screen/bill/LCC';
import Cable from '../screen/bill/Cable';
import Electricity from '../screen/bill/Electricity';
import DataBundle from '../screen/bill/DataBundle';
import Limits from '../screen/giveAway/Limits';
import WalletHome from '../screen/wallet/Home';
import ForgetPassword from '../screen/user/ForgetPassword';
import ChangePassword from '../screen/user/ChangePassword';

/*
*/

//console.disableYellowBox = true;

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    const deepLinking ={
      prefixes: ['https://paychange.ng', 'paychange.ng://'],
      config:{
        Home: 'Splash',
        Details:{
          path: 'details/:itemId',
          params:{
            itemId:null
          }
        }
      }
    }
    return (
      <Root>
        <NavigationContainer linking={deepLinking}>
      
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: true,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, 
              headerShown: false,
             }}
             initialRouteName="transfer">

            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="Intro" component={Intro}  />
            <Stack.Screen name="Welcome" component={Welcome}  />
            <Stack.Screen name="login" component={Login}   />
            <Stack.Screen name="reg" component={Register}   />
            <Stack.Screen name="otp" component={Otp}   />
            <Stack.Screen name="addpin" component={AppPin}   />
            <Stack.Screen name="changepin" component={ChangePin}   />
            <Stack.Screen name="forgotPassword" component={ForgetPassword}   />
            <Stack.Screen name="changePassword" component={ChangePassword}   />
            <Stack.Screen name="addbank" component={AddBank}   />
            <Stack.Screen name="home" component={Home}   />


            <Stack.Screen name="withdrawal" component={Withdrawal}   />
            <Stack.Screen name="qr" component={QRCode}   />
            <Stack.Screen name="scan" component={Scan}    />
            <Stack.Screen name="selbank" component={SelectBank}   />
            <Stack.Screen name="setting" component={Settings}   />
            <Stack.Screen name="account" component={Account}   />
            <Stack.Screen name="userD" component={UserDetail}   />
            <Stack.Screen name="qrsetting" component={QrCodeSettings}   />
            <Stack.Screen name="merchant_withdraw" component={MerchantWithdraw}   />
            <Stack.Screen name="merchant" component={Merchants}   />
            <Stack.Screen name="merchant_home" component={MerchantHome}   />
            <Stack.Screen name="merchant_qrsetting" component={MerchantsQRSetting}   />
            <Stack.Screen name="bwallet" component={BusinessWallet}   />
            <Stack.Screen name="user_top" component={UserTop}   />
            <Stack.Screen name="merchant_top" component={MTopUp}   />
            <Stack.Screen name="soon" component={ComingSoon}   />
            <Stack.Screen name="msoon" component={MSoon}   />
            <Stack.Screen name="top_up" component={TopUp}   />
              <Stack.Screen name="clone" component={Wallet}   />
            {/** <Stack.Screen name="charge" component={ChargeCard}  />*/} 
              <Stack.Screen name="bill" component={Bill}   />
              <Stack.Screen name="airtime" component={Airtime}   />
              <Stack.Screen name="terms" component={Terms}   />
              <Stack.Screen name="privacy" component={Privacy}   />
              <Stack.Screen name="about" component={About}   />
              <Stack.Screen name="faq" component={FAQ}   />
              <Stack.Screen name="permission" component={Permission}   />
              <Stack.Screen name="forgetpin" component={ForgetPin}   />
              <Stack.Screen name="resetpin" component={ResetPin}   />
              <Stack.Screen name="NW" component={NW}   />
              <Stack.Screen name="giveaway_h" component={GiveAwayH}   />
              <Stack.Screen name="donate" component={Donate}   />
              <Stack.Screen name="mdonate" component={MDonate}   />
              <Stack.Screen name="ext_donate" component={UpdateDonation}   />
              <Stack.Screen name="limit" component={Limits}   />
              <Stack.Screen name="redeem" component={Redeem}   />
              <Stack.Screen name="ongoing" component={Ongoing}   />
              <Stack.Screen name="donationlist" component={DonationList}   />
              <Stack.Screen name="transfer" component={Transfer}   />
              <Stack.Screen name="virtual" component={Virtual}   />

              <Stack.Screen name="top_bank_d" component={TopBankDetails}   />
              <Stack.Screen name="complete" component={Complete}   />

              <Stack.Screen name="transaction_d" component={Details}   />
              <Stack.Screen name="dispute" component={Dispute}   />
              <Stack.Screen name="phone_auth" component={PhoneAuthScreen}   />
              <Stack.Screen name="Pay" component={Pay}   />
              <Stack.Screen name="Npage" component={Nnew}   />
              <Stack.Screen name="Utils" component={Utilities}   />
              <Stack.Screen name="crptyo" component={Crypto}   />
              <Stack.Screen name="nair" component={NewAirtime}   />
              <Stack.Screen name="lcc" component={LCC}   />
              <Stack.Screen name="cable" component={Cable}   />
              <Stack.Screen name="eletricity" component={Electricity}   />
              <Stack.Screen name="data" component={DataBundle}   />
              <Stack.Screen name="crypto" component={Crypto}   />
          
          </Stack.Navigator>
        
        </NavigationContainer>
        </Root>
      );
  }

}
export default AppStack;