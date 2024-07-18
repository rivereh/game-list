import Post from '../components/Post'
import { useState, useEffect } from 'react'
import { useGetTimelineQuery } from '../slices/postApiSlice'

const HomeScreen = () => {
  const { data: timeline, refetch } = useGetTimelineQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className='container mx-auto flex justify-center py-12'>
      <div>
        <h1 className='mb-6 text-3xl font-bold'>Dashboard</h1>
        {timeline && (
          <div className='space-y-4'>
            {timeline.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
