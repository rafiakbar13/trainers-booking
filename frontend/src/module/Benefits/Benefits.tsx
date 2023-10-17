import React from 'react'
import benefit1 from '../../assets/benefit-1.webp'
import benefit2 from '../../assets/benefit-2.webp'
import benefit3 from '../../assets/benefit-3.webp'
import { BsFillCheckCircleFill } from 'react-icons/bs'
const Benefits = () => {
    return (
        <section className='py-10 pb-0 bg-gray-20'>
            <article className='w-5/6 mx-auto flex justify-between  gap-x-36 mt-20'>
                <div>
                    <div className="w-96 h-96 relative">
                        <img className="w-96 h-72 left-[-0.50px] top-0 absolute rounded-xl object-cover" src={benefit1} />
                        <img className="w-60 h-64 left-60 top-[108px] absolute rounded-xl object-cover" src={benefit2} />
                        <img className=" h-52 left-2 top-72 absolute rounded-xl object-cover" src={benefit3} />
                    </div>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <p className=' text-6xl font-bold'>Transform your physique with our trainer.</p>
                    <span className='flex items-center gap-x-2 mt-5'>
                        <BsFillCheckCircleFill className='inline-block text-lg text-primary-500' />
                        <p> Increase Muscle and Strength</p>
                    </span>
                    <span className='flex items-center gap-x-2'>
                        <BsFillCheckCircleFill className='inline-block text-lg text-primary-500' />
                        <p>Be Healthier than before</p>
                    </span>
                    <span className='flex items-center gap-x-2'>
                        <BsFillCheckCircleFill className='inline-block text-lg text-primary-500' />
                        <p>Increase Stamina</p>
                    </span>
                </div>
            </article>
        </section>
    )
}

export default Benefits