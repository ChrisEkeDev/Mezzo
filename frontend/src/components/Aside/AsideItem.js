import React from 'react'

function AsideItem({icon: Icon, label}) {
  return (
    <li className='aside_item--wrapper'>
        <Icon  className='aside_item--icon'/>
        <span  className='aside_item--label'>{label}</span>
    </li>
  )
}

export default AsideItem
