import React from 'react'
import Header from '../../components/Header'
import HomeMediaPlayer from '../../components/HomeMediaPlayer';
import MediaVisualizer from '../../components/MediaVisualizer'
import AuthRouter from '../../routers/AuthRouter';
import './styles.scss';

function Home() {
  return (
    <div className='wrapper home--wrapper'>
        <Header/>
        <main className='home--container'>
            <AuthRouter/>
        </main>
        <HomeMediaPlayer/>
        <MediaVisualizer full={true} />
    </div>
  )
}

export default Home
