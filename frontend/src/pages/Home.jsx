import { useDispatch, useSelector } from "react-redux";
import { asynclogoutuser } from "../store/actions/userActions";

const Home = () => {
  const user = useSelector((state) => state.userReducer.userData);

  const dispatch = useDispatch()
  const logOutHandler = () => {
    dispatch(asynclogoutuser())
  }
  return (
    <div className="w-full h-screen p-5">
      home

      {user ? (
        <button
        onClick={logOutHandler}
        className="relative bg-[#D4E80D] cursor-pointer border-transparent my-5 py-2 px-5 text-black font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_8px_2px_#D4E80D]"
      >
        LOGOUT
      </button>
      ) : (
        ""
      )}
      
    </div>
  );
};

export default Home;
