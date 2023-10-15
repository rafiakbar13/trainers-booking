import React from 'react'
import Card from '../../components/Card'
import { FaRunning } from 'react-icons/fa'
type Props = {}

const Program = (props: Props) => {
    return (
        <section className=' py-10 pb-0 bg-gray-20 md:h-full'>
            {/* section heading */}
            <div className='w-5/6 mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='relative text-center'>
                        <h2 className='absolute text-8xl text-opacity-10 text-gray-600 -top-9 -left-40'>Program</h2>
                        <h1 className='text-4xl font-bold'>Explore Our Program</h1>
                    </div>
                </div>
                {/* CARD */}
                <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                    <Card icon={<FaRunning />} program='Cardio Strenght' description='Cardio workouts focus on increasing your heart rate and breathing. Activities like running, cycling, or swimming are part of this program.' />
                </div>
            </div>
        </section>
    )
}

export default Program