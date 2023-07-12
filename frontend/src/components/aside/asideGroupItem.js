import React from 'react'

function AsideGroupItem({icon, label, action}) {
  return (
    <div onClick={action} className='aside_group_item--wrapper'>
        <span className='aside_group_item--icon'>{icon}</span>
        <span className='aside_group_item--label'>{label}</span>
    </div>
  )
}

export default AsideGroupItem
