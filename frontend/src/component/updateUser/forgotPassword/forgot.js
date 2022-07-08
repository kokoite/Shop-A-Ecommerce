import React, { Fragment,useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../../loader/loader'
// import { useNavigate } from 'react-router-dom'
import './forgot.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { toast } from 'react-toastify';
import { forgetPassword,clearError } from '../../../store/action/userAction';
import { FORGET_PASSWORD_RESET } from '../../../constant/constant'
const ForgetPassword = () => {
    const dispatch = useDispatch();
    const {loading,message,error} = useSelector((state => state.forgetPassword));
    const [email,setEmail] = useState("");
    const forgetSubmit = (event) =>{
        event.preventDefault();
        dispatch(forgetPassword({email}));
    }
    useEffect(()=>{
        if(error)
        {
            toast.error(error);
            dispatch(clearError());
        }
        if(message)
        {
            toast.success(message);
            dispatch({type:FORGET_PASSWORD_RESET})
        }
    },[dispatch,error,message])
    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="forget-container">
                <div className="forget-box">
                  <h2 className="forgotPasswordHeading">Forgot Password</h2>
    
                  <form
                    className="forget-form"
                    onSubmit={forgetSubmit}
                  >
                    <div className="forget-email">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
    
                    <input
                      type="submit"
                      value="Send"
                      className="forget-btn"
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );        
}
export default ForgetPassword;
