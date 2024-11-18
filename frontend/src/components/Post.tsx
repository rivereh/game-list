import { useEffect } from 'react'
import { useGetUserQuery } from '../slices/userApiSlice'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useDeletePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/authSlice'
import { PostType } from '../types/Post'

const Post = (props: PostType) => {
  const { data: user, refetch: refetchUser } = useGetUserQuery(props.userId)
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [deletePost] = useDeletePostMutation()

  const handleDeletePost = async () => {
    try {
      await deletePost({ id: props._id })
      toast.success('Game deleted!')
      props.onPostDeleted(props._id)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    refetchUser()
  }, [refetchUser])

  return (
    <>
      {user && (
        <div className='mb-4 flex w-full rounded-lg border-gray-500 bg-white shadow-md'>
          {/* left side with user info */}
          <div className='w-2/3'>
            <div className='flex items-start px-3 py-4'>
              <div className='flex-1'>
                <Link to={`/user/${user.username}`}>
                  <span className='text-blue-500 hover:underline'>
                    {user.displayName}
                  </span>
                </Link>{' '}
                completed {props.gameName}
              </div>
              {/* delete icon if post belongs to logged in user */}
              {props.userId === userInfo._id && (
                <FaRegTrashCan
                  onClick={handleDeletePost}
                  className='cursor-pointer text-gray-500 hover:text-red-500'
                  size={18}
                />
              )}
            </div>
            {/* post date */}
            <div className='p-4'>
              <p className='text-xs text-gray-500'>
                {new Date(props.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* right side with game image */}
          <div className='w-1/3'>
            <div
              className='h-full rounded-r-md bg-cover bg-center'
              style={{
                backgroundImage: `url(${props.img})`,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  )
}

export default Post
