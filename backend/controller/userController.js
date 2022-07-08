const User = require("../database/model/user");
const ErrorHandler = require("../middleware/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendToken } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const fileSize = avatar.length / 1024;
  if (fileSize > 750) {
    return next(new ErrorHandler("Image should be less than 750 kb", 400));
  }
  const check = await User.findOne({ email });
  if (check) {
    return next(new ErrorHandler("Email already exist", 400));
  } else {
    const cloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      },
    });
    sendToken(user, 201, res);
  }
});
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Enter both field", 500));
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email or Password", 500));
  const matchedPassword = await user.comparePassword(password);
  if (!matchedPassword)
    return next(new ErrorHandler("Invalid Email or Password", 500));
  sendToken(user, 200, res);
});
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "logout" });
});
exports.forgetPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("Email does not exist", 400));
  const resetToken = await user.getResetPasswordToken();
  
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
  const message = `Your reset Password token is :- \n\n ${resetPasswordUrl} \n\n.If you have not requested then ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password Recovery",
      message,
    });
    res
      .status(200)
      .json({
        success: true,
        message: `Email sent successfully to ${user.email}`,
      });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 404));
  }
});
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  let user = await User.findOne({
    resetHash,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorHandler("Time expired", 400));
  const { password, confirmPassword } = req.body;
  if (password != confirmPassword)
    return next(new ErrorHandler("Both field does'not match", 400));
  user = await User.findByIdAndUpdate(
    user.id,
    { password },
    {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    }
  );
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, user });
});
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword)
    return next(new ErrorHandler("Fill all field", 500));
  const user = await User.findById(req.user.id).select("+password");
  if (!user)
    return next(
      new ErrorHandler("User don't exist anymore make another account", 400)
    );
  const passwordMatched = await user.comparePassword(oldPassword);
  if (!passwordMatched)
    return next(new ErrorHandler("Password don't match", 401));
  if (newPassword !== confirmPassword)
    return next(new ErrorHandler("Field don't match", 400));
  user.password = newPassword;
  await user.save();
  res.status(200).json({ success: true, user });
});
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
  };
  const { name, email, avatar } = req.body;
  if (avatar && (avatar.length / 1024) > 750) {
    return next(new ErrorHandler("Please select smaller image", 500));
  }
  if (!name || !email) return next(new ErrorHandler("Enter both field", 501));
  if (avatar) {
    const user = req.user;
    const image_id = user.avatar.public_id;
    if (image_id) {
      await cloudinary.v2.uploader.destroy(image_id);
    }
    const cloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    updatedUser.avatar = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, updatedUser, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  req.user = user;
  res.status(200).json({success:true,user});
});
exports.profile = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});
// below are admin methods
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User don't exist", 501));
  res.status(200).json({ success: true, user });
});
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({ success: true, user });
});
exports.updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User doesn't exist", 400));
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, user });
});
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User doesn't exist", 400));
  const image_id = user.avatar.public_id;
  if (image_id) {
    await cloudinary.v2.uploader.destroy(image_id);
  }
  

  await User.deleteOne({_id: req.params.id });
  res.status(200).json({ success: true, message: "User deleted success" });
});
