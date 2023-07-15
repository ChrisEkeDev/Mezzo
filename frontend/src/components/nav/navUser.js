import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkSignOut } from '../../store/session';
import { useLoading } from '../../context/loading';
import { TbUserCircle, TbLogout, TbX } from 'react-icons/tb'
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
        navigate('/')
        dispatch(thunkSignOut())
        .then(() => {
            setLoading(false);
        })
    }

    return (
        <div className='nav_user--wrapper'>
            <span onClick={() => setIsVisible(true)} className='nav_user--icon'><TbUserCircle/></span>
            {
                isVisible ?
                <div ref={ref} className='hover_menu--wrapper'>
                    <span onClick={signOut} className='hover_menu--option'>
                        <span className='hover_menu--label'>Sign Out</span>
                        <span className='hover_menu--icon'><TbLogout/></span>
                    </span>
                    <span onClick={() => setIsVisible(false)} className='hover_menu--option'>
                        <span className='hover_menu--label'>Close</span>
                        <span className='hover_menu--icon'><TbX/></span>
                    </span>
                </div> :
                null
            }
        </div>
    )
}

export default NavUser
