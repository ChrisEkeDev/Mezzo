import React, { useState } from 'react'
import { PiMagnifyingGlassBold, PiXBold } from 'react-icons/pi';
import { base, search } from '../../constants/animations';
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss'

function Search({placeholder, action}) {
  const [ query, setQuery ] = useState('');

  const handleQuery = (x) => {
    setQuery(x.target.value)
  }

  const clearQuery = () => {
    setQuery("")
  }

  return (
    <div className='search--wrapper'>
        <input
            value={query}
            onChange={handleQuery}
            className='search--input'
            placeholder={placeholder}
        />
        <div className='search--action'>
          <AnimatePresence mode='wait'>
            {
              query.length > 0 ?
              <motion.span
                key="close"
                {...base}
                variants={search}
                className="search--clear"
                onClick={clearQuery}
              >
                <PiXBold />
              </motion.span> :
              <motion.span
                key="search"
                {...base}
                variants={search}
                className="search--icon"
              >
                <PiMagnifyingGlassBold />
              </motion.span>
            }
          </AnimatePresence>
        </div>
    </div>
  )
}

export default Search
