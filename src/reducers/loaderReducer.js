import { loaderActions } from '../constants'

const defaultState = { loading:false, message:'Done'}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case loaderActions.HIDE_LOADER:
            state = defaultState
            return state
            break
        case loaderActions.SHOW_LOADER:
            state = {loading:true, message: action.payload}
            return state
            break
        default:
            return state
    }
}
export default reducer