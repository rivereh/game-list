const Features = () => {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold md:text-4xl'>
          Features
        </h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-2xl font-bold'>Track Completed Games</h3>
            <p>Keep a detailed record of all the games you've completed.</p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-2xl font-bold'>Share with Friends</h3>
            <p>Share your gaming achievements with your friends.</p>
          </div>
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h3 className='mb-4 text-2xl font-bold'>Discover New Games</h3>
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
