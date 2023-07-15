import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AsideGroupItem from './asideGroupItem';
import Modal from '../modal';
import { thunkGetPlaylists } from '../../store/playlists';
import NewPlaylist from '../newPlaylist';
import { TbPlus, TbPlaylist, TbGridDots  } from 'react-icons/tb';

function AsidePlaylists() {
    const playlistData = useSelector(state => state.playlists.all)
    const playlists = Object.values(playlistData);
    const [ loading, setLoading ] = useState(true)
    const [ newPlaylist, setNewPlaylist ] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();

    const navigate = (route) => {
        history.push(route);
    }

    useEffect(() => {
        dispatch(thunkGetPlaylists())
        .then(() => setLoading(false))
    }, [dispatch])

    if (loading || !playlists) return <div className='aside_group--wrapper'></div>

    return (
        <div className='aside_group--wrapper'>
            {
                newPlaylist ?
                <Modal>
                    <NewPlaylist close={() => setNewPlaylist(false)}/>
                </Modal> :
                null
            }
            <h2 className='aside_group--label'>Playlists</h2>
            <AsideGroupItem
                label='New Playlist'
                icon={<TbPlus className='playlist'/>}
                action={() => setNewPlaylist(true)}
            />
            <AsideGroupItem
                label='All Playlists'
                icon={<TbGridDots className='playlist_item'/>}
                action={() => navigate('/dashboard/playlists')}
            />
            {/* {
                playlists && playlists.map(playlist => {
                    return (
                        <AsideGroupItem
                        label={playlist.name}
                        icon={<TbPlaylist className='playlist_item'/>}
                        action={() => navigate(`/dashboard/playlist/${playlist.id}`)}
                    />
                    )

                })
            } */}
        </div>
    )
}

export default AsidePlaylists
