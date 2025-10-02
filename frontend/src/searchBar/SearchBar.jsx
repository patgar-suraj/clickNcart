import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";

const SearchBar = () => {

    const [showSearch, setShowSearch] = useState(false)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between font-bold text-2xl md:text-4xl px-3 md:px-20 xl:px-40 py-5 md:py-7 xl:py-10">
        <BiSearchAlt onClick={() => setShowSearch((prev) => !prev)} className="hover:text-[#D4E80D] active:text-[#D4E80D] cursor-pointer" />

        <span>Details</span>

        <MdOutlineShoppingCart className="hover:text-[#D4E80D] active:text-[#D4E80D]" />
      </div>

      {/* search input */}
      <div className={`transition-all duration-300 overflow-hidden ${
          showSearch
            ? "flex w-[90%] md:w-[60vw] pr-5 gap-5 items-center justify-between bg-[#D4E80D] text-black rounded"
            : "hidden"
        }`}>
        <input
          type="text"
          placeholder="search here..."
          className="p-2 md:p-3 w-full ml-5 font-semibold outline-none"
        />
        <div className="w-[2px] h-[7vw] md:h-[5vw] lg:h-[2vw] bg-black"></div>
        <BiSearchAlt className="text-3xl cursor-pointer hover:text-black/80 active:scale-[0.96]" />
      </div>
    </div>
  );
};

export default SearchBar;
