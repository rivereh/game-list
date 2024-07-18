import { useEffect, useState } from 'react'
import { useGetUserQuery } from '../slices/userApiSlice'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useDeletePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Post = ({ userId, gameId, gameName, img, _id, createdAt }) => {
  const { data: user } = useGetUserQuery(userId)
  // const [game, setGame] = useState({})

  const { userInfo } = useSelector((state) => state.auth)

  const [deletePost] = useDeletePostMutation()

  const handleDeletePost = async () => {
    try {
      await deletePost({ id: _id })
      toast.success('Game deleted!')
    } catch (err) {
      console.log(err)
    }
  }

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
        <div className='flex w-full justify-between rounded-lg bg-white p-4 shadow-md'>
          <div className=''>
            <Link to={`/user/${user.username}`}>
              <h2 className='mb-2 text-xl font-bold'>{user.displayName}</h2>
            </Link>

            <p className='text-gray-700'>
              <strong>Game:</strong> {gameName}
            </p>
            <p className='text-gray-700'>
              <strong>Date Completed:</strong>{' '}
              {new Date(createdAt).toLocaleDateString()}
            </p>
            {userId == userInfo._id && (
              <FaRegTrashCan
                onClick={handleDeletePost}
                className='mt-7 cursor-pointer'
                size={16}
              />
            )}
          </div>
          <div>
            <img src={img} className='h-32 rounded-t-lg' />
          </div>
        </div>
      )}
    </>
  )
}

export default Post
