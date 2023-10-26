import React from 'react'
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { testimonial } from '../../constant/Testimonial';
import TestiCard from './TestiCard';
const Testimonial = () => {
    return (
        <section className=' bg-gray-20'>
            <article className='w-5/6 mx-auto '>
                <div className='pt-20 flex justify-between w-12/12 gap-x-10'>
                    <div className='relative basis-5/12'>
                        <h2 className='absolute text-gray-600 text-8xl text-opacity-10 -top-9 -left-40'>Testimonial</h2>
                        <h1 className='text-4xl font-bold'>What Member says about us</h1>
                        <AvatarGroup radius='full' isBordered className='flex justify-start mt-20'>
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                        </AvatarGroup>
                    </div>
                    <div className='basis-7/12 overflow-hidden'>
                        <TestiCard {...testimonial[0]} />
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Testimonial