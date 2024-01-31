import React, { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
type Props = {};

const Tabs = ({ tab, setTab }: any) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md space-y-5">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? " text-gray-500"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-100 rounded-md py-3`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointment")}
          className={`${
            tab === "appointment"
              ? "text-gray-500"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-100 rounded-md py-3`}
        >
          Appointment
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "text-gray-500"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-100 rounded-md py-3`}
        >
          Settings
        </button>
        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-primary-300 p-3 text-[16px] leading-7 rounded-md"
          >
            Logout
          </button>
          <button className="w-full bg-red-500 p-3 text-[16px] leading-7 rounded-md mt-4">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
