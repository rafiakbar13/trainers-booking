import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = React.useState<any>([]);
  const [formData, setFormData] = React.useState({});
  // reusable funtion for adding item

  const addItem = (key: any, item: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: [...prev[key], item],
    }));
  };

  //   Reusable input change funtion

  const handleReusableChangeFunc = (event: any, index: number, key: any) => {
    const { name, value } = event.target;

    setFormData((prev: any) => {
      const updateItems = [...prev[key]];

      updateItems[index][name] = value;

      return {
        ...prev,
        [key]: updateItems,
      };
    });
  };

  //   Reusable delete funtion

  const handleReusableDeleteFunc = (index: number, key: any) => {
    import React from "react";

    // ... other code ...

    const handleReusableDeleteFunc = (index: number, key: any) => {
      setFormData((prev: any) => {
        const updatedItems = Object.entries(prev[key]).filter(
          ([_, i]) => i !== index
        );
        return {
          ...prev,
          [key]: Object.fromEntries(updatedItems),
        };
      });
    };
  };

  const addExperiences = (e: any) => {
    e.preventDefault();
    addItem("experiences", {});
  };

  const addTimeSlots = (e: any) => {
    e.preventDefault();
    addItem("timeSlots", {});
  };

  return (
    <div>
      <h2 className="text-gray-800 font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="text-base text-gray-800">Name</p>
          <input
            type="text "
            name="name"
            defaultValue={user.name}
            placeholder="full name"
            className=""
          />
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-800">Email</p>
          <input
            type="text "
            name="email"
            defaultValue={user.name}
            placeholder="Email"
            className=""
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-800">phone</p>
          <input
            type="number"
            name="phone"
            defaultValue={user.phone}
            placeholder="Phone number"
            className=""
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-800">Bio</p>
          <input
            type="text"
            name="bio"
            defaultValue={user.bio}
            placeholder="Bio"
            className=""
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="text-base text-gray-600">Gender</p>
              <select
                name="gender"
                defaultValue={user.gender}
                className="py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <p className="text-base text-gray-600">Specialization</p>
              <select
                name="specialization"
                defaultValue={user.specialization}
                className="py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <p className="text-base text-gray-600">Ticket Price</p>
              <input
                type="number"
                name=""
                id=""
                placeholder="100"
                defaultValue={user.ticketPrice}
                className=""
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-600">Experiences</p>
          {user.experiences.map((experience: any, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-base text-gray-600">Starting date</p>
                  <input
                    type="date"
                    name="startingDate"
                    defaultValue={experience.startingDate}
                    className=""
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">End date</p>
                  <input
                    type="date"
                    name="endDate"
                    defaultValue={experience.endDate}
                    className=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-base text-gray-600">Positions</p>
                  <input
                    type="date"
                    name="position"
                    defaultValue={experience.position}
                    className=""
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">Hospital</p>
                  <input
                    type="date"
                    name="hospital"
                    defaultValue={experience.hospital}
                    className=""
                  />
                </div>
              </div>
              <button className="text-red-500">Add Experiences</button>
            </div>
          ))}
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-600">Time Slots</p>
          {user.timeSlots.map((item: any, index: number) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mb-[30px]">
                  <div>
                    <p className="text-base text-gray-600">Day</p>
                    <select
                      name="day"
                      value={item.day}
                      id=""
                      className="py-3.5"
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-base text-gray-600">Starting time</p>
                    <input
                      type="time"
                      name="startingTime"
                      defaultValue={item.startingTime}
                      className=""
                    />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Ending time</p>
                    <input
                      type="time"
                      name="endingTime"
                      defaultValue={item.endingTime}
                      className=""
                    />
                  </div>

                  <div>
                    <p className="text-base text-gray-600">Ending time</p>
                    <input
                      type="time"
                      name="endingTime"
                      defaultValue={item.endingTime}
                      className=""
                    />
                  </div>
                </div>
                <div>
                  <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
              <button className="text-red-500">Add Timeslot</button>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">About</p>
          <textarea
            name="about"
            id=""
            rows={10}
            placeholder="write about you"
            className=""
          >
            {user.about}
          </textarea>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {user.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img src={user.photo} alt="" className="w-full rounded-full" />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              {...register("photo", {
                required: true,
              })}
              type="file"
              id="customFile"
              //   onChange={handleFileChange}
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 flex items-center w-full h-full px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="bg-primary-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
