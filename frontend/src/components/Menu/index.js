import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { PiListBold, PiXBold, PiSignOutBold } from "react-icons/pi";
import './styles.scss';
import IconButton from '../../components/shared/Buttons/IconButton';
import MenuItem from './MenuItem';
import { base, menuFade } from '../../constants/animations';

function Menu() {
    const [menu, setMenu] = useState(false);

    return (
        <div className='menu--wrapper'>
            <AnimatePresence mode="wait">
                {
                    menu ?
                    <IconButton
                        action={() => setMenu(false)}
                        key="open"
                        icon={PiXBold}
                    /> :
                    <IconButton
                        action={() => setMenu(true)}
                        key="closed"
                        icon={PiListBold}
                    />

                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    menu &&
                    <motion.ul {...base} variants={menuFade} className='menu_list--wrapper'>
                        <MenuItem
                            icon={PiSignOutBold}
                            label="Sign Out"
                        />
                        <MenuItem
                            icon={PiXBold}
                            label="Close"
                        />
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
  )
}

export default Menu
