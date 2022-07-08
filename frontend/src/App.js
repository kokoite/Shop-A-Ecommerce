import { useState,useEffect } from 'react';
import WebFont from 'webfontloader'
import Header from './component/header/header'
import Footer from './component/footer/footer';
import Home from './component/home/home'
import Search  from './component/search/search';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetail } from './component/productDetail/prodDetail';
import { Products } from './component/products/product';
import Login from './component/user/loginregister';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Profile} from './component/profile/profile'
import Forget from './component/updateUser/forgotPassword/forgot';
import Cart from './component/cart/cart';
import Checkout from './component/shipping/ConfirmOrder'
import Shipping from './component/shipping/Shipping'
import Payment from './component/payment/payment';
import store from './store/store'
import { loaduser } from './store/action/userAction';
import { useSelector } from 'react-redux';
import UserOption from './component/userOption/userOption'
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import OrderSuccess from './component/order/orderSuccess'
import MyOrder from './component/order/myorder'
import OrderDetail from './component/order/orderDetail';
import Dashboard from './admin/dashboard';
import ProductList from './admin/ProductList'
import NewProduct from './admin/NewProduct'
import UpdateProduct from './admin/UpdateProduct';
import ProcessOrder from './admin/ProcessOrder';
import './App.css'
import OrderList from './admin/OrderList';
import UserList from './admin/UsersList'
import UpdateUser from './admin/UpdateUser'
import ProductReviews from './admin/ProductReviews';
import ResetPassword from './component/updateUser/resetPassword/ResetPassword';
import UpdateProfile from './component/updateUser/update/UpdateProfile';
import UpdatePassword from './component/updateUser/update/UpdatePassword';
import Contact from './component/contact';
import NotFound from './component/Not Found/NotFound'
const App =() =>{
  
  const {isAuthenticated,user} = useSelector((state) => state.user);
  const [stripekey,setStripeKey] = useState("");
  const getStripeKey = async() =>{
    const {data} = await axios.get("/api/v1/stripeApiKey");
    setStripeKey(data.key);
  }  
  useEffect(()=>{
    WebFont.load({google:{
      families:["Roboto","Sans-serif"]
    }})
    store.dispatch(loaduser());
    getStripeKey();
  }
  ,[stripekey])
  // console.log(window.location.pathname);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <BrowserRouter>
    <Header/>
    {isAuthenticated === true && <UserOption /> }
    <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    <div className='wrapper'>
    {isAuthenticated === true && stripekey !== "" &&  <Elements stripe={loadStripe(stripekey)}>
          <Routes>
            <Route path="/process/payment" element={<Payment/>} />
          </Routes>
    </Elements>}
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/search' element ={<Search/>}/>
      <Route path='/product/:id' element = {<ProductDetail/>} />
      <Route path='/products/:keyword' element = {<Products/>}/>  
      <Route path = '/contact' element = {<Contact/>} />
      <Route path = '/about' element = {<Contact/>} />
      <Route path='/products' element = {<Products/>}/>
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/account" element = {isAuthenticated === true ? <Profile/> : <Login/>} /> 
      <Route path = "/forget-password" element = {<Forget/>} />
      <Route path = "/reset-password/:token" element = {<ResetPassword/>} />
      <Route path = "/profile/update" element = {isAuthenticated === true ? <UpdateProfile/> : <Login/>} />
      <Route path = "/update-password" element = {isAuthenticated === true ? <UpdatePassword/> : <Login/>} />
      <Route path = "/cart" element = {<Cart/>} />
      <Route path = "/shipping" element = {<Shipping/>} />
      <Route path = "/order/confirm" element = {isAuthenticated === true ? <Checkout/> : <Login/>} />
      <Route path = "/order/success" element = {isAuthenticated === true ? <OrderSuccess/> : <Login/>} />
      <Route path = "/orders"  element = {isAuthenticated === true ? <MyOrder/> : <Login/>} />
      <Route path = "/order/:id" element = {isAuthenticated === true ? <OrderDetail/> : <Login/>} />
      <Route path = "/admin/dashboard" element ={isAuthenticated === true && user.role ==="admin" ? <Dashboard/> : <Login/>} />
      <Route path = "/admin/products" element = {isAuthenticated === true ? <ProductList/> : <Login/>} />
      <Route path = "/admin/product" element = {isAuthenticated === true ? <NewProduct/> : <Login/>}/>
      <Route path = "/admin/product/:id" element = {isAuthenticated === true ? <UpdateProduct/> : <Login/>} />
      <Route path='/admin/orders' element = {isAuthenticated === true ? <OrderList/> : <Login/>} />
      <Route path = "/admin/order/:id" element = {isAuthenticated === true ? <ProcessOrder/> : <Login/>} />
      <Route path = "/admin/users" element = {isAuthenticated === true ? <UserList/> : <Login/>} />
      <Route path = "/admin/user/:id" element = {isAuthenticated === true ? <UpdateUser/> : <Login/>} />
      <Route path = "/admin/reviews" element = {isAuthenticated === true ? <ProductReviews/> : <Login/>} />
      <Route path='*'
          element = {<NotFound/>}
        />
    </Routes>
    </div>
    <Footer/>
  </BrowserRouter>    
  );
}

export default App;
