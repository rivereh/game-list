import { useParams } from 'react-router-dom'
import {
  useGetUserQuery,
  useGetUserByUsernameQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../slices/userApiSlice'
import {
  useGetTimelineQuery,
  useGetUserTimelineQuery,
} from '../slices/postApiSlice'
import Post from '../components/Post'
import { useState, useEffect } from 'react'
import OpenAI from 'openai'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const UserScreen = () => {
  const { username } = useParams()
  const { data: user, refetch: fetchUser } = useGetUserByUsernameQuery(username)

  const {
    data: timeline,
    refetch,
    itFetching: isFetchingTimeline,
  } = useGetUserTimelineQuery(user?._id, {
    skip: !user?._id,
  })
  const [posts, setPosts] = useState([])
  const [hasFetched, setHasFetched] = useState(false)

  const [followUserApiCall] = useFollowUserMutation()
  const [unfollowUserApiCall] = useUnfollowUserMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (timeline) {
      setPosts(timeline)
    }
  }, [timeline])

  useEffect(() => {
    fetchUser()
  }, [username, fetchUser])

  useEffect(() => {
    if (!isFetchingTimeline && user?._id && !hasFetched) {
      refetch()
      setHasFetched(true) // Set flag to true after the first fetch
    }
  }, [refetch, user?._id, isFetchingTimeline, hasFetched])

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
  }

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_GPT_KEY,
    dangerouslyAllowBrowser: true,
  })

  async function getGPT() {
    const gamesList = timeline.map((game) => {
      return game.gameName
    })

    console.log(gamesList.toString())

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            "You will recommend five games based off an array that is sent by the user. You will respond with a json object with the following key value pairs. 'gameName' will have the name of the recommended game as the key and 'reason' will provide a description of how it relates to the games that have been sent as it's value",
        },
        {
          role: 'user',
          content: gamesList.toString(),
        },
      ],
      model: 'gpt-4o-mini',
    })
    console.log(completion.choices[0])
  }

  const handleFollow = async () => {
    try {
      await followUserApiCall(user._id).unwrap()
      toast.success('User followed')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await unfollowUserApiCall(user._id).unwrap()
      toast.success('User unfollowed')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

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
        <div className='container mx-auto flex justify-center py-12'>
          <div>
            <div className='flex items-center justify-between'>
              <h1 className='mb-6 text-3xl font-bold'>
                {user.displayName}'s Completed Games
              </h1>
              {userInfo._id !== user._id && (
                <>
                  {!user.followers.includes(userInfo._id) ? (
                    <button
                      onClick={handleFollow}
                      className='h-10 rounded bg-blue-400 px-4 text-white hover:bg-blue-600'
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={handleUnfollow}
                      className='h-10 rounded bg-blue-400 px-4 text-white hover:bg-blue-600'
                    >
                      Unfollow
                    </button>
                  )}
                </>
              )}
            </div>
            {posts && (
              <div className='space-y-4'>
                {posts.map((post, index) => (
                  <Post
                    key={index}
                    {...post}
                    onPostDeleted={handlePostDeleted}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={getGPT}>Get Recs</button>
    </>
  )
}

export default UserScreen
