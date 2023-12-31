import React, { useState, useEffect } from 'react';
import '../auth.css';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../../context/loading';
import { useAlerts } from '../../../context/alerts';
import { thunkSignUp, thunkSignIn } from '../../../store/session';
import Input from '../../input';
import Button from '../../button';
import { TbUserCode, TbUserPlus, TbChevronLeft } from 'react-icons/tb'


function SignUp() {
  const user = useSelector(state => state.session.user);

  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const { handleAlerts } = useAlerts();
  const history = useHistory();
  const dispatch = useDispatch();

  const navigate = (route) => {
      history.push(route);
  }

  const signUp = (e) => {
    e.preventDefault();
    setLoading({message: 'Signing you in...'});
    const data = {email, username, password};
    return (
      dispatch(thunkSignUp(data))
      .then((alert) => {
        handleAlerts(alert)
        navigate('/dashboard/artists')
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
        navigate('/dashboard/artists')
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
    <section className='auth_form--wrapper'>
      <Button
        label='Back'
        style='secondary back'
        action={() => navigate('/')}
        left={<TbChevronLeft/>}
      />
      <form className='auth_form--form' onSubmit={signUp}>
        <header className='auth_form--header'>
          <h1>Sign Up</h1>
          <p>Sign up to experience Mezzo.</p>
        </header>
        <Input
          name='email'
          label='Email'
          value={email}
          setValue={setEmail}
          error={errors.email}
        />
        <Input
          name='username'
          label='Username'
          value={username}
          setValue={setUsername}
          error={errors.username}
        />
        <Input
          name='password'
          label='Password'
          type='password'
          value={password}
          setValue={setPassword}
          error={errors.password}
        />
        <Input
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={errors.confirmPassword}
        />
        <div className='auth_form--actions'>
          <Button
            label='Sign Up'
            style='primary'
            action={signUp}
            right={<TbUserPlus />}
            disabled={Object.keys(errors).length}
          />
          <Button
            label='Try Mezzo (Demo)'
            style='secondary'
            action={demoSignIn}
            right={<TbUserCode />}
          />
          <Link className='auth_form--link' to='/auth/sign-in'>Already have an account?</Link>
        </div>
      </form>
    </section>

  )
}

export default SignUp
