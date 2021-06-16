/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import TodoList from './pages/todo-list/index'
import { 
    UseStateHooc,
    UseCallbackHooc,
    UseMemoParent,
    UseReducerHook
} from './pages/hooks/index'


import 'antd/dist/antd.css'

let rootDom = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h1>React Redux===============</h1>
            <TodoList />
            <UseStateHooc />
            <UseCallbackHooc />
            <UseMemoParent />
            <UseReducerHook />
        </div>
    </Provider>,
    rootDom
)
