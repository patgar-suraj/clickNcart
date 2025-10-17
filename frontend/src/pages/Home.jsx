import { useDispatch, useSelector } from "react-redux";
import { RiHome3Line } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import LoadingPage from "../loading/LoadingPage";
import { MdOutlineShoppingCart } from "react-icons/md";
import { asyncUpdateUser } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import axios from "../api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const user = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);
  const [productData, setProductData] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=8&_start=${productData.length}`
      );
      if (data.length == 0) {
        sethasMore(false);
      } else {
        sethasMore(true);
        setProductData([...productData, ...data]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Products Not Available!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    const copyuser = { ...userData, cart: [...userData.cart] };
    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id);
    if (x == -1) {
      copyuser.cart.unshift({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
    toast.dismiss();
    toast.success("🛒Item added to cart");
  };

  const renderProduct = productData.map((product) => {
    return (
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className="group w-full overflow-hidden flex flex-col items-start justify-start rounded-2xl transition-transform duration-200 border-[#D4E80D] hover:border-b-2 hover:-translate-y-2"
      >
        <div className="relative w-full h-60 md:h-72 bg-[#131313] p-1 md:p-2 flex items-start rounded-3xl rounded-br-3xl group-hover:rounded-br-sm justify-center overflow-hidden">
          <img
            src={product.image}
            className="w-full h-full object-contain rounded-2xl group-hover:opacity-100 opacity-90"
            alt="product image"
          />
          <div>
            <MdOutlineShoppingCart
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCartHandler(product);
              }}
              className="absolute bottom-5 right-5 text-black bg-white hover:bg-[#D4E80D] active:scale-[0.96] rounded-full p-1 text-4xl"
            />
          </div>
        </div>

        <div className="w-full p-2 break-all flex items-center justify-start  flex-col gap-1">
          <h1 className="capitalize text-xl font-semibold">
            {" "}
            {product.title.length > 28
              ? `${product.title.slice(0, 28)}...`
              : product.title}{" "}
          </h1>
          <p className="capitalize font-semibold text-white/60">
            {" "}
            {product.category}{" "}
          </p>
          <h2 className="text-lg font-bold text-[#D4E80D]">
            {" "}
            ₹{product.price}{" "}
          </h2>
        </div>
      </Link>
    );
  });

  return (
    <div className="w-full p-5 py-24 md:py-32">
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
              <RiHome3Line className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="relative bg-[#D4E80D] hidden md:block cursor-pointer border-transparent py-2 px-5 text-sm text-black font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
              >
                LOGIN
              </Link>
              <RiHome3Line className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
            </>
          )}
        </div>
      </div>

      <InfiniteScroll
        dataLength={productData.length}
        next={fetchProducts}
        loader={
          <h4 className="text-[#D4E80D] md:text-2xl text-center font-semibold">
            Loading...
          </h4>
        }
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            {" "}
            <b className="text-[#D4E80D] font-semibold md:text-2xl">
              ⪻ Yay! You have seen it all ⪼
            </b>{" "}
          </p>
        }
      >
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-10 px-3 lg:px-6 pt-5 lg:pt-10 pb-24 overflow-hidden">
          <Suspense fallback={<LoadingPage />}>{renderProduct}</Suspense>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
