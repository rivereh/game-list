import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useCreatePostMutation } from '../slices/postApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SearchScreen = () => {
  const [games, setGames] = useState([])
  const { userInfo } = useSelector((state) => state.auth)
  const location = useLocation()
  const searchQuery = location.state.searchQuery
  const [isLoading, setIsLoading] = useState(false)
  const [createPost] = useCreatePostMutation()

  const dispatch = useDispatch()

  const handleAddGame = async (gameId) => {
    try {
      const res = await createPost({
        userId: userInfo._id,
        gameId,
      }).unwrap()
      toast.success('Game logged')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true)
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_RAWG_KEY
        }&search=${searchQuery}`
      )
      setIsLoading(false)
      const data = await response.json()
      setGames(data.results)
    }

    if (searchQuery) {
      fetchGames()
    }
  }, [searchQuery])

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Search Results</h1>
      {games.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {games.map(
            (game) =>
              game.background_image && (
                <>
                  <div
                    key={game.id}
                    className='bg-white p-4 rounded-lg shadow-md'
                  >
                    {game.background_image && (
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className='w-full h-48 object-cover rounded-t-lg mb-4'
                      />
                    )}
                    <div className='flex justify-between'>
                      <div>
                        <h2 className='text-xl font-bold mb-2'>{game.name}</h2>
                        <p className='text-gray-700'>
                          <strong>Released:</strong>{' '}
                          {new Date(game.released).toLocaleDateString()}
                        </p>
                        <p className='text-gray-700'>
                          <strong>Rating:</strong> {game.rating}
                        </p>
                      </div>
                      <div
                        className='self-end cursor-pointer'
                        onClick={() => handleAddGame(game.id)}
                      >
                        <IoIosAddCircleOutline size={35} />
                      </div>
                    </div>
                  </div>
                </>
              )
          )}
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className='mt-6'>
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
          ) : (
            <p className='text-gray-700'>No results found.</p>
          )}
        </>
      )}
    </div>
  )
}

export default SearchScreen
