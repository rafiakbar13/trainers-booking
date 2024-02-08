import React from "react";

const SidePanel = () => {
  return (
    <div className="p-3 rounded-md shadow-panelShadow lg:p-5">
      <div className="flex items-center justify-between">
        <p className="mt-0 font-semibold text__para">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          150.000
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="mt-0 font-semibold text__para text-headingColor">
          Available Time Slots
        </p>
        <ul className="mt-3">
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Sunday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              04:00 PM - 09:00 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Tuesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              04:00 PM - 09:00 PM
            </p>
          </li>
          <li className="flex items-center justify-between mb-2">
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              Wednesday
            </p>
            <p className="text-[15px] leading-6 text-textColor font-semibold">
              04:00 PM - 09:00 PM
            </p>
          </li>
        </ul>
      </div>

      <button className="w-full px-4 py-2 mt-4 text-gray-500 rounded-md bg-primary-300">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
