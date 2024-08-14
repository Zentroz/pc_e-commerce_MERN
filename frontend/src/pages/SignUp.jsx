import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useForm } from 'react-hook-form'
import UserContext from '../context/UserContext.js'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await fetch("http://localhost:8000/user/register",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => { console.log(res.json()) })

  }

  const { user } = useContext(UserContext)

  return (
    <div className='flex justify-center'>
      <div className='bg-[#f8f6f2] h-[34rem] border-[1.5px] rounded-2xl flex flex-col justify-center gap-4 px-7 my-7'>
        <h1 className='text-2xl'>Sign Up</h1>
        <hr />
        <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-2'>
            <span className='firstname flex flex-col gap-2'>
              <label htmlFor="firstname">Firstname</label>
              <input className='h-12 rounded-3xl p-4' type="text" id='firstname' placeholder='Firstname' {...register("firstName", { required: true, maxLength: 18 })} />
            </span>
            <span className='lastname flex flex-col gap-2'>
              <label htmlFor="lastname">Lastname</label>
              <input className='h-12 rounded-3xl p-4' type="text" id='lastname' placeholder='Lastname' {...register("lastName", { required: true, maxLength: 18 })} />
            </span>
          </div>
          <div className='flex gap-2'>
            <span className='email flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input className='w-full h-12 rounded-3xl p-4' type="email" id='email' placeholder='Email' {...register("email", { required: true, maxLength: 20 })} />
            </span>
            <span className='username flex flex-col gap-2'>
              <label htmlFor="username">Username</label>
              <input className='w-full h-12 rounded-3xl p-4' type="text" id='username' placeholder='Username' {...register("userName", { required: true, minLength: 5, maxLength: 14 })} />
            </span>
          </div>
          <span className='password flex flex-col gap-2'>
            <label htmlFor="password">Password</label>
            <input className='w-[27rem] h-12 rounded-3xl p-4' type="password" id='password' placeholder='Password' {...register("password", { required: true, minLength: 8, maxLength: 40 })} />
          </span>
          <span className='isSeller flex gap-2'>
            <input type="checkbox" name="isSeller" id="isSeller" {...register("isSeller")} />
            <label htmlFor="isSeller">Want to be a seller?</label>
          </span>
          <span className='tac flex gap-2'>
            <input type="checkbox" name="tac" id="tac" {...register("tac")} />
            <label htmlFor="tac">By signing up I agree to the Terms & Conditions and Privacy Policy</label>
          </span>
          <button className='bg-red-400 rounded-3xl h-12 w-full'>Sign Up</button>
          {errors?.firstName?.type == "maxLength" && <span> Firstname length should not be more than 18 </span>}
          {errors?.lastName?.type == "maxLength" && <span> Lastname length should not be more than 18 </span>}
          {errors?.username?.type == "minLength" && <span> Username length should not be less than 5 </span>}
          {errors?.username?.type == "maxLength" && <span> Username length should not be more than 14 </span>}
        </form>

      </div>
    </div>
  )
}

export default SignUp