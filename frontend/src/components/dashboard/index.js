import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSignOut } from '../../store/session';
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch()

    const navigate = (route) => {
        history.push(route);
    }

    const signOut = () => {
        dispatch(thunkSignOut())
        .then(() => {
            navigate('/')
        })
    }

    if (!user) navigate('/')

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{user?.username} | {user?.email}</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default Dashboard
