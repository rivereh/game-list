const Hero = () => {
  return (
    <section className='bg-gray-900 text-white py-20'>
      <div className='container mx-auto text-center'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>
          Track Your Games
        </h1>
        <p className='text-xl md:text-2xl mb-8'>
          Keep track of all the games you have completed and share your
          achievements with friends!
        </p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
          Get Started
        </button>
        <button className='bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded'>
          Learn More
        </button>
      </div>
    </section>
  )
}

export default Hero
