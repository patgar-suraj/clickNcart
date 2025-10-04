import { useSelector } from "react-redux";
import LoadingPage from "../loading/LoadingPage";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

const Products = () => {
  const products = useSelector((state) => state.productReducer.productData);

  const renderProduct = products.map((product) => {
    return (
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className="group w-full overflow-hidden flex flex-col items-start justify-start rounded-2xl transition-transform duration-200 border-[#D4E80D] hover:border-b-2 hover:-translate-y-2"
      >
        <div className="relative w-full h-60 md:h-72 flex items-start rounded-3xl justify-center overflow-hidden">
          <img
            src={product.image}
            className="w-full h-full object-cover group-hover:opacity-100 opacity-90"
            alt="product image"
          />
          <div>
            <MdOutlineShoppingCart className="absolute bottom-5 right-5 text-black bg-white hover:bg-[#D4E80D] rounded-full p-1 text-4xl" />
          </div>
        </div>

        <div className="w-full p-2 break-all flex items-center justify-start  flex-col gap-1">
          <h1 className="text-xl font-bold"> {product.title} </h1>
          <p className="font-semibold"> {product.category} </p>
          <h2 className="text-lg font-bold text-[#D4E80D]">
            {" "}
            ₹{product.price}{" "}
          </h2>
        </div>
      </Link>
    );
  });

  return products.length > 0 ? (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-center gap-3 px-5 py-5">
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
          {/* cart */}
          <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-3 lg:px-6 pt-5 lg:pt-10 pb-24 overflow-hidden">
        {renderProduct}
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default Products;
