const mongoose = require('mongoose');
const connectDatabase = ()=>{
    return mongoose.connect(process.env.DATABASE_URI,()=>{
        console.log("Database connection success")
    })
}
module.exports = connectDatabase;