import { loaderActions } from '../constants'

export const SHOW_LOADER = (message) => {
    return {
        type: loaderActions.SHOW_LOADER,
        payload: message
    }
}

export const HIDE_LOADER = () => {
    return {
        type: loaderActions.HIDE_LOADER,
    }
}
