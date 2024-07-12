import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useCreatePostMutation } from '../slices/postApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SearchResult from '../components/SearchResult'

const SearchScreen = () => {
  const [games, setGames] = useState([])
  const { userInfo } = useSelector((state) => state.auth)
  const location = useLocation()
  const searchQuery = location.state.searchQuery
  const [isLoading, setIsLoading] = useState(false)
  const [createPost] = useCreatePostMutation()
  const [loadingAddGame, setLoadingAddGame] = useState(false)

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
                <SearchResult key={game.id} game={game} />
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
