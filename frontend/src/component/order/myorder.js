import { Fragment, useEffect } from "react";
import {DataGrid} from '@material-ui/data-grid'
import { useDispatch, useSelector } from "react-redux";
import { clearError, myOrder } from "../../store/action/orderAction";
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import LaunchIcon from "@material-ui/icons/Launch";
import './myorder.css'
import { toast } from "react-toastify";
const columns=[{field:'id',headerName:'Order Id',flex:0.2},{field:'status',headerName:'Order Status',flex:0.1},
{field:'qty',headerName:'Quantity',flex:0.1},{field:'amount',headerName:'Amount',flex:0.1},{field:'actions',headerName:'Actions',flex:0.1,
sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id,"id")}`}>
            <LaunchIcon />
          </Link>
        );
      },

}];
const MyOrder = ()=>{
    const{orders,error} = useSelector((state) => state.myOrder)

    const dispatch = useDispatch();
    const rows = [];

    orders &&
    orders.forEach((item) => {
      rows.push({
        qty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
    useEffect(()=>{
        if(error)
        {
            toast.error(error);
            dispatch(clearError());
        }
        dispatch(myOrder());
    },[dispatch,error])
    
    return <Fragment>
        <div className="myorders">
            <Typography>My orders</Typography>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            />
        </div>
    </Fragment>
}
export default MyOrder;