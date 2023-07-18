import React, { useState, useEffect } from 'react';
import '../auth.css';
import mezzo from '../../../assets/mezzo-color.svg';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../../context/loading';
import { useAlerts } from '../../../context/alerts';
import { thunkSignIn } from '../../../store/session';
import Input from '../../input';
import Button from '../../button';
import { TbLogin, TbUserCode, TbChevronLeft } from 'react-icons/tb';



function SignIn() {
  const user = useSelector(state => state.session.user);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const { handleAlerts } = useAlerts();
  const history = useHistory();
  const dispatch = useDispatch();

  const navigate = (route) => {
      history.push(route);
  }

  const signIn = (e) => {
    e.preventDefault();
    setLoading({message: 'Signing you in...'});
    const data = {email, password};
    return (
      dispatch(thunkSignIn(data))
      .then((alert) => {
        handleAlerts(alert)
        navigate('/dashboard')
        setLoading(undefined);
      })
      .catch(async(errors) => {
        const data = await errors.json();
        if (data && data.errors) setErrors(data.errors)
        setLoading(undefined);
      })
    )
  }

  const demoSignIn = (e) => {
    e.preventDefault();
    setLoading({message: 'Signing you in...'});
    const data = {email: 'fassounds@email.com' , password: 'password'}
    return (
      dispatch(thunkSignIn(data))
      .then((alert) => {
        handleAlerts(alert)
        navigate('/dashboard')
        setLoading(undefined);
      })
      .catch(async(errors) => {
        const data = await errors.json();
        if (data && data.errors) setErrors(data.errors)
        setLoading(undefined);
      })
    )
  }

  useEffect(() => {
    const errors = {};
    if (email.trim().length < 4) {
      errors.email = 'Email must be at least 4 characters';
    }
    if (!email.includes(".") || !email.includes("@")) {
      errors.email = 'Please enter a valid email address';
    }
    if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setErrors(errors)
  }, [email, password])


  if (user) navigate('/dashboard')

  return (
    <section className='auth_form--wrapper'>
      <Button
        label='Back'
        style='secondary back'
        action={() => navigate('/')}
        left={<TbChevronLeft/>}
      />
      <form className='auth_form--form' onSubmit={signIn}>
          <img src={mezzo} />
          <header className='auth_form--header'>
            <h1>Sign In</h1>
            <p>Sign in to your Mezzo account.</p>
          </header>
          <Input
            name='email'
            label='Email'
            value={email}
            setValue={setEmail}
            error={errors.email}
          />
          <Input
            name='password'
            label='Password'
            type='password'
            value={password}
            setValue={setPassword}
            error={errors.password}
          />
          <div className='auth_form--actions'>
            <Button
              label='Sign In'
              style='primary'
              action={signIn}
              right={<TbLogin className='flip' />}
              disabled={Object.keys(errors).length}
            />
            <Button
              label='Try Mezzo (Demo)'
              style='secondary'
              action={demoSignIn}
              right={<TbUserCode />}
            />
            <Link className='auth_form--link' to='/auth/sign-up'>Don't have an account?</Link>
          </div>
      </form>
    </section>

  )
}

export default SignIn
