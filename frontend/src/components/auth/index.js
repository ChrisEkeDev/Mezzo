import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'

function Auth() {
  return (
    <main id='auth--wrapper'>
        <Switch>
            <Route exact path='/auth/sign-in'>
                <SignIn />
            </Route>
            <Route exact path='/auth/sign-up'>
                <SignUp />
            </Route>
        </Switch>
        <section className='auth--image'>

        </section>
    </main>
  )
}

export default Auth
