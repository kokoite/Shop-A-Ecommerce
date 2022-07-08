import { UPDATE_ORDER_REQUEST,CLEAR_ERROR, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS,MY_ORDER_FAIL,CLEAR_ERROR_CREATE_ORDER, ORDER_DETAIL_REQUEST,ORDER_DETAIL_FAIL,ORDER_DETAIL_SUCCESS, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_RESET, DELETE_ORDER_FAIL, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_RESET, UPDATE_ORDER_FAIL } from "../../constant/constant";

export const createOrderReducer = (state={},action)=>{
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return{
                loading:true,
            }
        case CREATE_ORDER_SUCCESS:
            console.log(action.payload);
            return {
                loading:false,
                order:action.payload.order,
                status:action.payload.success
            }
        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR_CREATE_ORDER:
            return {
                error:null
            }
        default:
            return state
    }
}
export const myOrderReducer = (state = {},action) =>{
    switch(action.type)
    {
        case MY_ORDER_REQUEST:
            return {
                loading:true,
            }
        case MY_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload.order
            }
        case MY_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                error:null
            }
        default:
            return state
    }
}
export const orderDetailReducer = (state = {loading:true,},action)=>{
    switch(action.type)
    {
        case ORDER_DETAIL_REQUEST:
            return state;
        case ORDER_DETAIL_SUCCESS:
            return {
                loading:false,
                order:action.payload.order
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading:false,
                error:action.payload.error
            }
        default :
            return state
    }
}
export const allOrderReducer = (state = {orders:[]},action) =>
{
    switch(action.type)
    {
        case ADMIN_ORDER_REQUEST:
            return {
                loading:true,
            }
        case ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                orders:action.payload.orders,
                totalAmount:action.payload.totalAmount
            }
        case ADMIN_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                loading:false,
                error:null
            }
        default:
            return state
    }
}
export const orderReducer = (state = {},action) =>{
    switch(action.type)
    {
        case DELETE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                isDeleted:action.payload.success,
                loading:false,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload.success,
            }
        case DELETE_ORDER_RESET:
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isDeleted:false,
                isUpdated:false,
            }
        case DELETE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                loading:false,
                error:action.error
            }
        default:
            return state;
    }

}