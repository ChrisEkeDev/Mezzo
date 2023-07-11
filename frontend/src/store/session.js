import { csrfFetch } from "./csrf";

const GET_USER = "mezzo/session/GET_USER"
const CLEAR_USER = "mezzo/session/CLEAR_USER"

const actionGetUser = (user) => ({
    type: GET_USER,
    payload: user
})

const actionClearUser = () => ({
    type: CLEAR_USER
})

export const thunkGetUser = (user) => async dispatch => {
    const { email, password } = user;
    const res = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetUser(data.user))
    } else {
        const error = await res.json()
        return error
    }
}

export const thunkClearUser = () => async dispatch => {
    dispatch(actionClearUser())
}

const initialState = { user: null }

export const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USER: {
            newState = { ...state }
            newState.user = action.payload;
            return newState
        }
        case CLEAR_USER: {
            newState = { ...state }
            newState.user = null;
            return newState
        }
        default:
            return state
    }
}

export default sessionReducer;
