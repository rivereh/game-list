import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/userApiSlice'
import { useDeleteUserMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import Swal from 'sweetalert2'
import { Oval } from 'react-loader-spinner'

const ProfileScreen = () => {
  const [username, setUserame] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const [updateProfile, { isLoading }] = useUpdateUserMutation()
  const [deleteProfile] = useDeleteUserMutation()

  useEffect(() => {
    if (userInfo) {
      setUserame(userInfo.displayName)
      setEmail(userInfo.email)
    }
  }, [userInfo.setUserame, userInfo.setEmail])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo.id,
          username: username.toLowerCase(),
          displayName: username,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure you want to delete your profile?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })
        confirmDelete()
      }
    })
  }

  const confirmDelete = async () => {
    try {
      await deleteProfile({
        _id: userInfo.id,
        username,
        email,
        password,
      }).unwrap()
      dispatch(logout())
      toast.success('Profile deleted')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='mt-12 flex justify-center'>
      <div className='w-96 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-2xl font-semibold'>Update Profile</h1>
        <form onSubmit={submitHandler}>
          {/* NAME INPUT */}
          <label
            htmlFor='name'
            className='text-grey-600 mt-4 block text-sm font-medium'
          >
            Username
          </label>
          <input
            type='name'
            name='name'
            id='username'
            value={username}
            onChange={(e) => setUserame(e.target.value)}
            className='mt-1 w-full rounded-md border p-2'
          />
          {/* EMAIL INPUT */}
          <label
            htmlFor='email'
            className='text-grey-600 mt-4 block text-sm font-medium'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              userInfo.googleAccount
                ? 'mt-1 w-full rounded-md border p-2 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none'
                : 'mt-1 w-full rounded-md border p-2'
            }
            disabled={userInfo.googleAccount}
          />
          {/* Hide password inputs if logged in on Google account */}
          {!userInfo.googleAccount && (
            <>
              {/* PASSWORD INPUT */}
              <label
                htmlFor='password'
                className='text-grey-600 mt-4 block text-sm font-medium'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 w-full rounded-md border p-2'
              />
              {/* CONFIRM PASSWORD INPUT */}
              <label
                htmlFor='confirmPassword'
                className='text-grey-600 mt-4 block text-sm font-medium'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='mt-1 w-full rounded-md border p-2'
              />
            </>
          )}
          <button className='mt-7 w-full rounded-md bg-blue-500 p-3 text-white'>
            Update
          </button>
        </form>
        <button
          className='mt-5 w-full rounded-md bg-red-500 p-3 text-white'
          onClick={handleDelete}
        >
          Delete Profile
        </button>
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
  )
}
export default ProfileScreen
