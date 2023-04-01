import {  Dimensions } from "react-native";
import { getWalletUrl, getIdentitytUrl, getBilltUrl, getDonationUrl} from './env';

module.exports = {
  url: getIdentitytUrl(),
  urltwo: getWalletUrl(),
  urlthree: getBilltUrl(),
  urlfour: getDonationUrl(),
  bgcolor: "#01215B",
  homelinkcolor: "#F15B2D",
  height: Dimensions.get('window').height ,
}


