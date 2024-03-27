import React from 'react'
import Header from '../../components/Header'
import AuthRouter from '../../Routers/AuthRouter';
import './styles.scss';

function Home() {
  return (
    <div className='wrapper home--wrapper'>
        <Header/>
        <main className='home--container'>
            <AuthRouter/>
        </main>
    </div>
  )
}

export default Home
