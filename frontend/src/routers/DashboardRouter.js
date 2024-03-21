import React from 'react'
import { Switch, Route } from 'react-router-dom';

function DashboardRouter() {
  return (

    <Switch>
        <Route exact path='/dashboard/artists'>
            <Artists/>
        </Route>
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
  )
}

export default DashboardRouter
