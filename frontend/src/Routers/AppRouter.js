import React from 'react'
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../Constants/routes'
import * as View from '../Views'

function AppRouter() {
  return (
    <Switch>
        <Route
            exact
            path={ROUTES.HOME}
            component={View.Home}
        />
        <Route
            path={ROUTES.DASHBOARD}
            component={View.Dashboard}
        />
    </Switch>
  )
}

export default AppRouter
