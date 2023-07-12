import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../nav';
import NewArtist from '../newArtist';
import Aside from '../aside';
import Artists from '../artists';
import MyArtists from '../artists/myArtists'
import Artist from '../artists/artist';
import UpdateWrapper from '../updateArtist';
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
                <Route exact path='/dashboard/my-artists'>
                    <MyArtists/>
                </Route>
                <Route exact path='/dashboard/new-artist'>
                    <NewArtist/>
                </Route>
                <Route exact path='/dashboard/artist/:id/update'>
                    <UpdateWrapper/>
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
