import {combineReducers} from 'redux'
import { configureStore} from '@reduxjs/toolkit'
import {productReducer, getAllProductReducer, newProductReducer} from './reducer/productReducer.js'
import { productDetailReducer } from './reducer/productReducer.js'
import { allUserReducer, userReducer, usersReducer,userDetailReducer, forgetPasswordReducer } from './reducer/userReducer.js'
import {cartReducer} from './reducer/cartReducer.js';
import { myOrderReducer, orderDetailReducer, createOrderReducer, allOrderReducer, orderReducer } from './reducer/orderReducer.js'
import { allReview, createReviewReducer, reviewReducer } from './reducer/reviewReducer.js'
const rootReducer = combineReducers({
    products:getAllProductReducer,
    productDetail:productDetailReducer,
    user:userReducer,
    cart:cartReducer,
    createOrder:createOrderReducer,
    myOrder:myOrderReducer,
    orderDetail:orderDetailReducer,
    allOrders:allOrderReducer,
    allUsers:allUserReducer,
    newProduct:newProductReducer,
    product:productReducer,
    order:orderReducer,
    users:usersReducer,
    userDetail:userDetailReducer,
    productReviews:allReview,
    review:reviewReducer,
    newReview:createReviewReducer,
    forgetPassword:forgetPasswordReducer,
})
let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingAddress:localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{},
    },
};
const store = configureStore({
    reducer:rootReducer,
    preloadedState:initialState,
    
});
export default store;
