import Hero from '../components/Hero'
import Features from '../components/Features'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo])

  return (
    <div>
      <Hero />
      <Features />
    </div>
  )
}
export default LandingScreen
