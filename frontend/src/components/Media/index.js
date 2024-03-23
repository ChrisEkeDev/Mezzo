import React, { useEffect } from 'react';
import { useMediaContext } from '../../context/MediaContext';
import './styles.scss';

function Media() {
    const { sourceRef, mediaRef, media, mediaContext } = useMediaContext();

    useEffect(() => {
        if (!mediaContext) return;
        const source = mediaContext.createMediaElementSource(mediaRef.current);
        sourceRef.current = source;
        sourceRef.current.connect(mediaContext.destination);
        return () => sourceRef.current.disconnect();
    }, [mediaContext]);

    return (
        <div className='media_source--wrapper'>
            <audio autoPlay={true} ref={mediaRef} controls>
                <source src={media} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default Media
