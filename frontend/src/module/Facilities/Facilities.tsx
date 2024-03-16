import { facilities } from "../../constant/Facilities";
import FacilitiesItem from "./FacilitiesItem";
import { motion } from "framer-motion";
import BenefitsPageGraphic from "../../assets/BenefitsPageGraphic.png";

const Facilities = () => {
  return (
    <section className="py-10 pb-0 bg-gray-20">
      <article className="w-5/6 mx-auto mt-20">
        <div>
          <h1 className="text-3xl font-bold basis-3/5 font-montserrat">
            MORE THAN JUST GYM.
          </h1>
          <p className="my-5 text-lg">
            We provide world class fitness equipment, trainers and classes to
            get you to your ultimate fitness goals with ease. We provide true
            care into each and every member.
          </p>
        </div>
        <motion.div
          className="items-center justify-between gap-8 mt-5 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
        >
          {facilities.map((facility) => (
            <FacilitiesItem
              key={facility.title}
              icon={facility.icon}
              title={facility.title}
              description={facility.description}
            />
          ))}
        </motion.div>
        <div className="items-center justify-between gap-20 mt-16 md:mt-28 md:flex">
          <img src={BenefitsPageGraphic} alt="" className="md:w-1/2" />
          <div className="">
            <div className="relative">
              <div className=" before:absolute before:content-abstractwaves before:-top-20 md:before:-left-15 before:-left-10 before:z-[-1] mt-20">
                <motion.div>
                  <h1 className="text-3xl font-bold basis-3/5 font-montserrat ">
                    MILLIONS OF HAPPY MEMBERS GETTING
                    <span className="text-primary-500"> FIT</span>
                  </h1>
                </motion.div>
              </div>
            </div>
            <motion.div>
              <p className="my-5">
                a testament to the incredible success of our fitness community.
                Join the movement and embark on a transformative journey towards
                a healthier, stronger you. Our dedicated members have
                experienced remarkable results, and now it's your turn to reap
                the benefits.
              </p>
              <p>
                At our core, we believe that a fit and vibrant life is within
                reach for everyone. That's why millions of individuals, just
                like you, have chosen us as their trusted fitness companion.
                With our state-of-the-art facilities, expert trainers, and an
                uplifting community, you'll find the perfect environment to
                unlock your full potential
              </p>
            </motion.div>
            <div className="relative mt-12">
              <div className="before:absolute before:content-sparkles before:right-8 before:-bottom-10">
                <button className="px-8 py-2 font-medium transition duration-300 rounded-lg bg-secondary-500 hover:bg-primary-500 hover:text-white">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Facilities;
