import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContextProvider'
import Layout from './pages/Layout'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/user/signup",
          element: <SignUp />
        }
      ]
    }
  ])
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  )
}

export default App
