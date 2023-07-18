import React from 'react';
import { useLocation } from 'react-router-dom';

function AsideGroupItem({icon, label, action, path}) {
  const { pathname } = useLocation();
  const location = pathname.split('/')[2]

  return (
    <div onClick={action} className={`aside_group_item--wrapper ${location === path ? 'current--navigation' : ''}`}>
        <span className='aside_group_item--icon'>{icon}</span>
        <span className='aside_group_item--label'>{label}</span>
    </div>
  )
}

export default AsideGroupItem
