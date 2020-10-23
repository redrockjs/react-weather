import {GET_POSITION} from "./types";

const handlers = {
    [GET_POSITION]: (state, {payload}) => ({
        ...state,
        currentPosition: payload
    }),
    DEFAULT: state => state
}

export const appReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
