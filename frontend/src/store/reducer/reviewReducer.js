import {CREATE_REVIEW_SUCCESS,DELETE_REVIEW_RESET, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERROR, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, CREATE_REVIEW_REQUEST, CREATE_REVIEW_FAIL, CREATE_REVIEW_RESET } from "../../constant/constant";
export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
        };
      case CREATE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          success:false,
          error: action.error,
        };
      case CREATE_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
export const allReview = (state = {reviews:[]},action) =>{
    switch(action.type)
    {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading:true
            }
        case ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                reviews:action.payload.reviews,
            }
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }
        default:
            return state
    }
}
export const reviewReducer = (state = {},action) =>{
    switch(action.type)
    {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload.success,
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                loading:false,
                isDeleted:false,
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading:false,
                error:null,
            }
        default:
            return state;
    }
}