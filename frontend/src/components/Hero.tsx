import { useState } from 'react'
import HomePageText from '../assets/HomePageText.png'
import Video from './VideoPopup'
import HomePageGraphic from '../assets/HomePageGraphic.png'
import SponsorRedbull from '../assets/SponsorRedbull.png'
import SponsorForbes from '../assets/SponsorForbes.png'
import SponsorFortune from '../assets/SponsorFortune.png'
import { AiFillPlayCircle } from 'react-icons/ai'
import { motion } from "framer-motion";

const Hero = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const videoUrl = "https://www.youtube.com/embed/UqFzWx8X5AM";

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <section id="home" className="gap-16 py-10 pb-0 bg-gray-20 md:h-full">
            <motion.div className="items-center justify-around w-5/6 mx-auto md:flex md:flex-row md:h:5/6">
                <div className="mt-32 md:basis-3/5">
                    <motion.div
                        className=" md:-mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <div className="relative">
                            <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
                                <img alt="home-page-text" src={HomePageText} />
                            </div>
                        </div>
                        <p className="mt-8 text-base">
                            Discover your path to fitness with our comprehensive platform, designed to guide and support you on your wellness journey. Whether you're an exercise enthusiast or just starting out, we're here to assist you in finding the perfect fitness routine, expert trainers, and resources tailored to your needs.
                        </p>
                    </motion.div>
                    {/* Action button */}
                    <motion.div
                        className="flex items-center gap-8 mt-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <button className="px-8 py-2 font-medium transition duration-300 rounded-lg shadow-md bg-secondary-500 hover:bg-primary-500 hover:text-white">
                            Start Training
                        </button>
                        <div className="relative flex items-center">
                            <button
                                className="items-center justify-center p-2 rounded-full shadow-xl bg-primary-500"
                                onClick={openModal}
                            >
                                <AiFillPlayCircle className="w-5 h-5 text-white" />
                            </button>
                            <Video
                                isOpen={isOpen}
                                videoUrl={videoUrl}
                                onClose={closeModal}
                            />
                            <p className="px-4">Watch Video</p>
                        </div>
                    </motion.div>
                </div>
                <div className="flex justify-center basis-3/5 md:z-5 md:ml-40 md:justify-items-end">
                    <img src={HomePageGraphic} alt="home-pageGraphic" />
                </div>
            </motion.div>
            {/* Sponsor */}
            <div className="w-full h-[120px] bg-primary-100 py-10 mt-8">
                <div className="mx-auto md:w-5/6">
                    <div className="flex items-center justify-around md:w-3/5 md:gap-8">
                        <img src={SponsorRedbull} alt="Rebull" className="object-cover" />
                        <img src={SponsorForbes} alt="Forbes" className="object-cover" />
                        <img src={SponsorFortune} alt="Fortune" className="object-cover" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero