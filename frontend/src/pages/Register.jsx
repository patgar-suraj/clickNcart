import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncregisteruser } from "../store/actions/userActions";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    dispatch(asyncregisteruser(user));
    navigate("/login");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(registerHandler)}
      className="flex flex-col w-full h-screen items-center justify-center px-5 py-24"
    >
      <div className="w-full md:w-[50vw] xl:w-[30vw] flex flex-col items-center justify-center gap-5 p-5  border-1 border-[#D4E80D] rounded-2xl">
        {/* username */}
        <div className="w-full flex flex-col items-start justify-center">
          <span className="text-[#D4E80D] text-[13px] pl-5">
            {" "}
            {errors.user && errors.user.message}
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
        <button className="relative bg-[#D4E80D] border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
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
