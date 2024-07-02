import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen.jsx'
import SignupScreen from './screens/SignupScreen.jsx'
import LandingScreen from './screens/LandingScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import SearchScreen from './screens/SearchScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<LandingScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/signup' element={<SignupScreen />} />
      <Route path='/home' element={<HomeScreen />} />
      <Route path='/search' element={<SearchScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
