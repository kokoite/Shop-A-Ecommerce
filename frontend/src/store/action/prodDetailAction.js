import { CLEAR_ERROR, PROD_DETAIL_FAIL, PROD_DETAIL_REQUEST, PROD_DETAIL_SUCCESS } from "../../constant/constant"
import axios from "axios"
export const productDetail = (id)=> async(dispatch) =>{
    dispatch({
        type:PROD_DETAIL_REQUEST,
        loading:true,
    })
    try {
        
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type:PROD_DETAIL_SUCCESS,
            payload:data.prod
        })
    }
    catch (error)
    {
        dispatch({
            type:PROD_DETAIL_FAIL,
            error:error.response.data.message
        })
    }
}
export const clearError = () => async(distpatch) =>{
    distpatch({
        type:CLEAR_ERROR
    })
}