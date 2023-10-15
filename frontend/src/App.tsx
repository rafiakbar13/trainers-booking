import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomeLayout from './layout/HomeLayout'
import Home from './pages/Home'
import About from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Trainers from './pages/Trainers/Trainers'
import Services from './pages/Services'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <div>Not Found</div>,
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
        path: "services",
        element: <Services />
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
      <RouterProvider router={router} />
    </>
  )
}

export default App
