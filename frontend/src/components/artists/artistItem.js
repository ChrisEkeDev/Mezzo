import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import placeholder from '../../assets/mezzo-placeholder.svg';
import { useSelector } from 'react-redux';
import IconButton from '../button/iconButton';
import { TbPlayerPlayFilled } from 'react-icons/tb';

function ArtistItem({artist}) {
  const history = useHistory();

  const navigate = (route) => {
    history.push(route);
  }

  const handlePlay = (e) => {
    e.stopPropagation();
    alert('Feature coming soon.')
  }


  return (
      <article onClick={() => navigate(`/dashboard/artist/${artist?.id}`)} className='artist_item--wrapper'>
        <div className='artist_item--image' style={{backgroundImage: `url(${artist?.image})`}}>
          {artist?.image ? null : <img src={placeholder}/> }
          <div className='artist_item--overlay'>
            <span className='artist_item--play'>
              <IconButton
                style='primary'
                icon={<TbPlayerPlayFilled/>}
                action={(e) => handlePlay(e)}
              />
            </span>
          </div>
        </div>
        <h3 className='artist_item--name'>{artist?.name}</h3>
      </article>
  )
}

export default ArtistItem
