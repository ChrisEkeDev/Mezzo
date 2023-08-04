import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNowPlaying } from '../../context/nowPlaying';
import { thunkGetFavoriteArtists, thunkGetFavoriteSongs } from '../../store/favorites'
import mezzo from '../../assets/mezzo-color.svg';
import Button from '../button'
import AsideGroupItem from './asideGroupItem';
import { TbPlus, TbMicrophone2, TbMusic, TbHeart, TbX } from 'react-icons/tb';
import './aside.css'
import AsidePlaylists from './asidePlaylists';


function Aside() {
    const [ loading, setLoading ] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const { aside, setAside } = useNowPlaying();

    const navigate = (route) => {
        history.push(route);
    }

    const handleAsideNavigation = (route) => {
        navigate(route)
        setAside(false)
    }

    useEffect(() => {
         dispatch(thunkGetFavoriteArtists())
        .then(() => dispatch(thunkGetFavoriteSongs()))
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading) return <div id="aside--wrapper"></div>

    return (
        <div id="aside--wrapper" className={`${aside ? 'aside--open' : 'aside--closed'}`}>
            <div className='aside_logo--wrapper'>
                <img src={mezzo} />
                <span onClick={() => setAside(false)} className='aside--aside_btn'>
                    <TbX/>
                </span>
            </div>
            <Button
                label='New Artist'
                style='new-artist'
                left={<TbPlus/>}
                action={() => handleAsideNavigation('/dashboard/new-artist')}
            />
            <div className='aside_group--wrapper'>
                <h2 className='aside_group--label'>Browse</h2>
                <AsideGroupItem
                    label='Artists'
                    icon={<TbMicrophone2/>}
                    action={() => handleAsideNavigation('/dashboard/artists')}
                    path='artists'
                />
                <AsideGroupItem
                    label='Songs'
                    icon={<TbMusic/>}
                    action={() => handleAsideNavigation('/dashboard/songs')}
                    path='songs'

                />
            </div>
            <AsidePlaylists/>
            <div className='aside_group--wrapper'>
                <h2 className='aside_group--label'>My Music</h2>
                <AsideGroupItem
                    label='My Artists'
                    icon={<TbMicrophone2/>}
                    action={() => handleAsideNavigation('/dashboard/my-artists')}
                    path='my-artists'
                />
                <AsideGroupItem
                    label='My Songs'
                    icon={<TbMusic/>}
                    action={() => handleAsideNavigation('/dashboard/my-songs')}
                    path='my-songs'
                />
                <AsideGroupItem
                    label='Favorites'
                    icon={<TbHeart/>}
                    action={() => handleAsideNavigation('/dashboard/favorites')}
                    path='favorites'
                />
            </div>
        </div>
    )
}

export default Aside
