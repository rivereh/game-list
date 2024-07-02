import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { GoogleLogin } from '@react-oauth/google'

const SignupScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  const googleSignup = async (response) => {
    const { email, sub } = jwtDecode(response.credential)
    // fetch random username
    let generatedUsername

    try {
      const res = await fetch('https://randomuser.me/api/')
      const data = await res.json()
      generatedUsername = data.results[0].login.username
    } catch (error) {
      toast.error('Failed to fetch a random username')
      return
    }

    try {
      const res = await register({
        username: generatedUsername,
        email,
        password: sub,
        googleAccount: true,
      }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/home')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password != confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/home')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-md my-12'>
        <div className='bg-white shadow-md rounded px-8 py-10'>
          <h2 className='text-2xl font-bold text-center mb-6'>Signup</h2>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='username'
                type='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center justify-center'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Signup
              </button>
            </div>
            <div className='mt-5 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-500' />
              <p className='text-center'>OR</p>
              <hr className='border-gray-500' />
            </div>
            <div className='mt-5 flex justify-center'>
              <GoogleLogin
                onSuccess={(response) => googleSignup(response)}
                onError={() => console.log('error')}
                text={'signup_with'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupScreen
