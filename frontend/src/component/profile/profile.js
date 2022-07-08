import { Fragment } from "react";
import { useSelector } from "react-redux";
import prof from "../../images/Profile.png";
import { Link } from "react-router-dom";
import Loader from "../loader/loader";
import "./profile.css";
export const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>Profile Detail</h1>
              <img src={user.avatar.url} alt={prof} />
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h2>Full Name</h2>
                <p>{user.name}</p>
              </div>
              <div>
                <h2>Email</h2>
                <p>{user.email}</p>
              </div>
              <div>
                <h2>Joined On</h2>
                <p>{user.joinedOn}</p>
              </div>
              <div>
                <Link to="/orders">Orders History</Link>
                <Link to="/update-password">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
