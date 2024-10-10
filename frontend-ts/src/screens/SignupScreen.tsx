import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { Oval } from 'react-loader-spinner'
import { RootState } from '../store.ts'

interface GoogleJwtPayload {
  email: string
  sub: string
}

const SignupScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  const googleSignup = async (response: CredentialResponse) => {
    const { email, sub } = jwtDecode<GoogleJwtPayload>(
      response.credential || '',
    )
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const submitHandler = async (e: React.FormEvent) => {
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='my-12 w-full max-w-md'>
        <div className='rounded bg-white px-8 py-10 shadow-md'>
          <h2 className='mb-6 text-center text-2xl font-bold'>Signup</h2>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='username'
                type='username'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='confirmPassword'
              >
                Confirm Password
              </label>
              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='password'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center justify-center'>
              <button className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'>
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
          {isLoading && (
            <div className='mt-6 flex justify-center'>
              <Oval
                visible={true}
                height='80'
                width='80'
                color='#5e5e5e'
                secondaryColor='#1f1f1f'
                ariaLabel='oval-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupScreen
