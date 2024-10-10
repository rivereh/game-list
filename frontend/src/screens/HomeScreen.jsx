import Post from '../components/Post'
import { useState, useEffect } from 'react'
import { useGetTimelineQuery } from '../slices/postApiSlice'

const HomeScreen = () => {
  const { data: timeline, refetch } = useGetTimelineQuery()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (timeline) {
      setPosts(timeline)
    }
  }, [timeline])

  useEffect(() => {
    refetch()
  }, [refetch])

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
  }

  return (
    <div className='container mx-auto flex justify-center py-12'>
      <div>
        <h1 className='mb-6 text-3xl font-bold'>Dashboard</h1>
        {posts && (
          <div className='space-y-4'>
            {posts.map((post, index) => (
              <Post key={index} {...post} onPostDeleted={handlePostDeleted} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
