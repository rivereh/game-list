import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useCreatePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

const SearchResult = ({ game }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [createPost] = useCreatePostMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const handleAddGame = async (gameId) => {
    try {
      console.log('starting')
      setIsLoading(true)
      const res = await createPost({
        userId: userInfo._id,
        gameId,
      }).unwrap()
      console.log(res)
      toast.success('Game logged')
      setIsLoading(false)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
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
        <div className='self-end'>
          {isLoading ? (
            <Oval
              visible={true}
              height='35'
              width='35'
              color='#5e5e5e'
              secondaryColor='#1f1f1f'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          ) : (
            <IoIosAddCircleOutline
              className='cursor-pointer'
              size={35}
              onClick={() => handleAddGame(game.id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default SearchResult
