import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";

const CreateProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const imgPreview = watch("image");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    navigate("/products");
    toast.success("Product Created!");
    reset();
  };

  const canclebtn = () => {
    navigate("/products");
  };

  return (
    <div className="md:px-5 py-24 md:py-32">
      <div className="flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-5 px-5">
        <div className="w-full fixed top-0 left-0 bg-black border-b-1 border-white/20 flex items-center justify-between gap-3 px-5 py-5">
          <Link to="/products">
            <FiArrowLeft className="hover:text-[#D4E80D] cursor-pointer text-3xl active:scale-[0.96] active:text-[#D4E80D]" />
          </Link>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-t from-[#D4E80D] to-white text-transparent bg-clip-text pb-1">
            Create Product
          </h2>
          {/* cart */}
          <MdOutlineShoppingCart className="hover:text-[#D4E80D] cursor-pointer text-4xl active:scale-[0.96] active:text-[#D4E80D]" />
        </div>

        {/* product image preview */}
        <div className="w-[60vw] md:w-[40vw] xl:w-[20vw] flex items-center justify-center">
          {imgPreview ? (
            <img
              src={imgPreview}
              alt="product image"
              onError={(e) => (e.target.style.display = "none")}
              className="rounded-4xl w-full object-cover"
            />
          ) : (
            <span className="text-3xl text-[#D4E80D]">[ Image Preview ]</span>
          )}
        </div>

        <form
          onSubmit={handleSubmit(createHandler)}
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
          <div className="flex gap-5 items-start justify-center">
            <button className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]">
              CREATE
            </button>
            <button
              type="button"
              onClick={canclebtn}
              className="relative cursor-pointer bg-[#e80d0d] border-transparent my-5 py-2 px-5 text-white font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#e80d0d]"
            >
              CANCLE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
