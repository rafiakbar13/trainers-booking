import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../../utils";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {};

const Profile = ({ data }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = React.useState<any>([]);
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<UpdateProfileSchemaType>({
  //   resolver: zodResolver(UpdateProfileSchema),
  // });

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

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    console.log(data);

    try {
      if (!selectedFile) {
        return toast.error("Please select an image");
      }

      const response = await customFetch.put(
        `/api/v1/trainer/${user._id}`,
        {
          ...data,
          photo: selectedFile,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Update Profile successfully");
      navigate("/");
      return response;
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="">
      <h2 className="text-gray-800 font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="text-base text-gray-800">Name</p>
          <input
            type="text "
            name="name"
            defaultValue={data.name}
            placeholder="full name"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-800">Email</p>
          <input
            type="text "
            name="email"
            defaultValue={data.email}
            placeholder="Email"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
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
            defaultValue={data.phone}
            placeholder="Phone number"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
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
            defaultValue={data.bio}
            placeholder="Bio"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="text-base text-gray-800">Gender</p>
              <select
                name="gender"
                defaultValue={data.gender}
                className="font-semibold text-[15px] leading-7 py-3.5 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <p className="text-base text-gray-800">Specialization</p>
              <select
                name="specialization"
                defaultValue={data.specialization}
                className="font-semibold text-[15px] leading-7 py-3.5 focus:outline-none"
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
                name="ticketPrice"
                id="ticketPrice"
                placeholder="100"
                defaultValue={data.ticketPrice}
                className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-600">Experiences</p>
          {/* {data.experience.map((experience: any, index: number) => (
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
          ))} */}
        </div>
        <div className="mb-5">
          <p className="text-base text-gray-600">Time Slots</p>
          {/* {data.timeSlots.map((item: any, index: number) => (
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
          ))} */}
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">About</p>
          <textarea
            name="about"
            id=""
            rows={10}
            placeholder="write about you"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          >
            {data.about}
          </textarea>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {user.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img src={user.photo} alt="" className="w-full rounded-full" />
            </figure>
          )}

          {/* <div className="relative w-[130px] h-[50px]">
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
          </div> */}
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
