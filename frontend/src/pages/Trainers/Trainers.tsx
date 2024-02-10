import React from "react";
import TrainerCard from "../../module/Trainer/TrainerCard";
import Testimonial from "../../module/Testimonial/Testimonial";
import { customFetch } from "../../utils";
import Loading from "../../components/Loading";

const Trainers = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [trainers, setTrainers] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [debounce, setDebounce] = React.useState("");

  const getTrainers = async () => {
    setLoading(true);
    try {
      const response = await customFetch.get(
        `/api/v1/trainers?name=${debounce}`
      );
      const result = await response.data.data;
      setTrainers(result);
      setSearchResults(result);
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

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleSearch = async () => {
    setQuery(query.trim());
  };

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };

  // Update search results when debounce changes
  React.useEffect(() => {
    const results = trainers.filter((trainer) =>
      trainer?.name.toLowerCase().includes(debounce.toLowerCase())
    );
    setSearchResults(results);
  }, [debounce, trainers]);

  return (
    <>
      <section className="bg-gray-20">
        <div className="w-5/6 px-5 mx-auto text-center">
          <div className="pt-28 pb-14">
            <h2 className="text-4xl font-semibold">Find A Trainer</h2>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-primary-100 rounded-md flex items-center justify-between">
              <input
                type="search"
                className="w-full py-4 pl-4 pr-2 bg-transparent cursor-pointer focus:outline-none placeholder:text-gray-300"
                placeholder="Search Trainer"
                value={query}
                onChange={handleQueryChange}
              />
              <button
                className="text-white bg-gray-500 py-[15px] px-[35px] rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-20">
        <div className="w-5/6 mx-auto text-center">
          {loading && !error && <Loading />}
          {error && !loading && <h1 className="text-center">Error</h1>}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {searchResults.map((trainer, i) => (
                <TrainerCard key={i} data={trainer} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="">
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Trainers;
