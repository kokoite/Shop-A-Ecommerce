import { USER_DETAIL_FAIL,CLEAR_ERROR, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_REQUEST ,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS,ADMIN_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_FAIL, DELETE_USER_RESET, UPDATE_USER_RESET, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS,

FORGET_PASSWORD_FAIL,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS, FORGET_PASSWORD_RESET, UPDATE_USER_REQUEST, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_SUCCESS

} from "../../constant/constant";

export const userReducer = (state = {user :{}},action)=>{
    switch(action.type)
    {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user:action.payload.user,
                isAuthenticated:true,
                loading:false,
            }
        case USER_REGISTER_FAIL:
        case USER_LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return{
                ...state,
                error:action.error,
                isAuthenticated:false,
                loading:false,
                USER:null
            }
        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                loading:true,
                isAuthenticated:true,
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                user:{},
                isAuthenticated:false,
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }

}
export const forgetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGET_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload.message,
        };
  
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload.success,
        };
        

      case FORGET_PASSWORD_RESET:
        return {
            ...state,
            loading:false,
            message:null,
        }  
      case FORGET_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
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
export const allUserReducer = (state = {users:[]},action) =>{
    switch(action.type)
    {
        case ADMIN_USER_REQUEST:
            return {
                loading:true,
            }
        case ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload.user
            }

        case ADMIN_USER_FAIL:
            return {
                loading:false,
                error:action.error,
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
export const userDetailReducer =(state = {user:{}},action) =>{
    switch(action.type)
    {
        case USER_DETAIL_REQUEST:
            return {
                ...state,
                loading:true
            }
        case USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading:false,
                user:action.payload.user
            }
        case USER_DETAIL_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                loading:false,
                error:null
            }
        default:
            return state;
    }
}
export const usersReducer = (state = {},action) =>{
    switch(action.type)
    {   
        case UPDATE_PASSWORD_REQUEST:
        case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_USER_SUCCESS:
            {
                return{
                    ...state,
                    loading:false,
                    isDeleted:action.payload.success
                }
            }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload.success
            }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
        case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case DELETE_USER_RESET:
        case UPDATE_USER_RESET:
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                loading:false,
                isUpdated:false,
                isDeleted:false,
                
            }
        case CLEAR_ERROR:
            return {
                loading:false,
                error:null
            }
        default:
            return state;

    }
}