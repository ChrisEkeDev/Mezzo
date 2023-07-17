import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import placeholder from '../../assets/mezzo-placeholder.svg';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSetNowPlaying } from '../../store/songs'
import IconButton from '../button/iconButton';
import { TbPlayerPlayFilled, TbHeartFilled } from 'react-icons/tb';

function ArtistItem({artist}) {
  const favoritesData = useSelector(state => state.favorites.artists);
  const favorites = Object.values(favoritesData)
  const history = useHistory();
  const dispatch = useDispatch();

  const isFavorited = favorites.some(favorite => favorite.artistId === artist.id);

  const navigate = (route) => {
    history.push(route);
  }

  const handlePlay = (e) => {
    e.stopPropagation();
    dispatch(thunkSetNowPlaying(artist.Songs))
  }


  return (
      <article onClick={() => navigate(`/dashboard/artists/${artist?.id}`)} className='artist_item--wrapper'>
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
        <span className='artist_item--name_span'>
          <h3 className='artist_item--name'>{artist?.name}</h3>
          { isFavorited ? <span className='artist_item--favorite'><TbHeartFilled/></span> : null }
        </span>
      </article>
  )
}

export default ArtistItem
