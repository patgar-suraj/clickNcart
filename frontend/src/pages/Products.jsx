import { useSelector } from "react-redux";
import LoadingPage from "../loading/LoadingPage";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

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
      <SearchBar />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-3 pt-5 pb-24 lg:px-6 lg:pt-10 overflow-hidden">
        {renderProduct}
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default Products;
