import React from 'react';
import { useHistory } from 'react-router-dom';
import placeholder from '../../assets/mezzo-placeholder.svg';
import { useSelector } from 'react-redux';
import { useNowPlaying } from '../../context/nowPlaying';
import IconButton from '../button/iconButton';
import { TbPlayerPlayFilled, TbHeartFilled } from 'react-icons/tb';

function ArtistItem({artist}) {
  const favoritesData = useSelector(state => state.favorites.artists);
  const favorites = Object.values(favoritesData)
  const history = useHistory();
  const { handlePlaySongs } = useNowPlaying();
  const isFavorited = favorites.some(favorite => favorite.artistId === artist.id);

  const navigate = (route) => {
    history.push(route);
  }

  const handlePlay = (e) => {
    e.stopPropagation();
    if (artist.Songs.length) {
      handlePlaySongs(artist.Songs)
    }
  }


  return (
      <article onClick={() => navigate(`/dashboard/artists/${artist?.id}`)} className='artist_item--wrapper'>
        {/* <div className='artist_item--image' style={{backgroundImage: `url(${artist?.image})`}}>
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
        </span> */}
      </article>
  )
}

export default ArtistItem
