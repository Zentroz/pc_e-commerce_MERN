import { Outlet } from 'react-router-dom'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './layout.css'

const Layout = () => {
  return (
    <>
      <div className='container flex flex-col shrink'>
        <Navbar />
        <Outlet />
        <Footer />
      </div >
    </>
  )
}

export default Layout