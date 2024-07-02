import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState()

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
      <div className='container-fluid flex justify-between items-center max-w-7xl'>
        <Link to='/' className='text-white text-lg font-bold'>
          GameTracker
        </Link>
        {userInfo && (
          <form
            onSubmit={handleSearch}
            className='hidden md:flex items-center space-x-4'
          >
            <input
              type='text'
              className='bg-gray-700 text-white rounded py-2 px-4 focus:outline-none'
              placeholder='Search games...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Search
            </button>
          </form>
        )}

        <div className='hidden md:flex space-x-4'>
          {userInfo ? (
            <Link
              onClick={logoutHandler}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
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
              className='w-6 h-6'
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
        <div className='md:hidden mt-2 space-y-2'>
          <button className='block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'>
            Login
          </button>
          <button className='block w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'>
            Register
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
