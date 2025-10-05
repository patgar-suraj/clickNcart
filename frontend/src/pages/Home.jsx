import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser } from "../store/actions/userActions";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.userReducer.userData);

  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(asynclogoutuser());
    toast.success("👋 You have been logged out!");
  };
  return (
    <div className="w-full h-screen p-5 py-24 md:py-32">
      <div className="w-full flex items-center justify-center fixed top-0 left-0 bg-black border-b-1 border-white/20 z-10 gap-3 px-5 py-5">
        {/* logo */}
        <img
          src="/logo/logo.png"
          alt="logo"
          className="w-[40px] md:w-[55px] xl:w-[70px] object-cover rounded-full"
        />
        <div className="w-full flex items-center justify-end gap-5 text-2xl md:text-2xl">
          {/* search input */}
          <div className="transition-all duration-300 overflow-hidden flex w-[90%] md:w-[60vw] xl:w-[45vw] pr-2 gap-3 items-center justify-between bg-[#D4E80D] text-black rounded">
            <input
              type="text"
              placeholder="search here..."
              className="p-1 md:p-2 w-full ml-2 text-lg outline-none"
            />
            <div className="w-[2px] h-[7vw] md:h-[5vw] lg:h-[2vw] bg-black"></div>
            <BiSearchAlt className="text-3xl cursor-pointer hover:text-black/80 active:scale-[0.96]" />
          </div>

          {user ? (
            <>
              {/* cart */}
              <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
              <button
                onClick={logOutHandler}
                className="relative bg-[#e80d0d] hidden md:block cursor-pointer border-transparent py-2 px-5 text-sm text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="relative bg-[#D4E80D] hidden md:block cursor-pointer border-transparent py-2 px-5 text-sm text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
