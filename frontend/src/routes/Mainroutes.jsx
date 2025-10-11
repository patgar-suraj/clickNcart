import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import UserProfile from "../pages/user/UserProfile";
import Authrouter from "./Authrouter";
import Cart from "../pages/Cart";

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />

      <Route
        path="/admin/create-product"
        element={
          <Authrouter>
            <CreateProduct />
          </Authrouter>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Authrouter>
            <ProductDetails />
          </Authrouter>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <Authrouter>
            <UserProfile />
          </Authrouter>
        }
      />
      <Route
        path="/cart"
        element={
          <Authrouter>
            <Cart />
          </Authrouter>
        }
      />
    </Routes>
  );
};

export default Mainroutes;
