import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSignIn } from '../../store/session';
import TextInput from '../../components/shared/Inputs/TextInput';
import Button from '../../components/shared/Buttons/Button';
import { inOut, authForm } from '../../constants/animations';
import '../shared/styles.scss';



function SignIn({handleRoute}) {
  const user = useSelector(state => state.session.user);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const navigate = (route) => {
      history.push(route);
  }

  const signIn = (e) => {
    e.preventDefault();
    // setLoading({message: 'Signing you in...'});
    const data = {email, password};
    return (
      dispatch(thunkSignIn(data))
      .then((alert) => {
        // handleAlerts(alert)
        navigate('/dashboard/artists')
        // setLoading(undefined);
      })
      .catch(async(errors) => {
        const data = await errors.json();
        // if (data && data.errors) handleAlerts(data.errors)
        // setLoading(undefined);
      })
    )
  }

  const demoSignIn = (e) => {
    e.preventDefault();
    // setLoading({message: 'Signing you in...'});
    const data = {email: 'fassounds@email.com' , password: 'password'}
    return (
      dispatch(thunkSignIn(data))
      .then((alert) => {
        // handleAlerts(alert)
        navigate('/dashboard/artists')
        // setLoading(undefined);
      })
      .catch(async(errors) => {
        const data = await errors.json();
        if (data && data.errors) setErrors(data.errors)
        // setLoading(undefined);
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
      <motion.form {...inOut} variants={authForm} className='form--wrapper'>
        <h1 className='form--title'>Sign In</h1>
        <p className='form--tip'>Dont have an account yet? <strong className='form--link' onClick={() => handleRoute('/sign-up')}>Sign Up</strong></p>
        <div className='form--inputs'>
        <TextInput
            name='email'
            label='Email'
            value={email}
            setValue={setEmail}
            error={errors.email}
        />
        <TextInput
            name='password'
            label='Password'
            type='password'
            value={password}
            setValue={setPassword}
            error={errors.password}
        />
        </div>
        <div className='form--actions'>
        <Button
            label='Sign In'
            styles='primary'
            action={signIn}
            disabled={Object.keys(errors).length}
        />
        <Button
            label='Try Mezzo (Demo)'
            styles='secondary'
            action={demoSignIn}
        />
        </div>
      </motion.form>
  )
}

export default SignIn
