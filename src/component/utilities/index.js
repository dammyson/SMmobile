import { AsyncStorage } from 'react-native';


export const getToken = async () => {
  return AsyncStorage.getItem('auth')
};


export const getWallet = async () => {
  return AsyncStorage.getItem('wallet')
};

export const getData = async () => {
  return AsyncStorage.getItem('data')
};

export const getPref = async () => {
  return AsyncStorage.getItem('wallet_pre')
};

export const getFmc = async () => {
  return AsyncStorage.getItem('FBToken')
};

export const getUserType = async () => {
  return AsyncStorage.getItem('type')
};

export const getChatNumber = () => {
  return '2347045108732';
}; 


export const getType = (param) => {
  switch (param) {
    case 'donation':
      return 'Donation';
    case 'top_up':
      return 'Top Up';
    case 'withdrawal':
      return 'Withdrawal';
    case 'transfer':
      return 'Transfer';
    default:
      return 'Credit';
  }
}


export const getBillType = (param) => {
  switch (param) {
    case 'donation':
      return 'Donation';
    case 'top_up':
      return 'Top Up';
    case 'withdrawal':
      return 'Withdrawal';
    case 'transfer':
      return 'Transfer';
    default:
      return 'Credit';
  }
}

export const processResponse = (response) => {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}

export const makeOrderId = (length) => {
  var result = '';
  var characters = '1234567899876543210123456789abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



export const makeUrlStringFromObject = (data) => {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
};


export const getCrypTems = async () => {
  return AsyncStorage.getItem('crpterm')
};

