import React from "react";

import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";
import { HashLoader } from "react-spinners";
const FeedbackForm = () => {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [reviewText, setReviewText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Please fill all fields");
        return;
      }

      const response = await customFetch.post(
        `/api/v1/trainers/${id}/reviews`,
        {
          rating,
          reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      toast.success("Review added successfully");
      setRating(0);
      setReviewText("");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form action="" className="">
      <div className="">
        <h3 className="text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellow-500"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[24px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions
        </h3>
        <textarea
          rows={5}
          className="border border-solid border=[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          placeholder="write your message"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-1/2 px-4 py-2 mt-4 text-gray-500 transition duration-300 rounded-md bg-primary-300 hover:bg-primary-500"
        onClick={handleSubmitReview}
      >
        {loading ? <HashLoader size={25} /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
