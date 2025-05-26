import handleCart from './handleCart'
import authReducer from './authReducer'
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleCart,
    user: authReducer
})

export default rootReducers