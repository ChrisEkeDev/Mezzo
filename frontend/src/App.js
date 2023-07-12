import { Switch, Route } from 'react-router-dom'
import Landing from './components/landing';
import Auth from './components/auth';
import Dashboard from './components/dashboard';

function App() {
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
