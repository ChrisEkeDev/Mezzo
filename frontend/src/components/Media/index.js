import React, { useEffect } from 'react';
import { useMediaContext } from '../../Context/MediaContext';
import './styles.scss';

function Media() {
    const { mediaContext, mediaData } = useMediaContext();
    const { song, sourceRef, mediaRef, onEnded, onLoadedMetadata } = mediaData;


    useEffect(() => {
        if (!mediaContext) return;
        const source = mediaContext.createMediaElementSource(mediaRef.current);
        sourceRef.current = source;
        sourceRef.current.connect(mediaContext.destination);
        return () => sourceRef.current.disconnect();
    }, [mediaContext]);


    return (
        <div className='media_source--wrapper'>
            <audio
                ref={mediaRef}
                onEnded={onEnded}
                onLoadedMetadata={onLoadedMetadata}
            >
                <source src={song && song.file} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default Media
