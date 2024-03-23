import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import * as ROUTES from '../../constants/routes'
import { useApp } from '../../context/AppContext';
import { PiNotchesBold, PiXBold, PiSignOutBold } from "react-icons/pi";
import IconButton from '../../components/shared/Buttons/IconButton';
import MenuItem from './MenuItem';
import { base, menuFade } from '../../constants/animations';
import './styles.scss';

function Menu() {
    const [menu, setMenu] = useState(false);
    const { navigate } = useApp();

    return (
        <div className='menu--wrapper'>
            <AnimatePresence mode="wait">
                {
                    menu ?
                    <IconButton
                        styles='icon_button--no_shadow'
                        action={() => setMenu(false)}
                        key="open"
                        icon={PiXBold}
                    /> :
                    <IconButton
                        styles='icon_button--no_shadow'
                        action={() => setMenu(true)}
                        key="closed"
                        icon={PiNotchesBold}
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
                            action={() => navigate(ROUTES.HOME)}
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
