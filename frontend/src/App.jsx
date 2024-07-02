import { useState } from 'react'
import LoginPage from './screens/LoginScreen'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <Navbar />
        <ToastContainer />
        <Outlet />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
