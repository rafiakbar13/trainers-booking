import React from 'react'
import { trainers } from '../../constant/Trainer'
import TrainerCard from '../../module/Trainer/TrainerCard'
import Testimonial from '../../module/Testimonial/Testimonial'
const Trainers = () => {
    return (
        <>
            <section className="bg-gray-20">
                <div className="w-5/6 px-5 mx-auto text-center">
                    <div className='pt-28 pb-14'>
                        <h2 className="text-4xl font-semibold">Find A Trainer</h2>
                        <div className="max-w-[570px] mt-[30px] mx-auto bg-primary-100 rounded-md flex items-center justify-between">
                            <input
                                type="search"
                                className="w-full py-4 pl-4 pr-2 bg-transparent cursor-pointer focus:outline-none placeholder:text-gray-300"
                                placeholder="Search Doctor"
                            />
                            <button className="text-white bg-gray-500 py-[15px] px-[35px] rounded-md">Search</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-gray-20'>
                <div className='w-5/6 mx-auto  text-center'>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {trainers.map((trainer) => (
                            <TrainerCard key={trainer.id} {...trainer} />
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className=''>
                    <Testimonial />
                </div>
            </section>
        </>
    )
}

export default Trainers