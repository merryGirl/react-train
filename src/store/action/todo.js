import { ADD_TODO, DEL_TODO, INIT_TODO } from '../actionTypes'
export function addTodo(value) {
    return {
        type: ADD_TODO,
        value
    }
}

export function delTodo(value) {
    return {
        type: DEL_TODO,
        value
    }
}

export function initTodo(value) {
    return {
        type: INIT_TODO,
        value
    }
}