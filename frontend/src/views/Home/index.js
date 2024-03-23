import React from 'react'
import Header from '../../components/Header'
import HomeMediaPlayer from '../../components/HomeMediaPlayer';
import AuthRouter from '../../routers/AuthRouter';
import './styles.scss';

function Home() {
  return (
    <div className='home--wrapper'>
        <Header/>
        <main className='home--container'>
            <AuthRouter/>
        </main>
        <HomeMediaPlayer/>
    </div>
  )
}

export default Home
