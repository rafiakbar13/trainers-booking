import { ProgramData } from "../../constant/Program";
import ProgramCard from "./ProgramCard";

const Program = () => {
  return (
    <section className="h-full ">
      {/* section heading */}
      <div className="w-5/6 py-10 pb-0 mx-auto ">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h2 className="absolute text-gray-600 text-8xl text-opacity-10 -top-9 -left-16 md:-left-40">
              Program
            </h2>
            <h1 className="text-4xl font-bold">Explore Our Program</h1>
          </div>
        </div>
        {/* CARD */}
        <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3">
          {ProgramData.map((program, index) => (
            <ProgramCard
              key={index}
              icon={program.icon}
              program={program.program}
              description={program.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
