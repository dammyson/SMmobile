import { combineReducers } from 'redux';

import loaderReducer from './loaderReducer'

// Combine all the reducers
const rootReducer = combineReducers({
     loader: loaderReducer,
   
})

export default rootReducer;