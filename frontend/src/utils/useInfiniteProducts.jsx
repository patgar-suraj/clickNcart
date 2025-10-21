import axios from "../api/axiosconfig";
import { toast } from "react-toastify";
import { loadlazyproduct } from "../store/reducres/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useInfiniteProducts = () => {
  const { productData } = useSelector((state) => state.productReducer);
  const [hasMore, sethasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=10&_start=${productData.length}`
      );
      if (data.length == 0) {
        sethasMore(false);
      } else {
        sethasMore(true);
        dispatch(loadlazyproduct(data));
      }
    } catch (error) {
      console.log(error);
      toast.error("Products Not Available!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return { productData, hasMore, fetchProducts };
};

export default useInfiniteProducts;
