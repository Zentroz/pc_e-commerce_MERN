import React from 'react'
import Navbar from '../components/Navbar'
import banner1 from '../../public/img/temp_banner1.png'
import rtx from '../../public/img/rtx4080-dual.webp'
import ProductCard from '../components/ProductCard'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='featured-banner w-screen h-96 my-5'>
        <img className='size-full' src={banner1} alt='featured-image' />
      </div>
      <div className='featured-products flex flex-col gap-2 mx-5'>
        <h1 className='text-6xl font-semibold'>Picks for you</h1>
        <ul className='flex gap-5 text-2xl'>
          <li>Most Popular</li>
          <li>Newest</li>
        </ul>
        <ProductCard image={rtx} title='RTX 4080 Dual Graphic Card 24gb video memory' rating="5" />
      </div>
    </div>
  )
}

export default Home
