import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search', { state: { searchQuery } })
  }

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container-fluid flex max-w-7xl items-center justify-between'>
        <Link to='/' className='text-lg font-bold text-white'>
          GameTracker
        </Link>
        {userInfo && (
          <form
            onSubmit={handleSearch}
            className='hidden items-center space-x-4 md:flex'
          >
            <input
              type='text'
              className='rounded bg-gray-700 px-4 py-2 text-white focus:outline-none'
              placeholder='Search games...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            >
              Search
            </button>
          </form>
        )}

        <div className='hidden space-x-4 md:flex'>
          {userInfo ? (
            <div className='flex gap-3'>
              <Link
                onClick={logoutHandler}
                className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Logout
              </Link>
              <Link
                to='/profile'
                className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Profile
              </Link>
            </div>
          ) : (
            <>
              <Link
                to='/login'
                className='rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-600'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                Signup
              </Link>
            </>
          )}
        </div>
        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='mt-2 space-y-2 md:hidden'>
          <button className='block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'>
            Login
          </button>
          <button className='block w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700'>
            Register
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
