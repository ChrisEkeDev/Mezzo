import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import SignIn from './signin'
import SignUp from './signup'
import mezzo from '../../assets/mezzo-white.svg';
import auth1 from '../../assets/mike-giles-IiwYeihxC58-unsplash.jpg'
import auth2 from '../../assets/kobe-subramaniam-QcM7_gq95_Y-unsplash.jpg'
import auth3 from '../../assets/takahiro-sakamoto-7Ai-s4EBbdM-unsplash.jpg'

const images = [
  {
    src: auth1,
    author: 'Mike Giles',
    authorURL: "https://unsplash.com/@mitch_peanuts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    unsplashURL: "https://unsplash.com/photos/IiwYeihxC58?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  },
  {
    src: auth2,
    author: 'Kobe Subramaniam',
    authorURL: 'https://unsplash.com/@kobebigs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    unsplashURL: "https://unsplash.com/photos/QcM7_gq95_Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  },
  {
    src: auth3,
    author: 'Takahiro Sakamoto',
    authorURL: 'https://unsplash.com/@takahiro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    unsplashURL: "https://unsplash.com/photos/7Ai-s4EBbdM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
  }
]



function Auth() {
  const [image, setImage] = useState(undefined)

  const randomImage = () => {
      const int = Math.floor(Math.random() * 3);
      setImage(images[int]);
  }

  useEffect(() => {
    randomImage()
  }, [])

  return (
    <main id='auth--wrapper'>
        <Switch>
            <Route exact path='/auth/sign-in'>
                <SignIn />
            </Route>
            <Route exact path='/auth/sign-up'>
                <SignUp />
            </Route>
        </Switch>
        <section className='auth--image' style={{backgroundImage: `url(${image?.src})`}}>
          <img src={mezzo} className='auth--icon'/>
          <div className='auth--image--credits'>
            <span>Photo By <a target="_blank" rel='noreferrer' href={image?.authorURL}>{image?.author}</a> on <a target="_blank" rel='noreferrer'  href={image?.unsplashURL}>Unsplash</a></span>
          </div>
        </section>
    </main>
  )
}

export default Auth
