import Post from '../components/Post'
import { useState, useEffect } from 'react'
import { useGetTimelineQuery } from '../slices/postApiSlice'

const HomeScreen = () => {
  const { data: timeline } = useGetTimelineQuery()

  const posts = [
    {
      username: 'PlayerOne',
      game: 'The Legend of Zelda',
      dateCompleted: '2023-06-28',
    },
    {
      username: 'GamerGirl',
      game: 'Super Mario Odyssey',
      dateCompleted: '2023-06-29',
    },
    { username: 'RetroRex', game: 'Pac-Man', dateCompleted: '2023-06-30' },
  ]

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>
      {timeline && (
        <div className='space-y-4'>
          {timeline.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeScreen
