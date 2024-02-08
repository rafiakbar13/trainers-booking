import React from "react";
import { set } from "react-hook-form";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";
import { HashLoader } from "react-spinners";
const FeedbackForm = () => {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [reviews, setReviews] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!rating || !reviews) {
        setLoading(false);
        toast.error("Please fill all fields");
        return;
      }

      const response = await customFetch.post(
        `/api/v1/trainers/${id}/reviews`,
        {
          rating,
          reviews,
        }
      );
      const result = await response.data.data;
      setLoading(false);
      toast.success("Review added successfully");
      setRating(0);
      setReviews("");
      console.log(result);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
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
                    ? "text-yellowColor"
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
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions
        </h3>
        <textarea
          rows={5}
          className="border border-solid border=[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          placeholder="write your message"
          onChange={(e) => setReviews(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn" onClick={handleSubmitReview}>
        {!loading ? <HashLoader size={25} /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
