import { trainers } from '../../constant/Trainer'
import TrainerCard from './TrainerCard'


const TrainerList = () => {
    return (
        <section className='lg:mt-[180px] w-5/6 mx-auto'>
            <h1 className='text-5xl font-bold text-center'>Our Trainer</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-20 mb-24 '>
                {trainers.map((trainer) => (
                    <TrainerCard key={trainer.id} {...trainer} />
                ))}
            </div>
        </section>
    )
}

export default TrainerList