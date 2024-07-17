import { useEffect, useState } from 'react'
import { useGetUserQuery } from '../slices/userApiSlice'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useDeletePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Post = ({ userId, gameId, _id, createdAt }) => {
  const { data: user } = useGetUserQuery(userId)
  const [game, setGame] = useState({})

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

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${
          import.meta.env.VITE_RAWG_KEY
        }`
      )
      const data = await response.json()
      setGame(data)
    }

    fetchGame()
  }, [])

  return (
    <>
      {user && game && (
        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between max-w-2xl'>
          <div className=''>
            <Link to={`/user/${userId}`}>
              <h2 className='text-xl font-bold mb-2'>{user.username}</h2>
            </Link>

            <p className='text-gray-700'>
              <strong>Game:</strong> {game.name}
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
            <img src={game.background_image} className='rounded-t-lg h-32' />
          </div>
        </div>
      )}
    </>
  )
}

export default Post
