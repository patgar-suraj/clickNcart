import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../loading/LoadingPage";
import { useSelector } from "react-redux";
import { CgArrowLongRightR } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  asyncDeleteProduct,
  asyncUpdateProduct,
} from "../../store/actions/productActions";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productReducer: { productData },
    userReducer: { userData },
  } = useSelector((state) => state);
  const product = productData?.find((product) => product.id == id);

  const [rating, setRating] = useState("");
  const [size, setSize] = useState("");

  // update product
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      desc: product?.desc,
      category: product?.category,
      price: product?.price,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        image: product?.image,
        title: product?.title,
        desc: product?.desc,
        category: product?.category,
        price: product?.price,
      });
    }
  }, [product, reset]);

  const watchedImage = watch("image", product?.image);

  const dispatch = useDispatch();

  const updateHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    toast.success("Product Updated!")
    reset();
  };
  
  const navigate = useNavigate();
  const deleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    toast.success("Product Deleted!")
    navigate("/products");
  };

  return product ? (
    <div className="w-full relative md:px-5 py-24 md:py-32">
      <div className="w-full fixed top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
        <Link to="/products">
          <FiArrowLeft className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]" />
        </Link>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">Details</h2>
        {/* cart */}
        <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
      </div>

      {/* product */}
      <div className="w-full flex flex-col px-5 md:flex-row items-center justify-center md:justify-start md:items-start md:gap-10">
        <div className="w-full h-full flex flex-col">
          <div className="w-full flex items-center justify-center">
            <img
              src={watchedImage}
              alt="product image"
              className="h-[50vh] md:h-[35vh] xl:h-[70vh] object-cover rounded-4xl "
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center md:px-[20px] lg:px-[50px] xl:px-[144px] py-10 gap-5">
            <button className="w-full cursor-pointer text-xl flex items-center justify-center active:scale-[0.98] bg-[#D4E80D] border-transparent py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
              Buy now <CgArrowLongRightR className="text-2xl mt-2 ml-2" />
            </button>
            <button className="w-full cursor-pointer text-xl flex items-center justify-center active:scale-[0.98] bg-[#e8d90d] border-transparent py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e8d90d]">
              Add to Cart <MdOutlineShoppingCart className="text-2xl ml-2" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col md:gap-5 items-start justify-start">
          <div className="w-full flex md:flex-col items-start gap-3 md:gap-6 justify-between my-2">
            <h1 className="capitalize text-3xl font-bold"> {product.title} </h1>
            <h2 className="bg-[#343338] text-xl font-bold flex items-center justify-center py-2 px-5 text-[#D4E80D] rounded-full ">
              {" "}
              ₹{product.price}{" "}
            </h2>
          </div>

          <div className="w-full flex flex-col items-start justify-start">
            <span className="capitalize text-xl font-semibold"> {product.category} </span>
            <p className="capitalize my-2 text-white/70"> {product.desc} </p>
          </div>

          {/* size selection */}
          <div className="w-full flex items-center justify-start gap-3">
            {["S", "M", "L", "XL", "XXL"].map((s) => (
              <span
                key={s}
                onClick={() => setSize(s)}
                className={`cursor-pointer text-2xl py-1 px-3 border rounded font-semibold transition-all duration-200 ${
                  size === s
                    ? "text-[#D4E80D] border-[#D4E80D]"
                    : "text-white border-gray-500 hover:border-[#D4E80D]"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          {/* star rating */}
          <div className="w-full flex items-center justify-around text-4xl my-10 lg:px-10 xl:px-28">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition-all duration-100 active:scale-90 active:-translate-y-2 ${
                  rating >= star ? "text-[#D4E80D]" : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* update product */}
      {userData && userData?.isAdmin && (
        <div className="flex flex-col w-full items-center justify-center px-5 pt-14 pb-24">
          <form
            onSubmit={handleSubmit(updateHandler)}
            className="w-full md:w-[60vw] xl:w-1/2 flex flex-col items-center justify-center gap-5 p-5  border-1 border-[#D4E80D] rounded-2xl"
          >
            {/* product image */}
            <div className="w-full flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.image && errors.image.message}
              </span>
              <input
                {...register("image", {
                  required: "[ Product image is required ]",
                })}
                type="url"
                placeholder="product image url"
                className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-r focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
              />
            </div>

            {/* product name */}
            <div className="w-full flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.title && errors.title.message}
              </span>
              <input
                {...register("title", {
                  required: "[ Product name is required ]",
                })}
                type="text"
                placeholder="product name"
                className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-r focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
              />
            </div>

            {/* product desc */}
            <div className="w-full  flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.desc && errors.desc.message}
              </span>
              <textarea
                {...register("desc", {
                  required: "[ Product description is required ]",
                })}
                type="desc"
                placeholder="Product description"
                className="outline-0 w-full min-h-[20vh] max-h-[40vh] border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
              ></textarea>
            </div>

            {/* product category */}
            <div className="w-full  flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.category && errors.category.message}
              </span>
              <input
                {...register("category", {
                  required: "[ Product category is required ]",
                })}
                type="text"
                placeholder="Product category"
                className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
              />
            </div>

            {/* product price */}
            <div className="w-full  flex flex-col items-start justify-center">
              <span className="text-[#D4E80D] text-[13px] pl-5">
                {" "}
                {errors.price && errors.price.message}
              </span>
              <input
                {...register("price", {
                  required: "[ Product price is required ]",
                })}
                type="number"
                step="0.01"
                placeholder="product price"
                className="outline-0 w-full border-b-2 border-l-2 p-2 rounded-2xl border-[#1C1A1B] bg-gradient-to-tr from-[#1C1A1B] to-black font-semibold text-lg focus:bg-gradient-to-tr focus:from-[#D4E80D] focus:to-[#D4E80D] focus:border-[#302f30] focus:border-4 focus:text-black placeholder:font-thin placeholder:text-sm"
              />
            </div>

            {/* button */}
            <div className="w-full gap-5 flex items-center justify-center">
              <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
                UPDATE
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="relative cursor-pointer bg-[#e80d0d] border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
              >
                DELETE
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProductDetails;
