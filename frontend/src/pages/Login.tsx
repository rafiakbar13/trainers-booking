import React from 'react'
import LoginImg from '../assets/HomePageGraphic.png'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
type Props = {}

const Login = (props: Props) => {
    return (
        <section className='bg-gray-20'>
            <article className='mx-auto w-5/6 flex items-center justify-center h-screen'>
                <div className='flex bg-white shadow-xl w-[1920px] rounded-lg'>
                    <div>
                        <img src={LoginImg} alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <Link to="/" className=''>
                            <img src={Logo} alt="" className='px-4 pb-5' />
                        </Link>
                        <h2 className='text-2xl font-semibold'>Login to your acount</h2>
                        <form className='flex flex-col items-center mt-4 gap-y-3 w-full'>
                            <input
                                type="text"
                                className="w-96 px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                className="w-96 px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                placeholder="Password"
                            />
                            <button className='text-white bg-gray-500 py-[15px] px-[35px] rounded-md mt-4 w-96'>Login</button>
                        </form>
                        <p className='mt-10'>Not Registered Yet? <Link to="/register" className='text-gray-500 font-semibold'>Create an account</Link> </p>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Login
