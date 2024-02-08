import React, { ChangeEvent, useState } from "react";
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
import { uploadImageToCloudinary } from "../../../utils/uploadCloudinary";

interface Experience {
  startingDate: string;
  endDate: string;
  position: string;
  hospital: string;
}

interface TimeSlot {
  day: string;
  startingTime: string;
  endingTime: string;
}

interface Props {
  trainer: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    gender: string;
    specialization: string;
    ticketPrice: number;
    experience: Experience[];
    timeSlots: TimeSlot[];
    about: string;
    photo: string;
    _id: string;
  };
}

const Profile: React.FC<Props> = ({ trainer }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    experiences: [
      {
        startingDate: "",
        endDate: "",
        position: "",
        hospital: "",
      },
    ],
    timeSlots: [
      {
        day: "",
        startingTime: "",
        endingTime: "",
      },
    ],
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const handleInputChange = (event: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const addItem = (key: keyof typeof formData, item: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: [...(prev[key] || []), item],
    }));
  };

  const handleReusableChangeFunc = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof typeof formData
  ) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [key]: prev[key].map((item: any, i: number) =>
        i === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleReusableDeleteFunc = (
    index: number,
    key: keyof typeof formData
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: prev[key].filter((_: any, i: number) => i !== index),
    }));
  };

  const addExperiences = () => {
    addItem("experiences", {
      startingDate: "",
      endDate: "",
      position: "",
      hospital: "",
    });
  };

  const deleteExperiences = (event: any, index: number) => {
    event.preventDefault();
    if (index === 0) return;
    handleReusableDeleteFunc(index, "experiences");
  };

  const handleExperiencesChange = (event: any, index: any) => {
    handleReusableChangeFunc(event, index, "experiences");
  };

  const addTimeSlots = (e: any) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const deleteTimeSlots = (event: any, index: number) => {
    event.preventDefault();
    if (index === 0) return;
    handleReusableDeleteFunc(index, "timeSlots");
  };

  const handleTimeSlotsChange = (event: any, index: any) => {
    handleReusableChangeFunc(event, index, "timeSlots");
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setFormData((prev: any) => ({
        ...prev,
        photo: data.url,
      }));
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await customFetch.put(
        `/api/v1/trainers/${trainer._id}`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);

      // toast.success("Update Profile successfully");
      // navigate("/");
      // return res;
    } catch (error) {
      console.log("error", error);
    }
    // try {
    //   if (!selectedFile) {
    //     return toast.error("Please select an image");
    //   }
    //   const response = await customFetch.put(
    //     `/api/v1/trainer/${trainer._id}`,
    //     {
    //       ...formData,
    //       photo: selectedFile,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   toast.success("Update Profile successfully");
    //   navigate("/");
    //   return response;
    // } catch (error: any) {
    //   setIsLoading(false);
    //   console.log(error);
    // }
  };

  return (
    <div className="">
      <h2 className="text-gray-800 font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="" onSubmit={onSubmit}>
        <div className="mb-5">
          <p className="text-base text-gray-800">Name</p>
          <input
            type="text"
            name="name"
            defaultValue={trainer.name}
            placeholder="full name"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
            // {...register("name")}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">Email</p>
          <input
            type="text "
            // {...register("email")}
            name="email"
            onChange={handleInputChange}
            defaultValue={trainer.email}
            placeholder="Email"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">phone</p>
          <input
            type="number"
            // {...register("phone")}
            name="phone"
            onChange={handleInputChange}
            defaultValue={trainer.phone}
            placeholder="Phone number"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">Bio</p>
          <input
            type="text"
            // {...register("bio")}
            name="bio"
            onChange={handleInputChange}
            defaultValue={trainer.bio}
            placeholder="Bio"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="text-base text-gray-800">Gender</p>
              <select
                // {...register("gender")}
                name="gender"
                onChange={handleInputChange}
                defaultValue={trainer.gender}
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
                // {...register("specialization")}
                name="specialization"
                onChange={handleInputChange}
                defaultValue={trainer.specialization}
                className="font-semibold text-[15px] leading-7 py-3.5 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="bodyWeight">Body Weight</option>
                <option value="fitness">Fitness</option>
                <option value="kardio">Meditasi</option>
                <option value="rehabilitasi">Rehabilitasi</option>
                <option value="yoga">Yoga</option>
              </select>
            </div>

            <div>
              <p className="text-base text-gray-800">Ticket Price</p>
              <input
                type="number"
                // {...register("ticketPrice")}
                name="ticketPrice"
                onChange={handleInputChange}
                id="ticketPrice"
                placeholder="100"
                min={0}
                defaultValue={trainer.ticketPrice}
                className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Experiences</p>
          {formData.experiences?.map((experience: any, index: number) => (
            <div key={index} className="">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Starting date</p>
                  <input
                    type="date"
                    // {...register("startingDate")}
                    defaultValue={experience.startingDate}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">End date</p>
                  <input
                    type="date"
                    // {...register("endDate")}
                    defaultValue={experience.endDate}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  <p className="text-base text-gray-600">Positions</p>
                  <input
                    type="text"
                    // {...register("position")}
                    defaultValue={experience.position}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">Hospital</p>
                  <input
                    type="text"
                    // {...register("hospital")}
                    defaultValue={experience.hospital}
                    onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={addExperiences}
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                >
                  Add Experiences
                </button>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  onClick={(e) => deleteExperiences(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Time Slots</p>
          {formData.timeSlots?.map((timeSlot: any, index: number) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mb-[30px] ">
                  <div>
                    <p className="text-base text-gray-600">Day</p>
                    <select
                      name="day"
                      id=""
                      className="py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
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
                      // defaultValue={item.startingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Ending time</p>
                    <input
                      type="time"
                      name="endingTime"
                      // defaultValue={item.endingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={addTimeSlots}
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                >
                  Add Timeslot
                </button>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  onClick={(e) => deleteTimeSlots(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">About</p>
          <textarea
            name="about"
            onChange={handleInputChange}
            id=""
            rows={10}
            placeholder="write about you"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          >
            {trainer.about}
          </textarea>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              {...register("photo", {
                required: true,
              })}
              type="file"
              id="customFile"
              onChange={handleFileChange}
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 flex items-center w-full h-full px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-primary-300  font-semibold rounded-lg truncate cursor-pointer"
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
            {isSubmitting ? (
              <HashLoader className="text-primary-500" size={20} />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

import React, { ChangeEvent, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../../utils";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageToCloudinary } from "../../../utils/uploadCloudinary";

interface Experience {
  startingDate: string;
  endDate: string;
  position: string;
  hospital: string;
}

interface TimeSlot {
  day: string;
  startingTime: string;
  endingTime: string;
}

interface Props {
  trainer: {
    name: string;
    email: string;
    phone: string;
    bio: string;
    gender: string;
    specialization: string;
    ticketPrice: string;
    experience: Experience[];
    timeSlots: TimeSlot[];
    about: string;
    photo: FileList | undefined;
    _id: string;
  };
}

const Profile = ({ trainer }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<any>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      bio: trainer.bio,
      photo: trainer.photo,
      gender: trainer.gender,
      specialization: trainer.specialization,
      ticketPrice: trainer.ticketPrice,
      experience: [
        {
          startingDate: "",
          endDate: "",
          position: "",
          hospital: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setPreviewURL(data.url);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setPreviewURL(fileReader.result as string);
      };
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    // try {
    //   if (!selectedFile) {
    //     return toast.error("Please select an image");
    //   }
    //   setIsLoading(true);
    //   const response = await customFetch.put(
    //     `/api/v1/trainer/${trainer._id}`,
    //     {
    //       ...formData,
    //       photo: selectedFile,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   toast.success("Update Profile successfully");
    //   navigate("/");
    //   return response;
    // } catch (error: any) {
    //   setIsLoading(false);
    //   console.log(error);
    // }
  };

  return (
    <div className="">
      <h2 className="text-gray-800 font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-5">
          <p className="text-base text-gray-800">Name</p>
          <input
            type="text"
            {...register("name")}
            defaultValue={trainer.name}
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        {/* Email */}
        <div className="mb-5">
          <p className="text-base text-gray-800">Email</p>
          <input
            type="text"
            {...register("email")}
            defaultValue={trainer.email}
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        {/* Phone */}
        <div className="mb-5">
          <p className="text-base text-gray-800">Phone</p>
          <input
            type="number"
            {...register("phone")}
            defaultValue={trainer.phone}
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        {/* Bio */}
        <div className="mb-5">
          <p className="text-base text-gray-800">Bio</p>
          <input
            type="text"
            {...register("bio")}
            defaultValue={trainer.bio}
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            {/* Gender */}
            <div>
              <p className="text-base text-gray-800">Gender</p>
              <select
                {...register("gender")}
                // name="gender"
                // onChange={handleInputChange}
                defaultValue={trainer.gender}
                className="font-semibold text-[15px] leading-7 py-3.5 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Specialization */}
            <div>
              <p className="text-base text-gray-800">Specialization</p>
              <select
                {...register("specialization")}
                // name="specialization"
                // onChange={handleInputChange}
                defaultValue={trainer.specialization}
                className="font-semibold text-[15px] leading-7 py-3.5 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="bodyWeight">Body Weight</option>
                <option value="fitness">Fitness</option>
                <option value="kardio">Meditasi</option>
                <option value="rehabilitasi">Rehabilitasi</option>
                <option value="yoga">Yoga</option>
              </select>
            </div>

            {/* Ticket Price */}
            {/* <div>
              <p className="text-base text-gray-800">Ticket Price</p>
              <input
                type="number"
                {...register("ticketPrice")}
                // name="ticketPrice"
                // onChange={handleInputChange}
                id="ticketPrice"
                placeholder="100"
                min={0}
                defaultValue={trainer.ticketPrice}
                className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
              />
            </div> */}
          </div>
        </div>

        {/* Experiences */}
        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Experiences</p>
          {fields.map((experience: any, index: number) => (
            <div key={index} className="">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Starting date</p>
                  <input
                    type="date"
                    {...(register(`experience[${index}].startingDate`) as any)}
                    defaultValue={`${experience.startingDate}`}
                    // onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">End date</p>
                  <input
                    type="date"
                    {...(register(`experience[${index}].endDate`) as any)}
                    defaultValue={`${experience.endDate}`}
                    // onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  <p className="text-base text-gray-600">Positions</p>
                  <input
                    type="text"
                    {...(register(`experience[${index}].position`) as any)}
                    defaultValue={`${experience.position}`}
                    // onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">Hospital</p>
                  <input
                    type="text"
                    {...(register(`experience[${index}].hospital`) as any)}
                    defaultValue={`${experience.hospital}`}
                    // onChange={(e) => handleExperiencesChange(e, index)}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <button
                  // onClick={addExperiences}
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                >
                  Add Experiences
                </button>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  // onClick={(e) => deleteExperiences(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Time Slots */}
        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Time Slots</p>
          {trainer.timeSlots?.map((timeSlot: any, index: number) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mb-[30px] ">
                  <div>
                    <p className="text-base text-gray-600">Day</p>
                    <select
                      // name="day"
                      {...register("day")}
                      id=""
                      className="py-3.5"
                      // onChange={(e) => handleTimeSlotsChange(e, index)}
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
                      // name="startingTime"
                      {...register("startingTime")}
                      // defaultValue={item.startingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Ending time</p>
                    <input
                      type="time"
                      // name="endingTime"
                      {...register("endingTime")}
                      // defaultValue={item.endingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-5">
                <button
                  // onClick={addTimeSlots}
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                >
                  Add Timeslot
                </button>
                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  // onClick={(e) => deleteTimeSlots(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* About */}
        <div className="mb-5">
          <p className="text-base text-gray-800">About</p>
          <textarea
            {...register("about")}
            rows={10}
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>
        {/* Photo */}
        <div className="flex items-center gap-3 mb-5">
          {trainer.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img
                src={previewURL || trainer.photo[0].name}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              {...register("photo", {
                required: true,
              })}
              type="file"
              id="customFile"
              onChange={handleFileChange}
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 flex items-center w-full h-full px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-primary-300  font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-7">
          <button
            type="submit"
            className="bg-primary-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            {isSubmitting ? (
              <HashLoader className="text-primary-500" size={20} />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
