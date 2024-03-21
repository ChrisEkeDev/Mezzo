import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSignUp, thunkSignIn } from '../../store/session';
import TextInput from '../../components/shared/Inputs/TextInput';
import Button from '../../components/shared/Buttons/Button';
import { inOut, authForm } from '../../constants/animations';
import '../shared/styles.scss';



function SignUp({handleRoute}) {
  const user = useSelector(state => state.session.user);

  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const navigate = (route) => {
      history.push(route);
  }

  const signUp = (e) => {
    e.preventDefault();
    // setLoading({message: 'Signing you in...'});
    const data = {email, username, password};
    return (
      dispatch(thunkSignUp(data))
      .then((alert) => {
        // handleAlerts(alert)
        navigate('/dashboard/artists')
        // setLoading(undefined);
      })
      .catch(async(errors) => {
        const data = await errors.json();
        // if (data && data.errors) setErrors(data.errors)
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
    if (username.trim().length === 0) {
      errors.username = 'Please enter a Username';
    }
    if (username.trim().length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }
    if (email.trim().length < 4) {
      errors.email = 'Email must be at least 4 characters';
    }
    if (!email.includes(".") || !email.includes("@")) {
      errors.email = 'Please enter a valid email address';
    }
    if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }
    setErrors(errors)
  }, [email, username, password, confirmPassword])

  if (user) navigate('/dashboard')

  return (
      <motion.form {...inOut} variants={authForm} className='form--wrapper' onSubmit={signUp}>
        <h1 className='form--title'>Sign Up</h1>
        <p className='form--tip'>Already have an account? <strong className='form--link' onClick={() => handleRoute('/sign-in')}>Sign In</strong></p>
        <div className='form--inputs'>
          <TextInput
            name='email'
            label='Email'
            value={email}
            setValue={setEmail}
            error={errors.email}
          />
          <TextInput
            name='username'
            label='Username'
            value={username}
            setValue={setUsername}
            error={errors.username}
          />
          <TextInput
            name='password'
            label='Password'
            type='password'
            value={password}
            setValue={setPassword}
            error={errors.password}
          />
          <TextInput
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={errors.confirmPassword}
          />
        </div>
        <div className='form--actions'>
          <Button
            label='Sign Up'
            styles='primary'
            action={signUp}
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

export default SignUp
