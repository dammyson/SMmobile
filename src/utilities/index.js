import { AsyncStorage } from 'react-native';
const env = "PROD"
const authHost = env == 'ENV' ? 'https://sendmonny.ng/api' : 'https://sendmonny.ng/api'

export const baseUrl = () => {
  return authHost;
};

export const storeToken = async (selectedValue) => {
  try {
    await AsyncStorage.setItem('token', selectedValue);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storeUser = async (value) => {
  try {
    await AsyncStorage.setItem('user', value);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}


export const storeEmail = async ( email) => {
  try {
    await AsyncStorage.setItem('user_email', email);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storeType = async (value) => {
  try {
    await AsyncStorage.setItem('type', value);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storeWallet = async (value) => {
  try {
    await AsyncStorage.setItem('wallet', value);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}

export const storePhone = async ( phone) => {
  try {
    await AsyncStorage.setItem('phone_number', phone);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}




export const getToken = async () => {
  let token = await AsyncStorage.getItem('token')
  return token
};

export const getUser = async () => {
  let user_email = await AsyncStorage.getItem('user')
  return  user_email
};

export const getEmail = async () => {
  let user_email = await AsyncStorage.getItem('user_email')
  return  user_email
};

export const getType = async () => {
  let tenant_type = await AsyncStorage.getItem('tenant_type')
  return tenant_type
};

export const getWallet = async () => {
  let tenant_type = await AsyncStorage.getItem('wallet')
  return tenant_type
};


export const getPhone = async () => {
  let user_email = await AsyncStorage.getItem('phone_number')
  return  user_email
};



export const getLogout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user_email');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('tenant_type');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('enrollee_id');

    return true;
  }
  catch (exception) {
    return false;
  }
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

export const processResponse = (response) =>  {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1]
  }));
}



export const getRememberMe = async () => {
  return AsyncStorage.getItem('rem_me')
};



export const storeUsername = async ( email) => {
  try {
    await AsyncStorage.setItem('user_name', email);
  } catch (error) {
    console.warn('AsyncStorage error: ' + error.message);
  }
}
export const getUsername = async () => {
  let user_name = await AsyncStorage.getItem('user_name')
  return  user_name
};