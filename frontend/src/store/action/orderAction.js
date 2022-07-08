import axios from "axios";
import {
  ADMIN_ORDER_FAIL,
  ADMIN_ORDER_SUCCESS,
  ADMIN_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,DELETE_ORDER_FAIL,DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAIL_FAIL,ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS, CLEAR_ERROR
} from "../../constant/constant";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const header = { header: { "content-type": "application/json" } };
    const { data } = await axios.post("/api/v1/order", order, header);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      error:error.response.data.message
    });
  }
};
export const myOrder = () => async(dispatch) =>{
    try{
        dispatch({type:MY_ORDER_REQUEST});
        const {data} = await axios.get("/api/v1/orders/my");
        dispatch({type:MY_ORDER_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:MY_ORDER_FAIL,error:error.response.data.message})
    }
}
export const orderDetailAction = (id) =>async(dispatch) =>{
    try{
        dispatch({type:ORDER_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({type:ORDER_DETAIL_SUCCESS,payload:data});
    }
    catch(error)
    {
        dispatch({type:ORDER_DETAIL_FAIL,error:error.response.data.message})
    }
}
export const getAllOrders = () => async(dispatch) =>{
  try{
    dispatch({
      type:ADMIN_ORDER_REQUEST,

    })
    const {data} = await axios.get("/api/v1/admin/orders");
    dispatch ({
      type:ADMIN_ORDER_SUCCESS,
      payload:data
    })
  }
  catch(error)
  {
    dispatch({
      type:ADMIN_ORDER_FAIL,
      error:error.response.data.message
    })
  }
}
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      error: error.response.data.message,
    });
  }
};
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type:CLEAR_ERROR,
  })
};
