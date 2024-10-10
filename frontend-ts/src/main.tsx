import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen.tsx'
import SignupScreen from './screens/SignupScreen.tsx'
import LandingScreen from './screens/LandingScreen.tsx'
import HomeScreen from './screens/HomeScreen.tsx'
import SearchScreen from './screens/SearchScreen.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import ProfileScreen from './screens/ProfileScreen.tsx'
import UserScreen from './screens/UserScreen.tsx'

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
        <Route path='/user/:username' element={<UserScreen />} />
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
