import { useParams } from 'react-router-dom'
import {
  useGetUserQuery,
  useGetUserByUsernameQuery,
} from '../slices/userApiSlice'
import {
  useGetTimelineQuery,
  useGetUserTimelineQuery,
} from '../slices/postApiSlice'
import Post from '../components/Post'
import { useState, useEffect } from 'react'

const UserScreen = () => {
  const { username } = useParams()
  const { data: user, isLoadingUser } = useGetUserByUsernameQuery(username)
  const { data: timeline } = useGetUserTimelineQuery(user?._id, {
    skip: !user?._id,
  })

  // Mock user data
  if (user) {
    console.log(user)
  }

  if (timeline) {
    console.log(timeline)
  }

  // Mock posts data
  // const posts = [
  //   {
  //     id: 1,
  //     game: 'The Legend of Zelda: Breath of the Wild',
  //     dateCompleted: '2022-05-15',
  //   },
  //   {
  //     id: 2,
  //     game: 'God of War',
  //     dateCompleted: '2022-04-20',
  //   },
  //   {
  //     id: 3,
  //     game: 'The Witcher 3: Wild Hunt',
  //     dateCompleted: '2022-03-10',
  //   },
  // ]

  return (
    // <div className='container mx-auto my-12 max-w-2xl'>
    //   {user && (
    //     <div className='bg-white p-6 rounded-lg shadow-md'>
    //       <h1 className='text-3xl font-bold mb-4'>{user.username}'s Profile</h1>
    //       <h2 className='text-2xl font-semibold mb-2'>Completed Games</h2>
    //       <ul className='space-y-4'>
    //         {posts.map((post) => (
    //           <li key={post.id} className='bg-gray-100 p-4 rounded-lg shadow'>
    //             <h3 className='text-xl font-bold'>{post.game}</h3>
    //             <p className='text-gray-700'>
    //               Completed on:{' '}
    //               {new Date(post.dateCompleted).toLocaleDateString()}
    //             </p>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
    <>
      {user && (
        <div className='container mx-auto py-12 flex justify-center'>
          <div>
            <h1 className='text-3xl font-bold mb-6'>
              {user.displayName}'s Completed Games
            </h1>
            {timeline && (
              <div className='space-y-4'>
                {timeline.map((post, index) => (
                  <Post key={index} {...post} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default UserScreen
