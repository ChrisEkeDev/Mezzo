import React from 'react';
import Scroll from '../../components/shared/Layout/Scroll';
import './styles.scss';

function Welcome() {
  return (
    <>
      <Scroll>
        <section className='welcome--wrapper'>
            <h1>Dashboard Home</h1>
        </section>
      </Scroll>
    </>
  )
}

export default Welcome
