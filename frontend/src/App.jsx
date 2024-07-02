import { useState } from 'react'
import LoginPage from './screens/LoginScreen'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
