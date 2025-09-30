import { NavLink } from "react-router-dom";
import { RiHome3Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

const Nav = () => {
  return (
    <nav className="absolute z-50 border-t-2 bg-black border-[#1C1A1B] bottom-0 left-0 w-full flex items-center justify-center">
      
      <div className="w-full md:w-[50vw] lg:w-[30vw] flex items-center justify-center md:text-xl">
        {/* home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
            isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
          }`
        }
      >
        {({ isActive }) =>
          isActive ? <span>HOME</span> : <RiHome3Line className="text-3xl" />
        }
      </NavLink>
      
      {/* products */}
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
            isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
          }`
        }
      >
        {({ isActive }) =>
          isActive ? <span>PRODUCTS</span> : <AiOutlineProduct className="text-3xl" />
        }
      </NavLink>
      
      {/* login */}
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `font-semibold hover:text-[#D4E80D] w-full p-5 flex items-center justify-center ${
            isActive ? "text-[#D4E80D] bg-[#1C1A1B] rounded" : ""
          }`
        }
      >
        {({ isActive }) =>
          isActive ? <span>LOGIN</span> : <FiUser className="text-3xl" />
        }
      </NavLink>
      </div>
      
    </nav>
  );
};

export default Nav;
