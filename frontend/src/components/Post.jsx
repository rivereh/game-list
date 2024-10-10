import { useEffect, useState } from 'react'
import { useGetUserQuery } from '../slices/userApiSlice'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useDeletePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Post = ({
  userId,
  gameId,
  gameName,
  img,
  _id,
  createdAt,
  onPostDeleted,
}) => {
  const { data: user, refetch: refetchUser } = useGetUserQuery(userId)
  // const [game, setGame] = useState({})

  const { userInfo } = useSelector((state) => state.auth)

  const [deletePost] = useDeletePostMutation()

  const handleDeletePost = async () => {
    try {
      await deletePost({ id: _id })
      toast.success('Game deleted!')
      onPostDeleted(_id)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    refetchUser()
  }, [refetchUser])

  // useEffect(() => {
  //   const fetchGame = async () => {
  //     const response = await fetch(
  //       `https://api.rawg.io/api/games/${gameId}?key=${
  //         import.meta.env.VITE_RAWG_KEY
  //       }`
  //     )
  //     const data = await response.json()
  //     setGame(data)
  //   }

  //   fetchGame()
  // }, [])

  return (
    <>
      {user && (
        <div className='mx-auto mb-4 w-[500px] rounded-lg bg-white shadow-md'>
          <div className='flex items-start border-b border-gray-200 p-4'>
            {/* <img
              src={user.profilePicture}
              alt={`${user.displayName}'s profile`}
              className='mr-4 h-12 w-12 rounded-full'
            /> */}
            <div className='flex-1'>
              <Link
                to={`/user/${user.username}`}
                className='text-lg font-semibold text-gray-900 hover:underline'
              >
                {user.displayName}
              </Link>
              <p className='text-xs text-gray-500'>
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
            {userId === userInfo._id && (
              <FaRegTrashCan
                onClick={handleDeletePost}
                className='cursor-pointer text-gray-500 hover:text-red-500'
                size={18}
              />
            )}
          </div>

          <div className='p-4'>
            <p className='text-base text-gray-800'>
              <strong className='font-semibold'>Game:</strong> {gameName}
            </p>

            {img && (
              <img
                src={img}
                alt='Game cover'
                className='mt-2 w-full rounded-lg object-cover'
              />
            )}
          </div>

          {/* <div className='border-t border-gray-200 p-4'>
            <button className='text-blue-500 hover:underline'>Like</button>
            <button className='ml-4 text-blue-500 hover:underline'>
              Comment
            </button>
          </div> */}
        </div>
      )}
    </>
  )
}

export default Post
