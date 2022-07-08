const app = require('./app')
const cloudinary= require('cloudinary');
if(process.env.NODE_ENV !== "PRODUCTION")
{

    require('dotenv').config({path:"backend/config/config.env"});
}
const connectDatabase = require('./database/connect');
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
connectDatabase();
process.on('uncaughtException',(err)=>{
    console.log(err.message);
    console.log("Server shutting down");
    process.exit(1);
})
app.listen(process.env.PORT,()=>{
    console.log(`sever started on port ${process.env.PORT}`)
})
process.on('unhandledRejection',(err) =>{
    console.log(err.message);
    console.log("Shutting down server");
    server.close(()=>{
        process.exit(1);
    });
})