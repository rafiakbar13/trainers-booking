import React from "react";
import { formatDate } from "../../utils/formatDate";
const TrainerAbout = ({ name, experiences, about }: any) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] font-semibold flex items-center gap-2">
          About Of
          <span className="">{name}</span>
        </h3>
        <p className="">{about}</p>
      </div>

      {/* <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {experiences.map((item: any, index: number) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formatDate(item.startingDate)} - {formatDate(item.endDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.degree}
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.institute}
              </p>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item: any, index: number) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formatDate(item.startingDate)} - {formatDate(item.endDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.company}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainerAbout;
