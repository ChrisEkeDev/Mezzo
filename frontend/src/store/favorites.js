import { csrfFetch } from "./csrf";

// TYPES
const GET_FAVORITE_ARTISTS = '/mezzo/favorites/GET_FAVORITE_ARTISTS'
const GET_FAVORITE_SONGS = '/mezzo/favorites/GET_FAVORITE_SONGS'
const ADD_ARTIST_TO_FAVORITES = '/mezzo/favorites/ADD_ARTIST_TO_FAVORITES'
const ADD_SONG_TO_FAVORITES = '/mezzo/favorites/ADD_SONG_TO_FAVORITES'
const REMOVE_ARTIST_FROM_FAVORITES = '/mezzo/favorites/REMOVE_ARTIST_FROM_FAVORITES'
const REMOVE_SONG_FROM_FAVORITES = '/mezzo/favorites/REMOVE_SONG_FROM_FAVORITES'

// ACTIONS
const actionGetFavoriteArtists = (artists) => ({
    type: GET_FAVORITE_ARTISTS,
    payload: artists
})

const actionGetFavoriteSongs = (songs) => ({
    type: GET_FAVORITE_SONGS,
    payload: songs
})

const actionAddArtistToFavorites = (artists) => ({
    type: ADD_ARTIST_TO_FAVORITES,
    payload: artists
})

const actionAddSongToFavorites = (songs) => ({
    type: ADD_SONG_TO_FAVORITES,
    payload: songs
})

const actionRemoveArtistFromFavorites = (artists) => ({
    type: REMOVE_ARTIST_FROM_FAVORITES,
    payload: artists
})

const actionRemoveSongFromFavorites = (songs) => ({
    type: REMOVE_SONG_FROM_FAVORITES,
    payload: songs
})

// THUNKS
export const thunkGetFavoriteArtists = async dispatch => {
    const res = await csrfFetch(`/api/favorites/artists`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetFavoriteArtists(data.FavoriteArtists))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetFavoriteSongs = async dispatch => {
    const res = await csrfFetch(`/api/favorites/songs`)
    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetFavoriteSongs(data.FavoriteSongs))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkAddArtistToFavorites = (artistId) = async dispatch => {
    const res = await csrfFetch(`/api/favorites/artists`, {
        method: 'POST',
        body: JSON.stringify(artistId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionAddArtistToFavorites(data.FavoriteArtists))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkAddSongToFavorites = (songId) = async dispatch => {
    const res = await csrfFetch(`/api/favorites/songs`, {
        method: 'POST',
        body: JSON.stringify(songId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionAddSongToFavorites(data.FavoriteSongs))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkRemoveArtistFromFavorites = (artistId) => async dispatch => {
    const res = await csrfFetch(`/api/favorites/artists`, {
        method: 'DELETE',
        body: JSON.stringify(artistId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionRemoveArtistFromFavorites(data.FavoriteArtists))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkRemoveSongFromFavorites = (songId) => async dispatch => {
    const res = await csrfFetch(`/api/favorites/songs`, {
        method: 'DELETE',
        body: JSON.stringify(songId)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(actionRemoveSongFromFavorites(data.FavoriteSongs))
    } else {
        const errors = await res.json();
        return errors
    }
}


// REDUCER
const initialState = { artists: {}, songs: {} }

const favoritesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_FAVORITE_ARTISTS:
        case ADD_ARTIST_TO_FAVORITES:
        case REMOVE_ARTIST_FROM_FAVORITES: {
            const newState = { ...state, artists: {}}
            action.payload.forEach(artist => newState.artists[artist.id] = artist)
            return newState
        }
        case GET_FAVORITE_SONGS:
        case ADD_SONG_TO_FAVORITES:
        case REMOVE_SONG_FROM_FAVORITES: {
            const newState = { ...state, songs: {}}
            action.payload.forEach(song => newState.songs[song.id] = song)
            return newState
        }
        default:
            return state
    }
}

export default favoritesReducer
