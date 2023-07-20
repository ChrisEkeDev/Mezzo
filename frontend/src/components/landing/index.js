import React from 'react'
import mezzo from '../../assets/mezzo-color.svg';
import landing from '../../assets/mezzo-landing.png'
import { useHistory } from 'react-router-dom';
import Button from '../button';
import './landing.css';
import { TbBrandDribbble,TbBrandCss3,TbBrandRedux,  TbBrandGithub, TbBrandJavascript, TbBrandLinkedin, TbBrandReact } from 'react-icons/tb';
import { FaNodeJs } from 'react-icons/fa';
import { SiExpress, SiPostgresql, SiRender } from 'react-icons/si';


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
                        <span>Mezzo</span>
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
            <footer className="landing--footer">
                <div className='landing--socials'>
                    <a target='_blank'  rel="noreferrer" href='https://linkedin.com/in/iamchriseke'>
                        <TbBrandLinkedin/>
                    </a>
                    <a target='_blank'  rel="noreferrer" href='https://dribbble.com/chriseke'>
                        <TbBrandDribbble/>
                    </a>
                    <a target='_blank' rel="noreferrer" href='https://github.com/ChrisEkeDev'>
                        <TbBrandGithub/>
                    </a>
                </div>
                <div className='landing--technologies'>
                    <span className='landing--technology-item'>
                        <TbBrandReact/>
                        <span>React</span>
                    </span>
                    <span className='landing--technology-item'>
                        <FaNodeJs/>
                        <span>Node.js</span>
                    </span>
                    <span className='landing--technology-item'>
                        <TbBrandJavascript/>
                        <span>Javascript</span>
                    </span>
                    <span className='landing--technology-item'>
                        <TbBrandCss3/>
                        <span>CSS3</span>
                    </span>
                    <span className='landing--technology-item'>
                        <SiExpress/>
                        <span>Express</span>
                    </span>
                    <span className='landing--technology-item'>
                        <TbBrandRedux/>
                        <span>Redux</span>
                    </span>
                    <span className='landing--technology-item'>
                        <SiPostgresql/>
                        <span>PostgreSQL</span>
                    </span>
                    <span className='landing--technology-item'>
                        <SiRender/>
                        <span>Render</span>
                    </span>
                </div>
                <a href="https://github.com/ChrisEkeDev/Mezzo" rel="noreferrer" target="_blank" className='landing--repo'>
                    <TbBrandGithub/>
                    <span>Github Repo</span>
                </a>
            </footer>
        </div>
    )
}

export default Landing
