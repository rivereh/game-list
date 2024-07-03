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
import PrivateRoute from './components/PrivateRoute.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import UserScreen from './screens/UserScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<LandingScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/signup' element={<SignupScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/home' element={<HomeScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/search' element={<SearchScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/user/:userId' element={<UserScreen />} />
      </Route>
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
