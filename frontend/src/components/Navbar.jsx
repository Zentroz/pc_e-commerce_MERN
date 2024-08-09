import React from 'react'

const Navbar = () => {
  return (
    <div className='border-b-[1px] grid grid-cols-3 h-20'>
      <div className='flex justify-start items-center p-4'>left</div>
      <div className='flex justify-center items-center p-4'>
        <ul className='flex gap-5 text-xl text-nowrap'>
          <li>Home</li>
          <li>Shop</li>
          <li>Accessories</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className='flex justify-end items-center p-4'>right</div>
    </div>
  )
}

export default Navbar
