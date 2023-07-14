import React from 'react'
import { useHistory } from 'react-router-dom';
import mezzo from '../../assets/mezzo-color.svg';
import Button from '../button'
import AsideGroupItem from './asideGroupItem';
import { TbPlus, TbMicrophone2, TbMusic, TbHeart, TbPlaylist, TbClockHour4, TbGridDots  } from 'react-icons/tb';
import './aside.css'

function Aside() {
    const history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }

    return (
        <div id="aside--wrapper">
            <div className='aside_logo--wrapper'>
                <img src={mezzo} />
                <span>Mezzo</span>
            </div>
            <Button
                label='New Artist'
                style='new-artist'
                left={<TbPlus/>}
                action={() => navigate('/dashboard/new-artist')}
            />
            <div className='aside_group--wrapper'>
                <h2 className='aside_group--label'>Browse</h2>
                <AsideGroupItem
                    label='Recenlty Added'
                    icon={<TbClockHour4/>}
                    action={() => alert('Feature coming soon.')}
                />
                <AsideGroupItem
                    label='Artists'
                    icon={<TbMicrophone2/>}
                    action={() => navigate('/dashboard/artists')}
                />
                <AsideGroupItem
                    label='Songs'
                    icon={<TbMusic/>}
                    action={() => navigate('/dashboard/songs')}
                />
            </div>
            <div className='aside_group--wrapper'>
                <h2 className='aside_group--label'>Playlists</h2>
                <AsideGroupItem
                    label='All Playlists'
                    icon={<TbGridDots className='playlist'/>}
                    action={() => alert('Feature coming soon.')}
                />
            </div>
            <div className='aside_group--wrapper'>
                <h2 className='aside_group--label'>My Music</h2>
                <AsideGroupItem
                    label='My Artists'
                    icon={<TbMicrophone2/>}
                    action={() => navigate('/dashboard/my-artists')}
                />
                <AsideGroupItem
                    label='My Songs'
                    icon={<TbMusic/>}
                    action={() => navigate('/dashboard/my-songs')}
                />
                <AsideGroupItem
                    label='Favorites'
                    icon={<TbHeart/>}
                    action={() => alert('Feature coming soon.')}
                />
            </div>
        </div>
    )
}

export default Aside
