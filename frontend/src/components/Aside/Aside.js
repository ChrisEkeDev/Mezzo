import React from 'react'
import AsideItem from './AsideItem';
import { asideHrefs, asidePlaylistsHrefs, asideUserHrefs } from '../../Constants/hrefs';
import './styles.scss';

function Aside() {
  return (
    <aside className='aside--wrapper'>
            <div className='aside--group'>
                <span className='aside--title sm'>Library</span>
                <ul className='aside--list'>
                    {
                        asideHrefs.map(href => (
                            <AsideItem key={href.path} href={href}/>
                        ))
                    }
                </ul>
            </div>
            <div className='aside--group'>
                <span className='aside--title sm'>Playlists</span>
                <ul className='aside--list'>
                    {
                        asidePlaylistsHrefs.map(href => (
                            <AsideItem key={href.path} href={href}/>
                        ))
                    }
                </ul>
            </div>
            <div className='aside--group'>
                <span className='aside--title sm'>Your Music</span>
                <ul className='aside--list'>
                    {
                        asideUserHrefs.map(href => (
                            <AsideItem key={href.path} href={href}/>
                        ))
                    }
                </ul>
            </div>
        </aside>
  )
}

export default Aside
