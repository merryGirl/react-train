import { combineReducers } from "redux"
import todo from './todo'

const globalReducer = combineReducers({
    todo
})

export default globalReducer