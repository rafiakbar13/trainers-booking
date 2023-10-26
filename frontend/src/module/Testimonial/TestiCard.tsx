import { Swiper, SwiperSlide } from 'swiper/react';
import { Testimonial } from '../../types/Testimonial'
import Card from '../../components/Card'
import { HiStar } from "react-icons/hi";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const TestiCard = ({ id, name, photo, review }: Testimonial) => {
    return (
        <Card className=''>
            <Swiper navigation={true} modules={[Navigation]} className="">
                <SwiperSlide className='p-12 '>
                    <div className="py-[30px] px-5 rounded-[13px]  bg-primary-500 shadow-lg">
                        <div className="flex items-center gap-[13px]">
                            <img src={photo} alt="" className='rounded-full w-12 h-12' />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    {name}
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((item, index) => (
                                        <HiStar
                                            key={index}
                                            className="w-[16px] h-[16px] text-secondary-500"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                            {review}
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='p-12 '>
                    <div className="py-[30px] px-5 rounded-[13px]  bg-primary-500 shadow-lg">
                        <div className="flex items-center gap-[13px]">
                            <img src={photo} alt="" className='rounded-full w-12 h-12' />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    {name}
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((item, index) => (
                                        <HiStar
                                            key={index}
                                            className="w-[16px] h-[16px] text-secondary-500"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                            {review}
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='p-12 '>
                    <div className="py-[30px] px-5 rounded-[13px]  bg-primary-500 shadow-lg">
                        <div className="flex items-center gap-[13px]">
                            <img src={photo} alt="" className='rounded-full w-12 h-12' />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    {name}
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((item, index) => (
                                        <HiStar
                                            key={index}
                                            className="w-[16px] h-[16px] text-secondary-500"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                            {review}
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='p-12 '>
                    <div className="py-[30px] px-5 rounded-[13px]  bg-primary-500 shadow-lg">
                        <div className="flex items-center gap-[13px]">
                            <img src={photo} alt="" className='rounded-full w-12 h-12' />
                            <div>
                                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                                    {name}
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    {[...Array(5)].map((item, index) => (
                                        <HiStar
                                            key={index}
                                            className="w-[16px] h-[16px] text-secondary-500"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                            {review}
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </Card>
    )
}

export default TestiCard