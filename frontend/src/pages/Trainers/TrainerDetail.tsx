import React, { useState, useEffect } from "react";
import starIcon from "../../assets/Star.png";
import TrainerAbout from "./TrainerAbout";
import FeedBack from "./Feedback";
import SidePanel from "./SidePanel";
import { customFetch } from "../../utils";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import Badge from "../../components/badge";

const TrainerDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trainer, setTrainer] = useState({
    _id: "",
    name: "",
    experience: [],
    about: "",
    photo: "",
    specialization: "",
    averageRating: 0,
    totalRating: 0,
    bio: "",
    reviews: [],
    ticketPrice: 0,
    timeSlots: [],
  });
  const { id } = useParams();

  useEffect(() => {
    const getTrainers = async () => {
      setLoading(true);
      try {
        const response = await customFetch.get(`/api/v1/trainers/${id}`);
        const result = response.data.data;
        setTrainer(result);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    getTrainers();
  }, [id]);

  if (loading && !error) {
    return <Loading />;
  }

  if (error && !loading) {
    return <div>Error</div>;
  }

  return (
    <section className="mt-28">
      {!loading && !error && (
        <div className="max-w-[1170px] px-5 mx-auto">
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5 mb-10">
                <figure className="max-w-[180px] max-h-[180px]">
                  <img
                    src={trainer?.photo}
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </figure>
                <div>
                  <Badge text={trainer?.specialization} />
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {trainer?.name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {trainer.averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-headingColor">
                      ({trainer.totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    {trainer?.bio}
                  </p>
                </div>
              </div>
              <div className="mt-[100px] border-b border-solid border-primary-300">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`${
                    activeTab === "about" &&
                    "border-b border-solid border-gray-500"
                  } py-2 px-5 mr-5 text-[16px] leading-7  font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`${
                    activeTab === "feedback" &&
                    "border-b border-solid border-gray-500"
                  } py-2 px-5 mr-5 text-[16px] leading-7  font-semibold`}
                >
                  Feedback
                </button>
              </div>
              <div className="mt-[50px]">
                {activeTab === "about" ? (
                  <TrainerAbout
                    name={trainer.name}
                    experiences={trainer.experience}
                    about={trainer.about}
                  />
                ) : (
                  <FeedBack
                    reviews={trainer.reviews}
                    totalRating={trainer.totalRating}
                  />
                )}
              </div>
            </div>

            <div>
              <SidePanel
                trainerId={trainer._id}
                ticketPrice={trainer.ticketPrice}
                timeslots={trainer.timeSlots}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrainerDetails;
