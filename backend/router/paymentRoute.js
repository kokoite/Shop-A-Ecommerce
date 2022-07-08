const express = require('express');
const { paymentProcess, sendStripeApiKey } = require('../controller/paymentController');
const router = express.Router();
const {isAuthenticated} = require('../middleware/auth')
router.route("/process/payment").post(isAuthenticated,paymentProcess);
router.route("/stripeApiKey").get(isAuthenticated,sendStripeApiKey);
module.exports = router