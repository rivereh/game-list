const Hero = () => {
  return (
    <section className='bg-gray-900 py-20 text-white'>
      <div className='container mx-auto text-center'>
        <h1 className='mb-4 text-4xl font-bold md:text-6xl'>
          Track Your Games
        </h1>
        <p className='mb-8 text-xl md:text-2xl'>
          Keep track of all the games you have completed and share your
          achievements with friends!
        </p>
        <button className='mr-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
          Get Started
        </button>
        <button className='rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-900'>
          Learn More
        </button>
      </div>
    </section>
  )
}

export default Hero
