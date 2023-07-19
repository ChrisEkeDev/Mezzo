import { csrfFetch } from "./csrf";
import Cookies from 'js-cookie';

function isJSON(res) {
  try {
    JSON.parse(res);
    return true;
  } catch (err) {
    return false;
  }
}

// TYPES
const GET_ALL_ARTISTS = '/mezzo/artists/GET_ALL_ARTISTS'
const GET_USER_ARTISTS = '/mezzo/artists/GET_USER_ARTISTS'
const GET_ARTIST = '/mezzo/artists/GET_ARTIST'
const CREATE_ARTIST = '/mezzo/artists/CREATE_ARTIST'
const UPDATE_ARTIST = '/mezzo/artists/UPDATE_ARTIST'
const DELETE_ARTIST = '/mezzo/artists/DELETE_ARTIST'

// ACTIONS
const actionGetAllArtists = (artists) => ({
    type: GET_ALL_ARTISTS,
    payload: artists
})

const actionGetUserArtists = (artists) => ({
    type: GET_USER_ARTISTS,
    payload: artists
})

const actionGetArtist = (artist) => ({
    type: GET_ARTIST,
    payload: artist
})

const actionCreateArtist = (artist) => ({
    type: CREATE_ARTIST,
    payload: artist
})

const actionUpdateArtist = (artist) => ({
    type: UPDATE_ARTIST,
    payload: artist
})

const actionDeleteArtist = (artist) => ({
    type: DELETE_ARTIST,
    payload: artist
})


// THUNKS
export const thunkGetAllArtists = () => async dispatch => {
    const res = await csrfFetch(`/api/artists`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllArtists(data.Artists))
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

export const thunkGetUserArtists = () => async dispatch => {
    const res = await csrfFetch(`/api/artists/current`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetUserArtists(data.Artists))
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

export const thunkGetArtist = (id) => async dispatch => {
    const res = await csrfFetch(`/api/artists/${id}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetArtist(data.Artist))
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

export const thunkCreateArtist = (artistData) => async dispatch => {
    const res = await fetch(`/api/artists`, {
        method: 'POST',
        headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
        body: artistData
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateArtist(data.Artist))
        return data
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

export const thunkUpdateArtist = (id, artistData) => async dispatch => {
    const res = await fetch(`/api/artists/${id}`, {
        method: 'PUT',
        headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
        body: artistData
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateArtist(data.Artist))
        return data
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

export const thunkDeleteArtist = (artist) => async dispatch => {
    const res = await csrfFetch(`/api/artists/${artist.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteArtist(artist))
        return message
    } else {
        let errors;
        if (isJSON(res)) {
            errors = await res.json()
            return errors;
        } else {
            console.log(res)
        }
    }
}

// REDUCER
const initialState = { all: {}, current: {}, user: {} }

const artistsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_ARTISTS: {
            const newState = { ...state, all: {} };
            action.payload.forEach(artist => newState.all[artist.id] = artist);
            return newState;
        }
        case GET_USER_ARTISTS: {
            const newState = { ...state, user: {} };
            action.payload.forEach(artist => newState.user[artist.id] = artist);
            return newState;
        }
        case GET_ARTIST: {
            const newState = { ...state };
            newState.current = action.payload
            return newState;
        }
        case UPDATE_ARTIST: {
            const newState = { ...state };
            newState.current = action.payload
            return newState;
        }
        case CREATE_ARTIST: {
            const newState = { ...state }
            newState.all = { ...newState.all, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_ARTIST: {
            const newState = { ...state }
            delete newState.all[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default artistsReducer
