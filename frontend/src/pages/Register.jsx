import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncregisteruser } from "../store/actions/userActions";
import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [baseImg, setBaseImg] = useState("");

  const profileImg = watch("image");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileImg && profileImg[0]) {
      const file = profileImg[0];

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImg(reader.result);
      };
      reader.readAsDataURL(file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImg]);

  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.image = baseImg;

    dispatch(asyncregisteruser(user));
    navigate("/login");
    toast.success("🎉 You have registered successfully!")
    reset();
    setPreview(null);
    setBaseImg("");
  };

  return (
    <form
      onSubmit={handleSubmit(registerHandler)}
      className="flex flex-col w-full items-center justify-center px-5 pt-12 pb-24"
    >
      <div className="w-[120px] h-[120px] mb-10 relative flex items-center justify-center rounded-full overflow-hidden border-2 border-[#D4E80D]">
        <input
          {...register("image")}
          type="file"
          id="fileUpload"
          className="hidden"
        />
        <label
          htmlFor="fileUpload"
          className="outline-0 w-full cursor-pointer text-center"
        >
          {preview ? (
            <img
              src={preview}
              alt="profile"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          ) : (
            <HiOutlineUser className="w-full text-6xl text-white/50 text-center" />
          )}
        </label>
      </div>

      <div className="w-full md:w-[50vw] xl:w-[30vw] flex flex-col items-center justify-center gap-5 p-5  border-1 border-[#D4E80D] rounded-2xl">
        {/* user image */}
        {/* <div className="w-full flex flex-col items-start justify-center">
          <input
            {...register("image")}
            type="file"
            id="fileUpload"
            className="hidden"
            placeholder="profile picture"
          />
          <label
            htmlFor="fileUpload"
            className="outline-0 w-full cursor-pointer border-b-2 border-l-2 p-3 text-white/50 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-thin text-sm focus:bg-gradient-to-r hover:from-[#D4E80D] hover:to-[#D4E80D] hover:border-[#302f30] hover:border-4 hover:text-black"
          >
            {" "}
            Profile Picture{" "}
          </label>
        </div> */}
        {/* username */}
        <div className="w-full flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.username && errors.username.message}
          </span>
          <input
            {...register("username", { required: "[ Username is required ]" })}
            type="text"
            placeholder="john-doe"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-r focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>
        {/* email */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.email && errors.email.message}
          </span>
          <input
            {...register("email", { required: "[ Email is required ]" })}
            type="email"
            placeholder="johndoe@gmail.com"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>
        {/* email */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.password && errors.password.message}
          </span>
          <input
            {...register("password", { required: "[ Password is required ]" })}
            type="password"
            placeholder="********"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* button */}
        <button className="relative cursor-pointer bg-[#D4E80D] border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
          REGISTER
        </button>

        <div className="flex items-center justify-center gap-2">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="text-[#D4E80D] underline underline-offset-2"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
