import { PiCoatHangerFill } from "react-icons/pi";
import { BiSearchAlt } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const goPrevious = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col p-3 py-24 md:py-32">
      {/* upper nav */}
      <div className="w-full flex items-center justify-between fixed top-0 left-0 bg-black border-b-1 border-white/20 z-10 gap-3 px-5 py-5">
        {/* goPrevious */}
        <FiArrowLeft
          onClick={goPrevious}
          className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]"
        />
        <h2 className="hidden lg:block text-xl md:text-3xl cursor-default font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
          Explore
        </h2>

        <div className="flex items-center justify-end gap-5 text-2xl md:text-2xl">
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
          {/* main nav cart */}
          <PiCoatHangerFill className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        </div>
      </div>

      <div className="w-full flex items-start justify-center gap-2">
        <div className="w-[20%] flex flex-col items-start justify-center gap-5 border-[1px] border-[#D4E80D] p-1 rounded-lg">
          {/* filter gender */}
          <div className="w-full flex flex-col">
            <hr className="border-dashed border-white/20 mt-2" />
            <p className="text-xl font-semibold">Filter</p>

            <hr className="border-dashed border-white/20 my-2" />

            <div className="flex flex-col gap-2 pl-3">
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="men">Men</label>
              </div>
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="women">Women</label>
              </div>
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="boys">Boys</label>
              </div>
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="girls">Girls</label>
              </div>
            </div>
          </div>

          {/* filter category */}
          <div className="w-full flex flex-col">
          <hr className="border-dashed border-white/20 mt-2" />
            <p className="text-xl font-semibold">Category</p>

            <hr className="border-dashed border-white/20 my-2" />

            <div className="flex flex-col gap-2 pl-3">
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="hoodie">Hoodie</label>
              </div>
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="pant">Pant</label>
              </div>
              <div className="flex items-center justify-start gap-2">
                <input type="radio" />
                <label for="shirt">Shirt</label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] rounded-lg overflow-hidden">
          <img src="./images/explore1.png" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Explore;
