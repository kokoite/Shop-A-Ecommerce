import { Fragment, useState } from "react"
import './userOption.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useSelector,useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import Profile from '../../images/Profile.png'
import { logoutAction } from "../../store/action/userAction";
import { Backdrop } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { toast } from "react-toastify";
const UserOption = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const {user} = useSelector((state) => state.user);
    const options = [
        {icon:<PersonIcon/>,name:"Profile",func:account},
        {icon:<ShoppingCartIcon/>,name:"Cart",func:goToCart},      
        {icon:<ListAltIcon/>,name:"Order",func:orders},
        {icon:<ExitToAppIcon/>,name:"Logout",func:logout},
    ]
    if(user && user.role === "admin")
    {
        options.unshift({icon:<DashboardIcon/>,name:"dashboard",func:dashboard});
    }
    function account () {
        navigate("/account");
    }
    function logout () {
        dispatch(logoutAction());
        toast.success("Logout Success");
    }
    function dashboard(){
        navigate("/admin/dashboard");
    }
    function goToCart(){
        navigate("/cart");
    }
    function orders (){
        navigate("/orders");
    }
    return (
        <Fragment>
            <Backdrop open = {open} style = {{zIndex:10}} />
            
                <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open = {open}
                direction="down"
                className='speedDial'
                style= {{zIndex:'11'}}
                icon={
                    <img
                      className="speedDialIcon"
                      src={user && user.avatar.url ? user.avatar.url : Profile}
                      alt="Profile"
                    />
                }>
                {options.map((option) =>(
                    <SpeedDialAction icon={option.icon} onClick={option.func} tooltipTitle = {option.name} key = {option.name}  />
                ))}
                </SpeedDial>
        </Fragment>
    )
}
export default UserOption;