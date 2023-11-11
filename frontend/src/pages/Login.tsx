import React, { useContext } from 'react'
import LoginImg from '../assets/HomePageGraphic.png'
import Logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from "react-toastify";
import { authContext } from '../context/AuthContext'
import { HashLoader } from 'react-spinners'
const Login = () => {
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const { dispatch } = useContext(authContext)
    const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await customFetch.post('/api/v1/auth/login', formData)

            toast.success('Login Successfull')
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: response.data.data,
                    token: response.data.token,
                    role: response.data.data.role
                }
            })
            console.log(response);
            navigate('/')
            setLoading(false)
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
            setLoading(false)
        }
    }

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
                        <form onSubmit={onSubmit} className='flex flex-col items-center mt-4 gap-y-3 w-full'>
                            <input
                                type="text"
                                className="w-96 px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                placeholder="Email"
                                name='email'
                                onChange={handleInputChage}
                            />
                            <input
                                type="password"
                                className="w-96 px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                placeholder="Password"
                                name='password'
                                onChange={handleInputChage}
                            />
                            <button className='text-white bg-gray-500 py-[15px] px-[35px] rounded-md mt-4 w-96'>{loading ? <HashLoader size={35} color="#FF6B66" /> : "Login"}</button>
                        </form>
                        <p className='mt-10'>Not Registered Yet? <Link to="/register" className='text-gray-500 font-semibold'>Create an account</Link> </p>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Login
