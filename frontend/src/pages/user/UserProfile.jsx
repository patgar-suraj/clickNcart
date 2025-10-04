import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
import { MdOutlineShoppingCart } from "react-icons/md";
import {
  asynclogoutuser,
  asyncUpdateUser,
} from "../../store/actions/userActions";
import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";

const UserProfile = () => {
  const {
    userReducer: { userData },
  } = useSelector((state) => state);

  // update product
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      password: userData?.password || "",
    },
  });

  // Reset form when userData changes
  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username || "",
        email: userData.email || "",
        password: userData.password || "",
      });
    }
  }, [userData, reset]);

  const [preview, setPreview] = useState(userData?.image || null);
  const watchedImage = watch("image");

  useEffect(() => {
    if (
      watchedImage &&
      watchedImage.length > 0 &&
      watchedImage[0] instanceof File
    ) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
    if (userData?.image && typeof userData.image === "string") {
      setPreview(userData.image);
    }
  }, [watchedImage, userData]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toBase = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const updateUserHandler = async (user) => {
    try {
      const updatedUser = { ...user };

      if (
        user.image &&
        user.image.length > 0 &&
        user.image[0] instanceof File
      ) {
        updatedUser.image = await toBase(user.image[0]);
      } else {
        updatedUser.image = userData?.image ?? null;
      }

      await dispatch(asyncUpdateUser(userData.id, updatedUser));

      toast.success("📝 Your profile has been updated!");
    } catch (error) {
      console.log("Update failed", error);
      toast.error("Failed to update profile!");
    }
  };

  // const deleteHandler = () => {
  //   if (window.confirm("Are you sure you want to delete your account?")) {
  //     navigate("/");
  //   }
  // };
  const logOutHandler = () => {
    dispatch(asynclogoutuser());
    toast.success("👋 You have been logged out!");
    navigate("/");
  };

  return userData ? (
    <div className="w-full flex flex-col items-center justify-center md:gap-10 px-5 pb-24">
      <div className="w-full flex items-center justify-between gap-3 px-5 md:px-0 py-5 lg:pt-9 md:pb-10 xl:pb-14">
        <Link to="/">
          <FiArrowLeft className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]" />
        </Link>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
          Profile
        </h2>
        {/* cart */}
        <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
      </div>

      <form
        onSubmit={handleSubmit(updateUserHandler)}
        className="w-full md:w-[60vw] xl:w-[40%] flex flex-col items-center justify-center gap-5 p-5  border-1 border-[#D4E80D] rounded-4xl"
      >
        {/* image preview */}
        {/* user image input */}
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

        {/* user name */}
        <div className="w-full flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.username && errors.username.message}
          </span>
          <input
            {...register("username", {
              required: "[ username is required ]",
            })}
            type="text"
            placeholder="username"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-r focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* user email */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.email && errors.email.message}
          </span>
          <input
            {...register("email", {
              required: "[ email is required ]",
            })}
            type="email"
            placeholder="email"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* user password */}
        <div className="w-full  flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.password && errors.password.message}
          </span>
          <input
            {...register("password", {
              required: "[ password is required ]",
            })}
            type="password"
            placeholder="password"
            className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
          />
        </div>

        {/* button */}
        <div className="w-full gap-5 flex items-center justify-center">
          {/* update */}
          <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
            UPDATE
          </button>
          {/* delogoutlete */}
          <button
            onClick={logOutHandler}
            className="relative bg-[#e80d0d] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
          >
            LOGOUT
          </button>
        </div>
      </form>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default UserProfile;
