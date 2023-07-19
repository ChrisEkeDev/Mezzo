import React from 'react'
import mezzo from '../../assets/mezzo-color.svg';
import landing from '../../assets/mezzo-landing.png'
import { useHistory } from 'react-router-dom';
import Button from '../button';
import './landing.css';

function Landing() {
    const history = useHistory()

    const navigate = (route) => {
        history.push(route)
    }

    return (
        <div id='landing--wrapper'>
            {/* <img className='landing--image' src={landing}/> */}
            <header className='landing_nav--wrapper'>
                <nav className='landing_nav--nav'>
                    <div className='landing_nav--logo'>
                        <img src={mezzo} />
                    </div>
                    <div className='landing_nav--actions'>
                        <Button
                            style='secondary'
                            label="Sign In"
                            action={() => navigate('/auth/sign-in')}
                        />
                        <Button
                            style='primary'
                            label="Sign Up"
                            action={() => navigate('/auth/sign-up')}
                        />
                    </div>
                </nav>
            </header>
            <main className='landing_main--wrapper'>
                <section className='landing_main--contents'>
                    <h1>Your Music,<br/> Your Way.</h1>
                    <p>Your stage, your spotlight.<br/> Share and discover original songs and be heard.</p>
                    <div className='landing_main--actions'>
                        <Button
                            style='primary'
                            label="Try Mezzo"
                            action={() => navigate('/auth/sign-up')}
                        />
                    </div>
                </section>
                <img className='landing--image' src={landing}/>
            </main>
        </div>
    )
}

export default Landing
