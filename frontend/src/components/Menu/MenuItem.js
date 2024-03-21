import React from 'react'

function MenuItem({label, icon: Icon, action}) {
  return (
    <li onClick={action} className='menu_item--wrapper'>
        <span className='menu_item--label'>{label}</span>
        <Icon className='menu_item--icon'/>
    </li>
  )
}

export default MenuItem
