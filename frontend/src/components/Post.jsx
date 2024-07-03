import { useEffect, useState } from 'react'
import { useGetUserQuery } from '../slices/userApiSlice'

const Post = ({ userId, gameId, createdAt }) => {
  const { data: user } = useGetUserQuery(userId)
  const [game, setGame] = useState({})

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
        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between'>
          <div>
            <h2 className='text-xl font-bold mb-2'>{user.username}</h2>
            <p className='text-gray-700'>
              <strong>Game:</strong> {game.name}
            </p>
            <p className='text-gray-700'>
              <strong>Date Completed:</strong>{' '}
              {new Date(createdAt).toLocaleDateString()}
            </p>
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
