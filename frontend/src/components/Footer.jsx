import React from 'react'

const Footer = () => {
  return (
    <div className='border-2 h-56 grid grid-cols-3 bg-[#e6e1d6]'>
      <div className='flex flex-col'>
        <img className='w-64 h-24 border-2' src="" alt="logo" />
        <p>PartsShipper: Unleashing Innovation, Redefining Convenience – Your Ultimate Destination for Seamless Tech Exploration and Empowerment.</p>
        <span className='flex'><img src="" alt="gmail-logo" /><p>partsshipper@gmail.com</p></span>
      </div>
      <div className='flex gap-16 justify-center text-xl p-5'>
        <ul>
          <h1 className='font-semibold'>Sitemap</h1>
          <li>Product</li>
          <li>Services</li>
          <li>Article</li>
          <li>About Us</li>
        </ul>
        <ul>
          <h1 className='font-semibold'>Information</h1>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Contact</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div className='flex flex-col items-end p-5'>
        <div className='flex flex-col items-start gap-5'>
          <h1 className='text-lg font-bold'>Connect With Us</h1>
          <input className='rounded-3xl border-[1px] w-56 h-10 p-4' type="email" placeholder='Enter your email' />
          <div className='flex'>
            <img src="" alt="twitter" />
            <img src="" alt="instagram" />
            <img src="" alt="linkedin" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
