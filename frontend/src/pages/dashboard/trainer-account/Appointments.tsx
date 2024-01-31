import React from "react";
import { formatDate } from "../../../utils/formatDate";

type Props = {};

const Appointments = ({ appointments }: any) => {
  return (
    <table className="w-full text-sm text-left text-gray-400">
      <thead className="text-xs text-gray-600 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Payments
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked On
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((appointment: any) => (
          <tr key={appointment._id}>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={appointment.user.photo}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="pl-3">
                <span className="text-base font-semibold">
                  {appointment.user.name}
                </span>
                <span className="text-gray-600">{appointment.user.email}</span>
              </div>
            </th>
            <td className="px-6 py-4">{appointment.user.gender}</td>
            <td className="px-6 py-4">
              {appointment.isPaid && (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full mr-2 bg-green-500"></div>
                  Paid
                </div>
              )}
              {!appointment.isPaid && (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full mr-2 bg-red-500"></div>
                  UnPaid
                </div>
              )}
            </td>
            <td className="px-6 py-4">{appointment.ticketPrice}</td>
            <td className="px-6 py-4">{formatDate(appointment.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
