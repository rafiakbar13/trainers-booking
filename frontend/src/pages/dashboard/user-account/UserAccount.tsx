import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/AuthContext";
import UserBookings from "./UserBookings";
import Profile from "./Profile";
import Loading from "../../../components/Loading";
import { customFetch } from "../../../utils";

const UserAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const [user, setUser] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await customFetch.get("/api/v1/users/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data.data;
      setUser(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section>
      <div className="w-5/6 max-w-[1170px] px-5 mx-auto my-28">
        {loading && <Loading />}
        {!loading && (
          <div className="grid gap-10 md:grid-cols-3 mt-28">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primary-500">
                  <img
                    src={user.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-[18px] leading-7 text-gray-900 font-bold">
                  {user.name}
                </h3>
                <p className="text-black text-[15px] leading-6 font-medium">
                  {user.email}
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
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
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={` ${
                    tab === "bookings" && `bg-secondary-500`
                  } p-2 mr-5 px-5 rounded-md text-gray-950 font-semibold text-[16px] leading-7 border border-solid border-gray-500`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("setting")}
                  className={`${
                    tab === "setting" && `bg-secondary-500`
                  } py-2 px-5 rounded-md text-gray-950 font-semibold text-[16px] leading-7 border border-solid border-gray-500`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" ? <UserBookings /> : <Profile user={user} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserAccount;
