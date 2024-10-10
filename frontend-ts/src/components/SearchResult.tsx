import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useCreatePostMutation } from '../slices/postApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '../slices/authSlice'

interface SearchResultProps {
  id: number
  name: string
  background_image: string
  released: string
  rating: number
}

const SearchResult = ({ ...game }: SearchResultProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [createPost] = useCreatePostMutation()
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const handleAddGame = async (gameId: Number) => {
    try {
      setIsLoading(true)
      const res = await createPost({
        userId: userInfo._id,
        gameId,
        gameName: game.name,
        img: game.background_image,
      }).unwrap()
      console.log(res)
      toast.success('Game logged')
      setIsLoading(false)
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='rounded-lg bg-white p-4 shadow-md'>
      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          className='mb-4 h-48 w-full rounded-t-lg object-cover'
        />
      )}
      <div className='flex justify-between'>
        <div>
          <h2 className='mb-2 text-xl font-bold'>{game.name}</h2>
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
