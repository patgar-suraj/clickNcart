import { Route, Routes } from 'react-router-dom'
import Home from "../pages/Home"
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PageNotFound from '../pages/PageNotFound'
import CreateProduct from '../pages/admin/CreateProduct'
import ProductDetails from '../pages/admin/ProductDetails'
import UserProfile from '../pages/user/UserProfile'
import { useSelector } from 'react-redux'

const Mainroutes = () => {
  // const {userData} = useSelector((state) => state.userReducer)
  
  return (
    <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/admin/create-product" element={<CreateProduct />} />
    </Routes>
  )
}

export default Mainroutes