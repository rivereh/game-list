import Hero from '../components/Hero.tsx'
import Features from '../components/Features.tsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../slices/authSlice'

const LandingScreen = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)
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
