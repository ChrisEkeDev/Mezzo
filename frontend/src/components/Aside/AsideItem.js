import React from 'react'
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../Context/AppContext';
import { base, button } from '../../Constants/animations';

function AsideItem({href}) {
  const { activeIcon: ActiveIcon, inactiveIcon: InactiveIcon, path, label } = href;
  const { navigate } = useApp();
  const location = useLocation();

  const routeMatch = location.pathname === href.path;

  return (
    <li onClick={() => navigate(path)} className={`aside_item--wrapper ${routeMatch && 'aside_item--selected'}`}>
      <AnimatePresence mode="wait">
        {
          routeMatch ?
          <motion.span {...base} variants={button} key='active'  className='aside_item--icon'>
            <ActiveIcon/>
          </motion.span> :
          <motion.span {...base} variants={button} key="inactive" className='aside_item--icon'>
            <InactiveIcon/>
          </motion.span>
        }
      </AnimatePresence>
      <span  className='aside_item--label'>{label}</span>
    </li>
  )
}

export default AsideItem
