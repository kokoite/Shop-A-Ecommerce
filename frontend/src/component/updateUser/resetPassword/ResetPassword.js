import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../../store/action/userAction";
import {useNavigate,useParams} from 'react-router-dom'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  
  const params = useParams();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
  
          <div className="reset-container">
            <div className="reset-box">
              <h2 className="reset-heading">Reset Profile</h2>

              <form
                className="reset-form"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="reset-btn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
