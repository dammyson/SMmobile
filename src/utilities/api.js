import merge from 'lodash/merge'

import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'
import { getToken } from './index'
import { getRefreshToken, processResponse, makeUrlStringFromObject, loginbaseUrl , storeToken} from './index';
import base64 from 'react-native-base64';
 
const COOKIE_NAME = 'MYAPP'
 
const retrieveToken =async () => await getToken() 
const rt =async () => await getRefreshToken()
 
const fetchJSONWithToken = async (url, options = {}) => {
  const token =await retrieveToken()
 
  let optionsWithToken = options
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }
  return fetchJSON(url, optionsWithToken)
}
 

 
const shouldRefreshToken = error => error.response.status === 401
 
const refreshToken = async () => {
  console.warn("GETING IT")
     var details = {
        'refresh_token': await getRefreshToken(),
        'grant_type': 'refresh_token'
      };
      var requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": 'Basic ' + base64.encode(`${'nucleus-passport'}:${'secret'}`),
          'Content-Type': "application/x-www-form-urlencoded",
          Accept: 'application/json',
        },
        body: makeUrlStringFromObject(details)
      };
     // console.warn(requestOptions)
      return fetch(loginbaseUrl() + 'oauth/token', requestOptions)
        .then(processResponse)
        .then(res => {
          console.warn(res)
          if (res.statusCode == 200) {
             storeToken(res.data.access_token)
          } else {
           
          }
        })
        .catch((error) => {
          console.warn(error)
        }); 
}
 
const custom_fetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken
})
 
export {
  custom_fetch,
}