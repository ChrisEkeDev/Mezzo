import React, { useEffect } from 'react';
import { useMediaContext } from '../../Context/MediaContext';
import './styles.scss';

function Media() {
    const { sourceRef, mediaRef, mediaContext, mediaData, mediaControls } = useMediaContext();

    const handleAudioEnded = () => {
        if (mediaControls.repeat) {
          mediaRef.current.currentTime = 0;
          mediaRef.current.play();
        } else {
            mediaControls.nextTrack()
        }
    };

    const currentSong = mediaData.currentPlaylist[mediaData.currentIndex]

    useEffect(() => {
        if (!mediaContext) return;
        const source = mediaContext.createMediaElementSource(mediaRef.current);
        sourceRef.current = source;
        sourceRef.current.connect(mediaContext.destination);
        return () => sourceRef.current.disconnect();
    }, [mediaContext]);



    return (
        <div className='media_source--wrapper'>
            <audio autoPlay={true} ref={mediaRef} onEnded={handleAudioEnded}>
                <source src={currentSong.file} type="audio/mpeg" />
            </audio>
        </div>
    )
}

export default Media
