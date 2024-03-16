import benefit1 from "../../assets/benefit-1.webp";
import benefit2 from "../../assets/benefit-2.webp";
import benefit3 from "../../assets/benefit-3.webp";
import { BsFillCheckCircleFill } from "react-icons/bs";
const Benefits = () => {
  return (
    <section className="py-10 bg-gray-20 ">
      <article className="flex flex-col justify-between w-full max-w-5xl px-4 py-2 mx-auto md:flex-row md:gap-x-8">
        <div className="relative w-full h-auto my-12 md:w-2/3 md:h-96">
          <img
            className="w-full h-full  lg:w-96 lg:h-72  left-[-0.50px] top-0 lg:absolute rounded-xl object-cover"
            src={benefit1}
          />
          <img
            className="md:w-60 md:h-64 left-80 top-[87px] absolute rounded-xl object-cover hidden lg:block"
            src={benefit2}
          />
          <img
            className="absolute hidden object-cover h-48 md:h-52 md:-left-10 top-64 md:top-60 rounded-xl lg:block"
            src={benefit3}
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/3 gap-y-5">
          <p className="text-3xl font-bold md:text-6xl">
            Transform your physique with our trainer.
          </p>
          <span className="flex items-center gap-x-2">
            <BsFillCheckCircleFill className="inline-block text-lg text-primary-500" />
            <p>Increase Muscle and Strength</p>
          </span>
          <span className="flex items-center gap-x-2">
            <BsFillCheckCircleFill className="inline-block text-lg text-primary-500" />
            <p>Be Healthier than before</p>
          </span>
          <span className="flex items-center gap-x-2">
            <BsFillCheckCircleFill className="inline-block text-lg text-primary-500" />
            <p>Increase Stamina</p>
          </span>
        </div>
      </article>
    </section>
  );
};

export default Benefits;
