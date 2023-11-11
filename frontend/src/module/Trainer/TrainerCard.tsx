import Card from '../../components/Card'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import starIcon from "../../assets/Star.png";
import { TrainersProps } from '../../types/Trainers';

const TrainerCard = ({ _id, name, specialization, avgRating, totalRating, photo, totalMember }: TrainersProps) => {
    return (
        <Card className='w-80 rounded-xl bg-white-400 shadow-lg'>
            <img src={photo} alt="" className='rounded-t-lg w-full h-96' />
            <div className='px-4 py-4'>
                <h1 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 font-semibold mt-3 lg:mt-5'>{name}</h1>
                <div className="flex items-center justify-between mt-2 lg:mt-4">
                    <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                        {specialization}
                    </span>
                    <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                            <img src={starIcon} alt="" />
                            {avgRating} /
                        </span>
                        <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                            {totalRating}
                        </span>
                    </div>
                </div>
                <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                            + {totalMember} patients
                        </h3>
                    </div>
                    <Link
                        to="/doctors"
                        className="w-[30px] h-[30px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-secondary-400 hover:border-none "
                    >
                        <BsArrowRight className="w-6 h-5 group-hover:text-white" />
                    </Link>
                </div>
            </div>
        </Card>
    )
}

export default TrainerCard