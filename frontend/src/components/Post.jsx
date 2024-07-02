const Post = ({ username, game, dateCompleted }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-2'>{username}</h2>
      <p className='text-gray-700'>
        <strong>Game:</strong> {game}
      </p>
      <p className='text-gray-700'>
        <strong>Date Completed:</strong>{' '}
        {new Date(dateCompleted).toLocaleDateString()}
      </p>
    </div>
  )
}

export default Post
