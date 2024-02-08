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
    photo: string;
    _id: string;
  };
}

const Profile: React.FC<Props> = ({ trainer }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<UpdateProfileSchemaType>({
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
      timeSlots: [
        {
          day: "",
          startingTime: "",
          endingTime: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: timeSlotFields,
    append: appendTimeSlot,
    remove: removeTimeSlots,
  } = useFieldArray({
    control,
    name: "timeSlots",
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

  const handleDelete = (index: number) => {
    if (index === 0) {
      return;
    }
    remove(index);
  };

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    console.log(data);
    // try {
    //   setIsLoading(true);
    //   const response = await customFetch.put(
    //     `/api/v1/trainers/${trainer._id}`,
    //     {
    //       ...data,
    //       photo: selectedFile || trainer.photo,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   setIsLoading(false);
    //   console.log(response);
    //   // toast.success("Profile updated successfully");
    //   // navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="">
      <h2 className="text-gray-800 font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <p className="text-base text-gray-800">Name</p>
          <input
            type="text"
            {...register("name")}
            defaultValue={trainer.name}
            placeholder="full name"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">Email</p>
          <input
            type="text "
            {...register("email")}
            defaultValue={trainer.email}
            placeholder="Email"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">phone</p>
          <input
            type="text"
            {...register("phone")}
            defaultValue={trainer.phone}
            placeholder="Phone number"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          />
        </div>

        <div className="mb-5">
          <p className="text-base text-gray-800">Bio</p>
          <input
            type="text"
            {...register("bio")}
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
                {...register("gender")}
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
                {...register("specialization")}
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

            <div className="mb-5">
              <p className="text-base text-gray-800">Ticket Price</p>
              <input
                type="number"
                {...register("ticketPrice")}
                defaultValue={trainer.ticketPrice}
                placeholder="Phone number"
                className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Experiences</p>
          {fields.map((experience: any, index: number) => (
            <div key={index} className="">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Starting date</p>
                  <input
                    type="date"
                    {...register(`experience.${index}.startingDate`)}
                    defaultValue={experience.startingDate}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">End date</p>
                  <input
                    type="date"
                    {...register(`experience.${index}.endDate`)}
                    defaultValue={experience.endDate}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-3">
                <div>
                  <p className="text-base text-gray-600">Positions</p>
                  <input
                    type="text"
                    {...register(`experience.${index}.position`)}
                    defaultValue={experience.position}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-600">Hospital</p>
                  <input
                    type="text"
                    {...register(`experience.${index}.hospital`)}
                    defaultValue={experience.hospital}
                    className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                  onClick={() => {
                    append({
                      startingDate: "",
                      endDate: "",
                      position: "",
                      hospital: "",
                    });
                  }}
                >
                  Add Experiences
                </button>
                <button
                  type="button"
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TimeSlots */}
        <div className="mb-5">
          <p className="mb-2 text-base text-gray-800">Time Slots</p>
          {timeSlotFields?.map((timeSlot: any, index: number) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mb-[30px] ">
                  <div>
                    <p className="text-base text-gray-600">Day</p>
                    <select
                      {...register(`timeSlots.${index}.day`)}
                      defaultValue={timeSlot.day}
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
                      {...register(`timeSlots.${index}.startingTime`)}
                      defaultValue={timeSlot.startingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <p className="text-base text-gray-600">Ending time</p>
                    <input
                      type="time"
                      {...register(`timeSlots.${index}.endingTime`)}
                      defaultValue={timeSlot.endingTime}
                      className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900  font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-5">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-500 rounded-md bg-primary-300"
                  onClick={() => {
                    appendTimeSlot({
                      day: "",
                      startingTime: "",
                      endingTime: "",
                    });
                  }}
                >
                  Add Timeslot
                </button>
                <button
                  type="button"
                  className="bg-red-600 p-2 rounded-full text-white text-[18px]  cursor-pointer"
                  onClick={() => removeTimeSlots(index)}
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
            {...register("about")}
            rows={10}
            placeholder="write about you"
            className="w-full px-4 py-2 border border-solid border-gray-500 rounded-md text-[16px] text-gray-900 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer mt-2"
          >
            {trainer.about}
          </textarea>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {trainer.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img
                src={previewURL || trainer.photo}
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
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
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
