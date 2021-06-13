import { ADD_TODO, DEL_TODO, INIT_TODO } from '../actionTypes'

const reducer = (state = [], action) => {
    const { type, value } = action || {}
    switch (type) {
        case ADD_TODO:
            return state.concat(value)
            break;
        case DEL_TODO:
            state.splice(value, 1)
            return Object.assign([], state)
            break;
        case INIT_TODO:
            return value
            break;
        default:
            return state
    }
}
export default reducer;