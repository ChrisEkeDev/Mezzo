import React from 'react'
import Search from '../Search'
import AsideItem from './AsideItem';
import { PiPlaylistFill , PiListPlusBold,PiHeartStraightBold, PiMusicNotesPlusBold, PiMicrophoneStageBold,PiMusicNotesBold,   PiMicrophoneStageFill, PiHeartStraightFill , PiMusicNotesPlusFill, PiMusicNotesFill  } from "react-icons/pi";
import './styles.scss';

function Aside() {
  return (
    <aside className='aside--wrapper'>
            <Search />
            <div className='aside--group'>
                <span className='aside--title sm'>Library</span>
                <ul className='aside--list'>
                    <AsideItem
                        label="Create New Artist"
                        icon={PiMusicNotesPlusBold}
                        // action={}
                    />
                    <AsideItem
                        label="Artists"
                        icon={PiMicrophoneStageBold}
                        // action={}
                    />
                    <AsideItem
                        label="Songs"
                        icon={PiMusicNotesBold}
                        // action={}
                    />
                    <AsideItem
                        label="Favorites"
                        icon={PiHeartStraightBold}
                        // action={}
                    />
                </ul>
            </div>
            <div className='aside--group'>
                <span className='aside--title sm'>Playlists</span>
                <ul className='aside--list'>
                    <AsideItem
                        label="New Playlist"
                        icon={PiListPlusBold}
                        // action={}
                    />
                    <AsideItem
                        label="All Playlists"
                        icon={PiPlaylistFill}
                        // action={}
                    />
                </ul>
            </div>
            <div className='aside--group'>
                <span className='aside--title sm'>Your Music</span>
                <ul className='aside--list'>
                <AsideItem
                        label="My Artists"
                        icon={PiMicrophoneStageFill}
                        // action={}
                    />
                    <AsideItem
                        label="My Songs"
                        icon={PiMusicNotesFill}
                        // action={}
                    />
                </ul>
            </div>
        </aside>
  )
}

export default Aside
