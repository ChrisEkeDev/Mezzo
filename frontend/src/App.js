import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom'
import Landing from './components/landing';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import { thunkRestoreUser } from './store/session';
import NowPlayingProvider from './context/nowPlaying';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const history = useHistory();

  const navigate = (route) => {
    history.push(route)
  }

  useEffect(() => {
    dispatch(thunkRestoreUser())
  }, [dispatch])

  if (user) navigate('/dashboard/artists')

  return (
    <div id="app--wrapper">
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/auth">
          <Auth/>
        </Route>
        <Route path="/dashboard">
          <NowPlayingProvider>
            <Dashboard/>
          </NowPlayingProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
