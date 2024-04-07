import Hero from "../components/Hero";
import Program from "../module/program/Program";
import Benefits from "../module/Benefits/Benefits";
import Facilities from "../module/Facilities/Facilities";
import TrainerList from "../module/Trainer/TrainerList";
import Faqs from "../module/Faqs/Faqs";
import Testimonial from "../module/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <Program />
      <Facilities />
      <Benefits />
      <TrainerList />
      <Faqs />
      <Testimonial />
    </>
  );
};

export default Home;
