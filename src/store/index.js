import { createStore } from "redux"
import globalReducer from "./reducer"

// 第二个参数可选，用于设置state初始状态
const store = createStore(
    globalReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;