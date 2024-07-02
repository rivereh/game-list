const Features = () => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold mb-4'>Track Completed Games</h3>
            <p>Keep a detailed record of all the games you've completed.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold mb-4'>Share with Friends</h3>
            <p>Share your gaming achievements with your friends.</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold mb-4'>Discover New Games</h3>
            <p>
              Find new games to play based on your interests and completed
              games.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
