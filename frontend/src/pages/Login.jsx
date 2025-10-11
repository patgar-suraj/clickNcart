import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloginuser } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiClothesline } from "react-icons/gi";

const Login = () => {
  const user = useSelector((state) => state.userReducer.userData);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (user) => {
    const result = await dispatch(asyncloginuser(user));
    if (result.success) {
      toast.success("👋 Logged in successfully!");
      navigate("/");
    } else {
      toast.error("👾Invalid email or password!");
    }
  };

  return (
    <>
      <div className="w-full fixed top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <Link to="/products">
          <FiArrowLeft className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]" />
        </Link>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Login
        </h2>
        {/* cart */}
        {user ? (
          <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        ) : (
          <GiClothesline className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        )}
      </div>

      <form
        onSubmit={handleSubmit(loginHandler)}
        className="flex flex-col w-full items-center justify-center px-5 py-32"
      >
        <div className="w-full md:w-[50vw] xl:w-[30vw] flex flex-col items-center justify-center gap-5 px-5 py-7  border-1 border-[#D4E80D] rounded-2xl">
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
          {/* password */}
          <div className="w-full  flex flex-col items-start justify-center">
            <span className="text-[#D4E80D] text-[13px] pl-5">
              {" "}
              {errors.password && errors.password.message}
            </span>
            <input
              {...register("password", {
                required: "[ Password is required ]",
              })}
              type="password"
              placeholder="********"
              className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
            />
          </div>

          {/* button */}
          <button
            className="relative cursor-pointer bg-[#D4E80D] border-transparent my-5 py-2 px-5 text-black font-bold rounded-full 
  transition-all duration-300 
  shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
          >
            LOGIN
          </button>

          <div className="flex items-center justify-center gap-2">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="text-[#D4E80D] underline underline-offset-2"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
