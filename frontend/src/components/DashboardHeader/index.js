import React from 'react'
import Search from '../Search'
import Menu from '../Menu'
import './styles.scss'

function DashboardHeader() {
  return (
    <header className='dashboard--header'>
        <Search/>
        <Menu/>
    </header>
  )
}

export default DashboardHeader
