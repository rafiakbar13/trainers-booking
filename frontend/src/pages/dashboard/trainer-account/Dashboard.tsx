import React, { useEffect } from "react";
import Loading from "../../../components/Loading";
import ErrorPage from "../../ErrorPage";
import { customFetch } from "../../../utils";
import Tabs from "./Tabs";
import { PiWarningOctagon } from "react-icons/pi";
import StarIcon from "../../../assets/Star.png";
import TrainerAbout from "../../Trainers/TrainerAbout";
import Profile from "./Profile";
type Props = {};

const Dashboard = (props: Props) => {
  const [user, setUser] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [tab, setTab] = React.useState("overview");
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await customFetch.get("/api/v1/trainers/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.data.data;
      setUser(result);
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="max-w-[1170px] px-5 mx-auto">
      {loading && !error && <Loading />}
      {error && !loading && <ErrorPage />}

      {!loading && !error && (
        <div className="grid lg:grid-cols-3 lg:gap-[50px]">
          <Tabs tab={tab} setTab={setTab} />
          <div className="lg:col-span-2">
            {user.isApproved === "pending" && (
              <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50">
                <PiWarningOctagon className="flex-shrink-0 w-5 h-5" />
                <span className="sr-only">info</span>
                <div className="ml-3 text-sm font-medium">
                  To get approval please complete your profile. We&apos;ll
                  review manually and approve within 3days
                </div>
              </div>
            )}
            <div className="mt-8">
              {tab === "overview" && (
                <div>
                  <div className="flex items-center gap-4 mb-10">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img src={user?.photo} alt="avatar" className="w-full" />
                    </figure>
                    <div className="bg-[#CCF0F3] text-primary-300 py-1 px-4 lg:py-2 lg:px-6 rounded-full text-[12px] leading-4 lg:leading-6 font-semibold">
                      <span>{user.specialization}</span>
                    </div>
                    <h3 className="text-[22px] leading-9 font-bold text-gray-900">
                      Rafi
                    </h3>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-gray-950 text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                        <img src={StarIcon} alt="" />
                        4.5
                      </span>

                      <span className="text-gray-400 text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                        (233)
                      </span>
                    </div>

                    <p className="text-sm font-[15px] lg:max-w-[390px] leading-6">
                      Doctor bio
                    </p>
                  </div>
                  <TrainerAbout
                    name={user.name}
                    experiences={user.experience}
                    about={user.about}
                  />
                </div>
              )}
              {tab === "overview" && <div>appointment</div>}
              {tab === "overview" && <Profile />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
