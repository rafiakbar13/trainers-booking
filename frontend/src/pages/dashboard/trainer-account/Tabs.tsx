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
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-white text-primary-100"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-300 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointment")}
          className={`${
            tab === "appointment"
              ? "bg-white text-primary-100"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-300 rounded-md`}
        >
          Appointment
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-white text-primary-100"
              : "bg-transparent text-gray-800"
          } w-full mt-0 bg-primary-300 rounded-md`}
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
