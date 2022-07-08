const express = require('express');
const router = express.Router();
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetail, createReview, getAllReview, deleteReview, getProductBasedOnCategory, getAdminProduct } = require('../controller/prodController');
const { isAuthenticated, authorizeRole } = require('../middleware/auth');
router.route("/products").get(getAllProduct);
router.route("/admin/products").get(getAdminProduct);
router.route("/admin/product/new").post(isAuthenticated,authorizeRole("admin"),createProduct)
router.route("/product/:id").put(isAuthenticated,authorizeRole("admin"),updateProduct).delete(isAuthenticated,authorizeRole("admin"),deleteProduct).get(getProductDetail)
router.route('/review').put(isAuthenticated,createReview);
router.route('/products/allreview').get(getAllReview);
router.route('/admin/deleteReview').delete(isAuthenticated,authorizeRole("admin"),deleteReview);
module.exports = router;