import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../nav';
import NewArtist from '../newArtist';
import NewSong from '../newSong';
import Aside from '../Aside';
import Favorites from '../favorites';
import Artists from '../artists';
import Playlists from '../playlists';
import Playlist from '../playlists/playlist';
import MyArtists from '../artists/myArtists'
import MySongs from '../songs/mySongs';
import Artist from '../artists/artist';
import Songs from '../songs';
import { thunkGetGenres } from '../../store/songs';
import UpdateArtistWrapper from '../updateArtist';
import UpdateSongWrapper from '../updateSong';
import './dashboard.css'

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }

    if (!user) navigate('/')

    useEffect(() => {
        dispatch(thunkGetGenres())
    }, [dispatch])

    return (
        <main id='dashboard--wrapper'>
            {/* <Aside/> */}
            <section className='dashboard--main'>
            <Nav/>
            <Switch>
                <Route exact path='/dashboard/artists'>
                    <Artists/>
                </Route>
                <Route exact path='/dashboard/songs'>
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
                </Route>
            </Switch>
            </section>
        </main>
    )
}

export default Dashboard
