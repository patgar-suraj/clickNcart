import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asynccurrentuser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { asyncLoadProduct } from "./store/actions/productActions";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asynccurrentuser())
    dispatch(asyncLoadProduct())
  }, [])
  return (
    <div className="relative w-screen">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
