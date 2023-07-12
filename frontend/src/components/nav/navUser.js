import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkSignOut } from '../../store/session';
import { useLoading } from '../../context/loading';
import { TbUserCircle, TbLogout } from 'react-icons/tb'
import useOutsideClick from '../../hooks/useOutsideClick';

function NavUser() {
    const { ref, isVisible, setIsVisible } = useOutsideClick();
    const { setLoading } = useLoading();
    const history = useHistory();
    const dispatch = useDispatch()

    const navigate = (route) => {
        history.push(route);
    }

    const signOut = () => {
        setLoading(true);
        dispatch(thunkSignOut())
        .then(() => {
            navigate('/')
            setLoading(false);
        })
    }

    return (
        <div className='nav_user--wrapper'>
            <span onClick={() => setIsVisible(true)} className='nav_user--icon'><TbUserCircle/></span>
            {
                isVisible ?
                <div ref={ref} className='nav_user_menu--wrapper'>
                    <span onClick={signOut} className='nav_user_menu--option'>
                        <span className='nav_user_menu--icon'><TbLogout/></span>
                        <span className='nav_user_menu--label'>Sign Out</span>
                    </span>
                </div> :
                null
            }
        </div>
    )
}

export default NavUser
