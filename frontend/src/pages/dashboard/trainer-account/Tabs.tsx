import React, { useContext } from "react";

import { authContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TABS } from "../../../constant/Menu";
import { FloatingNav } from "../../../components/ui/floating-navbar";

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
      <div className="lg:hidden">
        <FloatingNav navItems={TABS} tab={tab} setTab={setTab} />
      </div>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-md items-center h-max rounded-md space-y-5">
        {TABS.map((item, index) => (
          <button
            onClick={() => setTab(`${item.tab}`)}
            key={index}
            className={`${
              tab === `${item.tab}`
                ? " text-gray-500"
                : "bg-transparent text-gray-800"
            } w-full mt-0 bg-primary-100 rounded-md py-3`}
          >
            {item.name}
          </button>
        ))}

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

//  <button
//           onClick={() => setTab("overview")}
//           className={`${
//             tab === "overview"
//               ? " text-gray-500"
//               : "bg-transparent text-gray-800"
//           } w-full mt-0 bg-primary-100 rounded-md py-3`}
//         >
//           Overview
//         </button>
//         <button
//           onClick={() => setTab("appointment")}
//           className={`${
//             tab === "appointment"
//               ? "text-gray-500"
//               : "bg-transparent text-gray-800"
//           } w-full mt-0 bg-primary-100 rounded-md py-3`}
//         >
//           Appointment
//         </button>
//         <button
//           onClick={() => setTab("settings")}
//           className={`${
//             tab === "settings"
//               ? "text-gray-500"
//               : "bg-transparent text-gray-800"
//           } w-full mt-0 bg-primary-100 rounded-md py-3`}
//         >
//           Settings
//         </button>
