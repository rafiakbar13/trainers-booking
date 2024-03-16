// import { trainers } from "../../constant/Trainer";
import React from "react";
import TrainerCard from "./TrainerCard";
import { customFetch } from "../../utils";
import Loading from "../../components/Loading";
const TrainerList = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [trainers, setTrainers] = React.useState([]);

  const getTrainers = async () => {
    setLoading(true);
    try {
      const response = await customFetch.get("/api/v1/trainers");
      const result = await response.data.data;
      setTrainers(result);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  React.useEffect(() => {
    getTrainers();
  }, []);

  return (
    <>
      {loading && !error && <Loading />}
      {error && !loading && <h1 className="text-center">Error</h1>}
      {!loading && !error && (
        <section className="w-5/6 py-24 mx-auto ">
          <div className="relative">
            <h2 className="absolute text-gray-600 text-8xl text-opacity-10 -top-9 -left-16 md:-left-40">
              Trainer
            </h2>
            <h1 className="text-5xl font-bold">Our Trainer</h1>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 ">
            {trainers.map((trainer, i) => (
              <TrainerCard key={i} data={trainer} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default TrainerList;
