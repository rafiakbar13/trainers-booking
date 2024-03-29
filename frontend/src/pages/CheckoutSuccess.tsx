import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="h-screen bg-gray-100">
      <div className="p-6 bg-white md:mx-auto">
        <svg></svg>
        <div className="text-center">
          <h3 className="text-base font-semibold text-center text-gray-500 md:text-2xl">
            Payment Done
          </h3>
          <p className="my-2 text-gray-600">
            Thank You for completing your secure online payment
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to={"/"}
              className="px-12 py-3 font-semibold text-white bg-secondary-400"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
