
import {combineReducers} from 'redux'
import userStateReducer from './userReducer'
import productReducer from './productReducer'
import categoriesReducer from './categoriesReducer'

const rootReducer = combineReducers({
    user: userStateReducer,
    product: productReducer,
    category: categoriesReducer
})

export default rootReducer