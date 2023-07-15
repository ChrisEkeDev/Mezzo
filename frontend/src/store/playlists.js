import { csrfFetch } from "./csrf";

// TYPES
const GET_PLAYLISTS = '/mezzo/playlists/GET_PLAYLISTS';
const GET_PLAYLIST = '/mezzo/playlists/GET_PLAYLIST';
const CREATE_PLAYLIST = '/mezzo/playlists/CREATE_PLAYLIST';
const ADD_TO_PLAYLIST = '/mezzo/playlists/ADD_TO_PLAYLIST';
const REMOVE_FROM_PLAYLIST = '/mezzo/playlists/REMOVE_FROM_PLAYLIST';
const UPDATE_PLAYLIST = '/mezzo/playlists/UPDATE_PLAYLIST'
const DELETE_PLAYLIST = '/mezzo/playlists/DELETE_PLAYLIST';

// ACTIONS
const actionGetPlaylists = (playlists) => ({
    type: GET_PLAYLISTS,
    payload: playlists
})

const actionGetPlaylist = (playlist) => ({
    type: GET_PLAYLIST,
    payload: playlist
})

const actionCreatePlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    payload: playlist
})

const actionAddToPlaylist = (playlist) => ({
    type: ADD_TO_PLAYLIST,
    payload: playlist
})

const actionRemoveFromPlaylist = (playlist) => ({
    type: REMOVE_FROM_PLAYLIST,
    payload: playlist
})

const actionUpdatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    payload: playlist
})

const actionDeletePlaylist = (playlist) => ({
    type: DELETE_PLAYLIST,
    payload: playlist
})

// THUNKS
export const thunkGetPlaylists = () => async dispatch => {
    const res = await csrfFetch(`/api/playlists`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetPlaylists(data.Playlists))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetPlaylist = (id) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetPlaylist(data.Playlist))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkCreatePlaylist = (playlistData) => async dispatch => {
    const res = await csrfFetch(`/api/playlists`, {
        method: 'POST',
        body: JSON.stringify(playlistData)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreatePlaylist(data.Playlist))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkAddToPlaylist = (songId, playlistId) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'POST',
        body: JSON.stringify(songId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionAddToPlaylist(data.Playlist))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkRemoveFromPlaylist = (songId, playlistId) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
        body: JSON.stringify(songId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionRemoveFromPlaylist(data.Playlist))
        return data
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkUpdatePlaylist = (playlistData) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${playlistData.id}`, {
        method: 'PUT',
        body: JSON.stringify(playlistData)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdatePlaylist(data.Playlist))
        return data
    } else {
        const errors = await res.json();
        return errors;
    }
}


export const thunkDeletePlaylist = (playlist) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${playlist.id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeletePlaylist(playlist))
        return message
    } else {
        const errors = await res.json();
        return errors;
    }
}



// REDUCER

const initialState = { all: {}, current: {} }

const playlistsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYLISTS: {
            const newState = { ...state, all: {} };
            action.payload.forEach(playlist => newState.all[playlist.id] = playlist);
            return newState;
        }
        case GET_PLAYLIST:
        case UPDATE_PLAYLIST: {
            const newState = { ...state };
            newState.current = action.payload;
            return newState;
        }
        case CREATE_PLAYLIST: {
            const newState = { ...state };
            newState.all = { ...newState.all, [action.payload.id]: action.payload }
            return newState
        }
        case ADD_TO_PLAYLIST:
        case REMOVE_FROM_PLAYLIST: {
            const newState = { ...state };
            newState.current = action.payload;
            newState.all = { ...newState.all, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_PLAYLIST: {
            const newState = { ...state };
            newState.current = {};
            delete newState.all[action.payload.id]
            return newState
        }
        default:
            return state;
    }
}


export default playlistsReducer
