import React from 'react';
import Aside from '../../components/Aside/Aside';
import MediaPlayer from '../../components/MediaPlayer';
import Menu from '../../components/Menu';
import './styles.scss'

function Dashboard() {
  return (
    <div className='dashboard--wrapper'>
        <Aside/>
        <div className='dashboard--main'>
            <nav className='navigation--wrapper'>
                <MediaPlayer />
                <Menu />
            </nav>
            <main className='main--wrapper'>

            </main>
            <footer className='footer--wrapper'>

            </footer>
        </div>
    </div>
  )
}

export default Dashboard
