
const express = require('express')
const errorMiddleWare = require('./middleware/errorMiddleware');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const path = require('path');
const prodRouter = require('./router/prodRouter');
const userRouter = require('./router/userRouter');
const orderRouter = require('./router/orderRouter');
const paymentRoute = require('./router/paymentRoute');
if(process.env.NODE_ENV !== "PRODUCTION")
{
    require('dotenv').config({path:"backend/config/config.env"});
}
app.use(fileUpload());
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",prodRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentRoute);
app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})
app.use(errorMiddleWare);
module.exports = app;