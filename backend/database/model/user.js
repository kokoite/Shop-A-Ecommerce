const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter name"],
        maxlength:[30,"Should be less than 30 character"],
        minlength:[4,"Should be greater than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Enter email"],
        unique:true,
        validate:[validator.isEmail,"Enter proper email"],
    },
    password:{
        type:String,
        required:[true,"Enter password"],
        minlength:[8,"Password length should be greater than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    joinedOn:{
        type:Date,
        default:Date.now()
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})
userSchema.pre("save",async function(next){
    if(!this.isModified('password'))
    {
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:"3d",
    })
}
userSchema.methods.comparePassword = async function(matched){
    return await bcrypt.compare(matched,this.password);
}
userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken; 
}
module.exports = new mongoose.model('User',userSchema);