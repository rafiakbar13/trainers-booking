import Card from "../../components/Card";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import starIcon from "../../assets/Star.png";
import { TrainersProps } from "../../types/Trainers";
import Badge from "../../components/Badge";

const TrainerCard = ({ data }: any) => {
  console.log(data);

  return (
    <Card className="bg-white w-72 h-72 rounded-xl">
      <img src={data.photo} alt="" className="w-full h-full rounded-t-lg " />
      <div className="px-4 py-4 bg-white shadow-lg">
        <h1 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 font-semibold mt-3 lg:mt-5">
          {data.name}
        </h1>
        <div className="flex items-center justify-between mt-2 lg:mt-4">
          <Badge text={data.specialization} />
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
              <img src={starIcon} alt="" />
              {data.avgRating} /
            </span>
            <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
              {data.totalRating}
            </span>
          </div>
        </div>
        <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
          <div>
            <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
              + {data.totalMember} Member
            </h3>
          </div>
          <Link
            to={`/trainers/${data._id}`}
            className="w-[30px] h-[30px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-secondary-400 hover:border-none "
          >
            <BsArrowRight className="w-6 h-5 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TrainerCard;
