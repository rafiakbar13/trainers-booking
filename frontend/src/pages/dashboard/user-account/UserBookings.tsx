import React, { useEffect, useState } from "react";
import { customFetch } from "../../../utils";
import TrainerCard from "../../../module/Trainer/TrainerCard";
import Loading from "../../../components/Loading";
type Props = {};

const UserBookings = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getTrainers = async () => {
    setIsLoading(false);
    try {
      const response = await customFetch.get(
        "/api/v1/users/appointments/my-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLoading(false);
      const data = response.data.data;
      setAppointments(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : null}
      {!isLoading && appointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {appointments.map((trainer: any) => (
            <TrainerCard key={trainer._id} {...trainer} />
          ))}
        </div>
      ) : (
        <h2 className="mt-5 text-lg font-semibold leading-7 text-center text-gray-500">
          You did't book any trainer yet
        </h2>
      )}
    </div>
  );
};

export default UserBookings;
