import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';
import AdminProduct from './admin/AdminProduct';
import AdminCategory from './admin/AdminCategory';
import AdminLayout from './admin/component/AdminLayout';
import Layout from './component/Layout';
import Home from './user/Home';
import Product from './user/Product';
import ProductDetails from './user/ProductDetails';
import Register from './user/Register';
import Login from './user/Login';
import Cart from './user/Cart';
import AdminDashboard from './admin/AdminDashboard';
import AdminViewProduct from './admin/AdminViewProduct';
import Profile from './user/Profile';
import Forgot from './user/Forgot';
import Otp from './user/otp';
import Newpassword from './user/newpassword';
import AdminSlider from './admin/AdminSlider';
import User from './admin/User';
import UserView from './admin/UserView';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* user route */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/product_details/:productId' element={<ProductDetails />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/forgot' element={<Forgot />}></Route>
          <Route path='/otp' element={<Otp />}></Route>
          <Route path='/newpassword' element={<Newpassword />}></Route>
        </Route>

        {/* Admin route */}

        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
          <Route path='/admin/category' element={<AdminCategory />}></Route>
          <Route path='/admin/product' element={<AdminProduct />}></Route>
          <Route path='/admin/product/:id' element={<AdminProduct />}></Route>
          <Route path='/admin/viewproduct' element={<AdminViewProduct />}></Route>
          <Route path='/admin/slider' element={<AdminSlider />}></Route>
          <Route path='/admin/user' element={<User/>}></Route>
          <Route path='/admin/userview/:userId' element={<UserView/>}></Route>
        </Route>
        <Route path='/admin' element={<AdminLogin />}></Route>
        <Route path='/admin/register' element={<AdminRegister />}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
