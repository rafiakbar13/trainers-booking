import React from 'react'
import Hero from '../components/Hero'
import Program from '../module/program/Program'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className=''>
            <Hero />
            <Program />
        </div>
    )
}

export default Home