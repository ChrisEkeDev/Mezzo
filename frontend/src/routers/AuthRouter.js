import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as View from '../views'

function AuthRouter() {
    const [ route, setRoute ] = useState('/sign-in')

    return (
        <AnimatePresence mode="wait">
            {
                route === '/sign-in' ?
                <View.SignIn key="/sign-in" handleRoute={setRoute}/> :
                <View.SignUp key="/sign-up"  handleRoute={setRoute}/>
            }
        </AnimatePresence>
    )
}

export default AuthRouter
