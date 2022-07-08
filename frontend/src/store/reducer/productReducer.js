import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, PROD_DETAIL_FAIL, PROD_DETAIL_REQUEST, PROD_DETAIL_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../../constant/constant";

export const getAllProductReducer = (state ={products:[]},action) =>{
    switch(action.type)
    {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return(
                {
                    loading:true,
                }
            )
        case ALL_PRODUCT_SUCCESS:
            return (
                {
                    ...state,
                    loading:false,
                    products:action.payload.products,
                    productCount:action.payload.productCount,
                    resultPerPage:action.payload.resultPerPage,
                    filterResult:action.payload.filterResult
                }
            )
        case ADMIN_PRODUCT_SUCCESS:
            return ({
                ...state,
                loading:false,
                products:action.payload.prod
            })
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:

            return (
                {
                    ...state,
                    error:null
                }
            )
        default:
            return state;
    }
}

export const productDetailReducer = (state = { product:{}},action) => {
    switch(action.type)
    {
        case PROD_DETAIL_REQUEST:
            return {
                loading:true
            }
        case PROD_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                product:action.payload
            }
        case PROD_DETAIL_FAIL:
            return {
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null
            }
        default :
            return state
    }
}
export const newProductReducer = (state = {product:{}},action) =>{
    switch(action.type)
    {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                product:action.payload.prod,
            }
        case NEW_PRODUCT_RESET:return{
            ...state,
            success:false,
        }
        case NEW_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.error
            }

        case CLEAR_ERROR:
            return {
                loading:false,
                error:null,
            }
        default:
            return state;
    }
}
export const productReducer = (state = {},action) =>{
    switch(action.type)
    {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload.success
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload.success,
            }
        case DELETE_PRODUCT_RESET:
        case UPDATE_PRODUCT_RESET:
            return {
                
                loading:false,
                isDeleted:false,
                isUpdated:false,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.error,
            }
        default:
            return state;
    }
}