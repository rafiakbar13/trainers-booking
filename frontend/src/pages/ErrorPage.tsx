import _404 from "../assets/404.json";
import { Link } from "react-router-dom";
import Object404_1 from "../assets/404_1.png";
import Object404_2 from "../assets/404_2.png";
const ErrorPage = () => {
  return (
    <>
      <div className="relative">
        <img src={Object404_1} alt="" className="absolute right-0" />
        <img src={Object404_2} alt="" className="absolute" />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="font-bold text-gray-500 text-9xl">404</h1>
        <p className="text-2xl">Page not found</p>
        <p className="font-bold">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-8 py-2 mt-4 border border-gray-500 bg-secondary-500"
        >
          <button>Back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
