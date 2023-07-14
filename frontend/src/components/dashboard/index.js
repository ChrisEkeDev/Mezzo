import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../nav';
import NewArtist from '../newArtist';
import NewSong from '../newSong';
import Aside from '../aside';
import Artists from '../artists';
import MyArtists from '../artists/myArtists'
import MySongs from '../songs/mySongs';
import Artist from '../artists/artist';
import Songs from '../songs';
import UpdateArtistWrapper from '../updateArtist';
import UpdateSongWrapper from '../updateSong';
import './dashboard.css'

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }

    if (!user) navigate('/')

    return (
        <main id='dashboard--wrapper'>
            <Aside/>
            <section className='dashboard--main'>
            <Nav/>
            <Switch>
                <Route exact path='/dashboard/artists'>
                    <Artists/>
                </Route>
                <Route exact path='/dashboard/songs'>
                    <Songs/>
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
                <Route exact path='/dashboard/artist/:artistId/songs/:songId/update'>
                    <UpdateSongWrapper/>
                </Route>
                <Route exact path='/dashboard/artist/:id/new-song'>
                    <NewSong/>
                </Route>
                <Route exact path='/dashboard/artist/:id/update'>
                    <UpdateArtistWrapper/>
                </Route>
                <Route exact path='/dashboard/artist/:id'>
                    <Artist/>
                </Route>
            </Switch>
            </section>
        </main>
    )
}

export default Dashboard
