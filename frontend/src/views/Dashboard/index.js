import React from 'react';
import Aside from '../../components/Aside/Aside';
import DashboardMediaPlayer from '../../components/HomeMediaPlayer';
import DashboardRouter from '../../routers/DashboardRouter';
import DashboardHeader from '../../components/DashboardHeader';
import './styles.scss'

function Dashboard() {
  return (
    <div className='dashboard--wrapper'>
        <Aside/>
        <div className='dashboard--main'>
            <DashboardHeader />
            <main className='main--wrapper'>
              <DashboardRouter />
            </main>
        </div>
        <div className='dashboard--media'>
          {/* <DashboardMediaPlayer /> */}
        </div>
    </div>
  )
}

export default Dashboard
