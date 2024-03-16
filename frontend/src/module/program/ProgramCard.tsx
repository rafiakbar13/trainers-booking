import Card from "../../components/Card";
import { ProgramProps } from "../../types/Program";

const ProgramCard = ({ icon, program, description }: ProgramProps) => {
  return (
    <Card className="inline-flex flex-col items-start justify-start w-full gap-4 px-6 py-8 rounded-xl bg-secondary-500">
      <div className="w-8 h-8 text-2xl text-gray-500">{icon}</div>
      <h3 className="text-2xl font-semibold leading-normal text-gray-500">
        {program}
      </h3>
      <p className="text-sm font-normal leading-normal text-gray-500">
        {description}
      </p>
    </Card>
  );
};

export default ProgramCard;
