import { ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERROR, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS } from "../../constant/constant"
import axios from 'axios'
export const createReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });
  
      const config = {
        headers: { "content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        error: error.response.data.message,
      });
    }
  };
export const getAllReviews = (id) => async(dispatch) =>{
    try{
        dispatch({type:ALL_REVIEW_REQUEST});
        const {data} = await axios.get(`/api/v1/products/allReview?id=${id}`);
        dispatch({type:ALL_REVIEW_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({
            type:ALL_REVIEW_FAIL,
            error:error.response.data.message
        })
    }
    
}
export const deleteReview = (id,productId) => async(dispatch) =>{
    try {
        dispatch({
            type:DELETE_REVIEW_REQUEST
        })
        const {data} = await axios.delete(`/api/v1/admin/deleteReview?id=${id}&productId=${productId}`)
        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data
        })
    }
    catch (error)
    {
        dispatch({
            type:DELETE_REVIEW_FAIL ,
            error:error.response.data.message
        })
    }
}
export const clearError = () => async(dispatch) =>{
    dispatch({
        type:CLEAR_ERROR
    })
}