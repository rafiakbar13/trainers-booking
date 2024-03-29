import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { uploadImageToCloudinary } from "../utils/uploadCloudinary";
import { useForm } from "react-hook-form";
import { SignupSchema, SignupSchemaType } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  const navigate = useNavigate();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setPreviewURL(data.url);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setPreviewURL(fileReader.result as null);
      };
    }
  };

  const onSubmit = async (data: SignupSchemaType) => {
    setIsLoading(true);
    try {
      if (!selectedFile) {
        return toast.error("Please select an image");
      }
      const response = await customFetch.post("/api/v1/auth/register", {
        ...data,
        photo: selectedFile,
      });
      setIsLoading(false);
      toast.success("Account created successfully");
      navigate("/login");
      return response;
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="">
      <div className="w-5/6 mx-auto">
        <div className="flex items-center justify-center h-screen">
          <div className="grid grid-cols-1 mx-auto bg-white rounded-lg shadow-lg w-96">
            {/* SIGNUP FORM */}
            <div className="h-auto px-5 py-10 rounded-lg ">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-primaryColor">account</span>
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Fullname"
                    className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                  />
                  {errors.name?.message && (
                    <p className="text-red-500 text-[14px]">{`${errors.name.message}`}</p>
                  )}
                </div>
                <div className="mb-5">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-primary-500 font-[400] focus:outline-none focus:border-primary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                  />
                  {errors.email?.message && (
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
                  {errors.password?.message && (
                    <p className="text-red-500 text-[14px]">{`${errors.password.message}`}</p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-5">
                  <label
                    htmlFor=""
                    className="text-headingColor font-bold text-[16px] leading-7"
                  >
                    Are you a:
                    <select
                      {...register("role", {
                        required: true,
                      })}
                      id="role"
                      className="font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    >
                      <option value="member">Member</option>
                      <option value="trainer">Trainer</option>
                    </select>
                  </label>

                  <label htmlFor="" className="font-bold text-[16px] leading-7">
                    Gender
                    <select
                      {...register("gender", { required: true })}
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
                      <img
                        src={previewURL}
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
                      className="absolute top-0 left-0 flex items-center w-full h-full px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                    >
                      Upload Photo
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white bg-gray-500 py-[15px] px-[35px] rounded-md mt-4 w-full"
                >
                  {isLoading ? (
                    <HashLoader size={35} color="#FF6B66" />
                  ) : (
                    "Signup"
                  )}
                </button>
                <div>
                  <p className="mt-5 text-center ">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-gray-500">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
