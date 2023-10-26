import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { uploadImageToCloudinary } from "../utils/uploadCloudinary";
import { useForm } from 'react-hook-form'
import { SignupSchema, SignupSchemaType } from "../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";


const Signup: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema),
    });

    const navigate = useNavigate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFile(e.target.files[0]);
        setPreviewURL(URL.createObjectURL(e.target.files[0]));
    };

    const onSubmit = async (data: SignupSchemaType) => {
        console.log(data);
        try {
            if (!selectedFile) {
                return toast.error("Please select an image");
            }

            const imageUrl = await uploadImageToCloudinary(selectedFile);
            console.log(imageUrl);

            const response = await customFetch.post("/api/v1/auth/register", {
                ...data,
                photo: imageUrl.url,
            });
            console.log(response);
            toast.success("Account created successfully");
            navigate("/login");
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <section className="px-5 xl:px-0">
            <div className="w-5/6 mx-auto">
                <div className="grid grid-cols-1 ">
                    {/* SIGNUP FORM */}
                    <div className="py-10 rounded-lg lg:pl-16 h-96">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an <span className="text-primaryColor">account</span>
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                <input
                                    {...register("fullname")}
                                    type="text"
                                    placeholder="Fullname"
                                    className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                />
                                {errors.fullname && <p className="text-red-500 text-[14px]">{`${errors.fullname.message}`}</p>}
                            </div>
                            <div className="mb-5">
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"
                                />
                                {errors.email && <p className="text-red-500 text-[14px]">{`${errors.email.message}`}</p>}
                            </div>
                            <div className="mb-5">
                                <input
                                    {...register("password")}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-solid border-gray-500 rounded-md text-[16px] text-secondary-400 font-[400] focus:outline-none focus:border-secondary-500 leading-7 placeholder:text-gray-50 cursor-pointer"

                                />
                                {errors.password && <p className="text-red-500 text-[14px]">{`${errors.password.message}`}</p>}
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
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                    >
                                        <option value="patient">Member</option>
                                        <option value="doctor">Trainer</option>
                                    </select>
                                </label>

                                <label
                                    htmlFor=""
                                    className="text-headingColor font-bold text-[16px] leading-7"
                                >
                                    Gender
                                    <select
                                        {...register("gender", { required: true })}
                                        id="gender"
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </label>
                            </div>

                            <div className="flex items-center gap-3 mb-5">
                                {selectedFile && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                                    <img src={previewURL} alt="" className="w-full rounded-full" />
                                </figure>}

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
                            <button type="submit" disabled={isSubmitting} className='text-white bg-gray-500 py-[15px] px-[35px] rounded-md mt-4 w-full'>{isSubmitting ? <HashLoader size={35} color="#FF6B66" /> : "Signup"}</button>
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                >
                                    Signup
                                </button>
                                <div>
                                    <p className="mt-5 text-center ">
                                        Already have an account?{" "}
                                        <Link to="/login" className="font-semibold text-gray-500">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
