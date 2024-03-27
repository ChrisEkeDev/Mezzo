import React from 'react';
import './styles.scss';

function Scroll({children, styles}) {
  return (
      <section className={`scroll--wrapper ${styles}`}>
          {children}
      </section>
  )
}

export default Scroll
