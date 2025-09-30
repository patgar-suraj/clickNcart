import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asynccurrentuser())
  }, [])
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#000000] text-[#fff]">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
