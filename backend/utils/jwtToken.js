exports.sendToken = (user,statusCode,res) =>{
    /* 
        basically it stores the token which we generated using schema methods in cookie 
        it will be used to check whether the user is login or not 
        if token is present means logged in user
        else redirect to log in page
        httponly -> it does not allwo client side scripting lannguage likke javascript to manipulate it 
    */ 
    const token = user.getJWTToken();
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    }
    res.status(statusCode).cookie('token',token,options).json({success:true,user,token});
}