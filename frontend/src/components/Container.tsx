import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className='w-full mx-auto text-gray-500 max-w-7xl font-dmsans'>{children}</div>
    )
}

export default Container