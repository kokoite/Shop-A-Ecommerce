const express = require('express');
const { newOrder, getSingleOrder, getAllOrder, getUserOrder, upadteOrderStatus, deleteOrder } = require('../controller/orderController');
const {isAuthenticated,authorizeRole} = require('../middleware/auth');
const router = express.Router();
router.route("/order").post(isAuthenticated,newOrder)
router.route("/order/:id").get(isAuthenticated,getSingleOrder);
router.route("/orders/my").get(isAuthenticated,getUserOrder)
router.route("/admin/orders").get(isAuthenticated,authorizeRole("admin"),getAllOrder);
router.route("/admin/order/:id").put(isAuthenticated,authorizeRole("admin"),upadteOrderStatus).delete(deleteOrder);
module.exports = router;