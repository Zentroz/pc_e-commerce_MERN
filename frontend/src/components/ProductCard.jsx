import React from 'react'

const ProductCard = (props) => {
  return (
    <div className='border-[1px] h-[28rem] w-96 rounded-xl flex flex-col items-center text-center'>
      <div className="image h-64 w-80">
        <img className='size-full' src={props.image} alt="product-image" />
      </div>
      <h1 className='title text-xl'>{props.title}</h1>
      <h1 className='rating text-xl'>{props.rating}</h1>
    </div>
  )
}

export default ProductCard
