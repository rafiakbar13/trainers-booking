import React from "react";
// import avatar from "../../assets/images/avatar-icon.png";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
const FeedBack = ({ reviews, totalRating }: any) => {
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  return (
    <section className="my-[50px]">
      <div className="">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All Reviews ({totalRating})
        </h4>
        {reviews.map((review: any, index: number) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={review.user?.photo} alt="" className="w-full" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formatDate(review?.createdAt)}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">
                  {review?.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067ff" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        {!showFeedbackForm ? (
          <button
            className="w-1/2 px-4 py-2 mt-4 text-gray-500 transition duration-300 rounded-md bg-primary-300 hover:bg-primary-500"
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Feedback
          </button>
        ) : (
          <FeedbackForm />
        )}
      </div>
    </section>
  );
};

export default FeedBack;
