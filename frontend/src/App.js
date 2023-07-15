import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom'
import Landing from './components/landing';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import { thunkRestoreUser } from './store/session';
import { thunkGetPlaylists } from './store/playlists';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const history = useHistory();

  const navigate = (route) => {
    history.push(route)
  }

  useEffect(() => {
    dispatch(thunkRestoreUser())
    .then(() => dispatch(thunkGetPlaylists()))
  }, [dispatch])

  if (user) navigate('/dashboard/recently-added')

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
          <Dashboard/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
