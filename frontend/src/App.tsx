import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomeLayout from './layout/HomeLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Trainers from './pages/Trainers/Trainers'
import ErrorPage from './pages/ErrorPage'
import ProgramPage from './pages/Program'
import AuthProvider from 'react-auth-kit/AuthProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "trainers",
        element: <Trainers />
      },
      {
        path: "program",
        element: <ProgramPage />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Signup />
  }
])

function App() {
  return (
    <>
      <AuthProvider
        authType={'localstorage'}
        authName={'auth'}
      >
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
