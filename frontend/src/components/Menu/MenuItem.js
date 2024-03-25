import React from 'react'

function MenuItem({label, icon: Icon, action}) {
  return (
    <li onClick={action} className='menu_item--wrapper'>
        <Icon className='menu_item--icon accent'/>
        <span className='menu_item--label bold'>{label}</span>
    </li>
  )
}

export default MenuItem
