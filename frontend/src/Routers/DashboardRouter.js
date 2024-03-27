import React from 'react';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route, useLocation } from 'react-router-dom';
import * as ROUTES from '../Constants/routes'
import * as View from '../Views'

function DashboardRouter() {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Switch location={location} key={location.pathname}>
                <Route
                    exact
                    path={ROUTES.NOW_PLAYING}
                    component={View.NowPlaying}
                />
                <Route
                    exact
                    path={ROUTES.ARTISTS}
                    component={View.Artists}
                />
                <Route
                    exact
                    path={ROUTES.ARTIST_PAGE}
                    component={View.ArtistPage}
                />
                <Route
                    exact
                    path={ROUTES.SONGS}
                    component={View.Songs}
                />
                <Route
                    exact
                    path={ROUTES.FAVORITES}
                    component={View.Favorites}
                />
                <Route
                    exact
                    path={ROUTES.ALL_PLAYLISTS}
                    component={View.Playlists}
                />
                <Route
                    exact
                    path={ROUTES.PLAYLIST_PAGE}
                    component={View.PlaylistPage}
                />
                <Route
                    exact
                    path={ROUTES.PLAYLIST_PAGE}
                    component={View.PlaylistPage}
                />
                <Route
                    exact
                    path={ROUTES.NEW_PLAYLIST}
                    component={View.NewPlaylist}
                />
                <Route
                    exact
                    path={ROUTES.NEW_PLAYLIST}
                    component={View.NewPlaylist}
                />
                <Route
                    exact
                    path={ROUTES.CREATE_NEW}
                    component={View.CreateNew}
                />
                <Route
                    exact
                    path={ROUTES.NEW_ARTIST}
                    component={View.CreateArtist}
                />
                <Route
                    exact
                    path={ROUTES.NEW_SONG}
                    component={View.CreateSong}
                />
                {/*  <Route exact path='/dashboard/new-artist'>
                    <NewArtist/>
                </Route>
                <Route exact path='/dashboard/artists/:artistId/songs/:songId/update'>
                    <UpdateSongWrapper/>
                </Route>
                <Route exact path='/dashboard/artists/:id/new-song'>
                    <NewSong/>
                </Route>
                <Route exact path='/dashboard/artists/:id/update'>
                    <UpdateArtistWrapper/>
                </Route>
                <Route exact path='/dashboard/artists/:id'>
                    <Artist/>
                </Route> */}
            </Switch>
        </AnimatePresence>
    )
}

export default DashboardRouter
