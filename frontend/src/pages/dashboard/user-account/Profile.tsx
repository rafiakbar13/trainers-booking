import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../../utils";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { uploadImageToCloudinary } from "../../../utils/uploadCloudinary";
import { useForm } from "react-hook-form";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from "../../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const Profile = ({ user }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    console.log(data);

    try {
      if (!selectedFile) {
        return toast.error("Please select an image");
      }

      const response = await customFetch.put(
        `/api/v1/users/${user._id}`,
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
    <div className="my-10 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <input
            {...register("name")}
            defaultValue={user.name}
            type="text"
            placeholder="Fullname"
            className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
          />
          {errors.name && (
            <p className="text-red-500 text-[14px]">{`${errors.name.message}`}</p>
          )}
        </div>
        <div className="mb-5">
          <input
            {...register("email")}
            defaultValue={user.email}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
          />
          {errors.email && (
            <p className="text-red-500 text-[14px]">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="mb-5">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
          />
          {errors.password && (
            <p className="text-red-500 text-[14px]">{`${errors.password.message}`}</p>
          )}
        </div>

        <div className="flex items-center mb-5">
          <label htmlFor="" className="font-bold text-[16px] leading-7">
            Gender
            <select
              {...register("gender")}
              defaultValue={user.gender}
              id="gender"
              className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-3 mb-5">
          {selectedFile && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid flex items-center justify-center">
              <img src={previewURL} alt="" className="w-full rounded-full" />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              {...register("photo")}
              type="file"
              id="customFile"
              onChange={handleFileChange}
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 flex items-center w-full h-full px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-secondary-400 font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-gray-500 py-[15px] px-[35px] rounded-md mt-4 w-full"
        >
          {isSubmitting ? (
            <HashLoader size={35} color="#FF6B66" />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
