import React from 'react'
import Hero from '../components/Hero'
import Program from '../module/program/Program'
import Benefits from '../module/Benefits/Benefits'
import Facilities from '../module/Facilities/Facilities'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className=''>
            <Hero />
            <Program />
            <Facilities />
            <Benefits />
        </div>
    )
}

export default Home