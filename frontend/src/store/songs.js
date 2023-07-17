import { csrfFetch } from "./csrf";
import Cookies from 'js-cookie';

// TYPES
const GET_ALL_SONGS = '/mezzo/songs/GET_ALL_SONGS'
const GET_USER_SONGS = '/mezzo/songs/GET_USER_SONGS'
const GET_SONG = '/mezzo/songs/GET_SONG'
const CREATE_SONG = '/mezzo/songs/CREATE_SONG'
const UPDATE_SONG = '/mezzo/songs/UPDATE_SONG'
const DELETE_SONG = '/mezzo/songs/DELETE_SONG'
const SET_NOW_PLAYING = '/mezzo/songs/SET_NOW_PLAYING'

// ACTIONS
const actionGetAllSongs = (songs) => ({
    type: GET_ALL_SONGS,
    payload: songs
})

const actionGetUserSongs = (songs) => ({
    type: GET_USER_SONGS,
    payload: songs
})

const actionGetSong = (song) => ({
    type: GET_SONG,
    payload: song
})

const actionCreateSong = (song) => ({
    type: CREATE_SONG,
    payload: song
})

const actionUpdateSong = (song) => ({
    type: UPDATE_SONG,
    payload: song
})

const actionDeleteSong = (song) => ({
    type: DELETE_SONG,
    payload: song
})

const actionSetNowPlaying = (songs) => ({
    type: SET_NOW_PLAYING,
    payload: songs
})

// THUNKS
export const thunkGetAllSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songs`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllSongs(data.Songs))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetUserSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songs/current`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetUserSongs(data.Songs))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetSong = (id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetSong(data.Song))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkCreateSong = (songData) => async dispatch => {
    const res = await fetch(`/api/songs`, {
        method: 'POST',
        headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
        body: songData
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateSong(data.Song))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkUpdateSong = (id, songData) => async dispatch => {
    const res = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
        body: songData
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateSong(data.Song))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkDeleteSong = (song) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteSong(song))
        return message
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkSetNowPlaying = (songs) => async dispatch => {
    dispatch(actionSetNowPlaying(songs))
}

// REDUCER
const initialState = { all: {}, user: {}, current: {}, nowPlaying: {} }

const songsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SONGS: {
            const newState = { ...state, all: {} };
            action.payload.forEach(song => newState.all[song.id] = song);
            return newState;
        }
        case GET_USER_SONGS: {
            const newState = { ...state, user: {} };
            action.payload.forEach(song => newState.user[song.id] = song);
            return newState;
        }
        case GET_SONG: {
            const newState = { ...state, current: {} };
            newState.current = action.payload
            return newState;
        }
        case UPDATE_SONG: {
            const newState = { ...state };
            newState.current = action.payload
            newState.all = { ...newState.all, [action.payload.id]: action.payload }
            return newState;
        }
        case SET_NOW_PLAYING: {
            const newState = { ...state, nowPlaying: {}}
            action.payload.forEach(song => newState.nowPlaying[song.id] = song);
            return newState;
        }
        case CREATE_SONG: {
            const newState = { ...state };
            newState.all = { ...newState.all, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_SONG: {
            const newState = { ...state }
            delete newState.all[action.payload.id]
            return newState;
        }
        default:
            return state;
    }
}

export default songsReducer;
