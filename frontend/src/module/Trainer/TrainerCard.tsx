// import Card from "../../components/Card";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import starIcon from "../../assets/Star.png";
// import { TrainersProps } from "../../types/Trainers";
import Badge from "../../components/Badge";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const TrainerCard = ({ data }: any) => {
  return (
    <Card className="h-auto mt-10 ">
      <CardBody className="p-0 overflow-visible">
        <Image
          shadow="sm"
          radius="none"
          width="100%"
          alt={data.name}
          className="object-cover w-full h-60 md:h-72 lg:h-80 xl:h-96"
          src={data.photo}
        />
      </CardBody>
      <CardFooter>
        <div className="flex-col w-full">
          <h1 className="mt-3 text-lg font-semibold text-gray-500 md:text-xl lg:mt-5">
            {data.name}
          </h1>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <Badge text={data.specialization} />
            <div className="flex items-center gap-x-1">
              <img src={starIcon} alt="" className="w-4 h-4 md:w-5 md:h-5" />
              <span>{data.totalRating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4">
            <div>
              <h3 className="text-sm font-semibold md:text-base ">
                + {data.totalMember} Member
              </h3>
            </div>
            <Link
              to={`/trainers/${data._id}`}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-secondary-400 hover:border-none "
            >
              <BsArrowRight className="w-6 h-5 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;
