import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/userApiSlice'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { GoogleLogin } from '@react-oauth/google'
import { Oval } from 'react-loader-spinner'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const googleLogin = async (response) => {
    const { email, sub } = jwtDecode(response.credential)

    try {
      const res = await login({ email, password: sub }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/home')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-md my-12'>
        <div className='bg-white shadow-md rounded px-8 py-10'>
          <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
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
            <div className=' flex items-center justify-center'>
              <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Login
              </button>
            </div>
            <div className='mt-5 grid grid-cols-3 items-center text-gray-500'>
              <hr className='border-gray-500' />
              <p className='text-center'>OR</p>
              <hr className='border-gray-500' />
            </div>
            <div className='mt-5 flex justify-center'>
              <GoogleLogin
                onSuccess={(response) => googleLogin(response)}
                onError={() => console.log('error')}
              />
            </div>
          </form>
          {isLoading && (
            <div className='flex justify-center mt-6'>
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

export default LoginScreen
