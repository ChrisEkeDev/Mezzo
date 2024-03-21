import React from 'react'
import Header from '../../components/Header'
import test from '../../assets/mezzo-color.svg'
import './styles.scss';
import TextInput from '../../components/shared/Inputs/TextInput';
import Button from '../../components/button';
import HomeMediaPlayer from '../../components/HomeMediaPlayer';
import AuthRouter from '../../routers/AuthRouter';

function Home() {
  return (
    <div className='home--wrapper'>
            <Header/>
            <main className='home--container'>
                <HomeMediaPlayer/>
                <AuthRouter/>
            </main>
            {/* <main className='landing_main--wrapper'>
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
            </main> */}
            {/* <footer className="landing--footer">
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
            </footer> */}
        </div>
  )
}

export default Home
