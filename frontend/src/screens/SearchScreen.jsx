import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SearchScreen = () => {
  const [games, setGames] = useState([])

  const location = useLocation()
  const searchQuery = location.state.searchQuery

  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${
          import.meta.env.VITE_RAWG_KEY
        }&search=${searchQuery}`
      )
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
          {games.map((game) => (
            <div key={game.id} className='bg-white p-4 rounded-lg shadow-md'>
              {game.background_image && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className='w-full h-48 object-cover rounded-t-lg mb-4'
                />
              )}
              <h2 className='text-xl font-bold mb-2'>{game.name}</h2>
              <p className='text-gray-700'>
                <strong>Released:</strong>{' '}
                {new Date(game.released).toLocaleDateString()}
              </p>
              <p className='text-gray-700'>
                <strong>Rating:</strong> {game.rating}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-700'>No results found.</p>
      )}
    </div>
  )
}

export default SearchScreen
