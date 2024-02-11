import React from "react";
import { convertCurrency } from "../../utils/convertCurrency";
import { convertTime } from "../../utils/convertTime";
import { customFetch } from "../../utils";

const SidePanel = ({ trainerId, ticketPrice, timeslots }: any) => {
  const bookingHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await customFetch.post(
        `/api/v1/bookings/checkout-session/${trainerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.session.url) {
        window.location.href = response.data.session.url;
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 rounded-md shadow-2xl lg:p-8">
      <div className="flex items-center justify-between">
        <p className="mt-0 text-xl font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {convertCurrency(ticketPrice)}
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="mt-0 font-semibold text__para text-headingColor">
          Available Time Slots
        </p>
        <ul className="mt-3">
          {timeslots?.map((item: any, index: number) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="w-full px-4 py-2 mt-4 text-gray-500 transition duration-300 rounded-md bg-primary-300 hover:bg-primary-500"
        onClick={bookingHandler}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
