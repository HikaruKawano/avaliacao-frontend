import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Login from './router/auth/login/Login.tsx'
import Register from './router/auth/register/Register.tsx'

import Home from './router/home/home.tsx'


// const [isSignedIn, setIsSignedIn] = useState('false')



const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'home',
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
