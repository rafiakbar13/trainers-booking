import React from 'react'
type CardProps = {
    icon: JSX.Element
    program: string
    description: string
}

const Card = ({ icon, program, description }: CardProps) => {
    return (
        <article className='w-72 h-60 px-6 py-8 rounded-xl flex-col justify-start items-start gap-4 inline-flex bg-secondary-500'>
            <div className='w-8 h-8 text-2xl text-gray-500'>{icon}</div>
            <h3 className='text-gray-500 text-2xl font-semibold leading-normal'>{program}</h3>
            <p className='text-gray-500 text-sm font-normal leading-normal'>{description}</p>
        </article>
    )
}

export default Card