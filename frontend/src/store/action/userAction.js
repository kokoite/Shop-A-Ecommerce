import axios from "axios";
import {
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  ADMIN_USER_FAIL,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  CLEAR_ERROR,
  DELETE_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST
} from "../../constant/constant";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const user = { email, password };
    const header = { headers: { "content-type": "application/json" } };
    const { data } = await axios.post("/api/v1/login", user, header);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      error: error.response.data.message,
    });
  }
};
export const registerAction = (dat) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const header = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", dat, header);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, error: error.response.data.message });
  }
};
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/profile");
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      error: error.response.data.message,
    });
  }
};
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    await axios.get("/api/v1/logout");
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      error: error.response.data.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "content-type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/profile/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      error: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      error: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.post(`/api/v1/forget-password`, email, config);

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "content-type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin methods

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      error: error.response.data.message,
    });
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_USER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/admin/alluser");
    dispatch({
      type: ADMIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_FAIL,
      error: error.response.data.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      error: error.response.data.message,
    });
  }
};
export const updateUser = (id, userdata) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const config = { headers: { "content-type": "application/json" } };
    await axios.put(`/api/v1/admin/user/${id}`, userdata, config);
    const data = {
      success: true,
    };
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      error: error.response.data.message,
    });
  }
};
export const clearError = () => async (distpatch) => {
  distpatch({
    type: CLEAR_ERROR,
  });
};
