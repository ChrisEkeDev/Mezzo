import React from 'react';
import { AnimatePresence } from 'framer-motion'
import { Switch, Route, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import * as View from '../views'

function DashboardRouter() {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Switch location={location} key={location.pathname}>
                <Route
                    exact
                    path={ROUTES.WELCOME}
                    component={View.Welcome}
                />
                <Route
                    exact
                    path={ROUTES.ARTISTS}
                    component={View.Artists}
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
                {/* <Route exact path='/dashboard/songs'>
                    <Songs/>
                </Route>
                <Route exact path='/dashboard/playlists'>
                    <Playlists/>
                </Route>
                <Route exact path='/dashboard/playlists/:id'>
                    <Playlist/>
                </Route>
                <Route exact path='/dashboard/my-artists'>
                    <MyArtists/>
                </Route>
                <Route exact path='/dashboard/my-songs'>
                    <MySongs/>
                </Route>
                <Route exact path='/dashboard/new-artist'>
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
                </Route>
                <Route exact path='/dashboard/favorites'>
                    <Favorites/>
                </Route> */}
            </Switch>
        </AnimatePresence>
    )
}

export default DashboardRouter
