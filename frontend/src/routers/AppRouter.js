import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import * as View from '../views'

function AppRouter() {
  return (
    <Switch>
        <Route
            exact
            path={ROUTES.HOME}
            component={View.Home}
        />
        <Route
            exact
            path={ROUTES.DASHBOARD}
            component={View.Dashboard}
        />
    </Switch>
  )
}

export default AppRouter
