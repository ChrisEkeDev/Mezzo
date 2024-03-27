import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import * as ROUTES from '../../Constants/routes'
import { useApp } from '../../Context/AppContext';
import { PiNotchesBold, PiXBold, PiSignOutBold } from "react-icons/pi";
import IconButton from '../../components/Shared/Buttons/IconButton';
import MenuItem from './MenuItem';
import { base, menuFade } from '../../Constants/animations';
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
            <div className='menu_list--wrapper'>
                <AnimatePresence>
                    {
                        menu &&
                        <motion.ul
                            key="menu"
                            {...base}
                            variants={menuFade}
                            className='menu_list--container'
                        >
                            <MenuItem
                                icon={PiSignOutBold}
                                label="Sign Out"
                                action={() => navigate(ROUTES.HOME)}
                            />
                            <MenuItem
                                icon={PiXBold}
                                label="Close"
                                action={() => setMenu(false)}
                            />
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>
        </div>
  )
}

export default Menu
