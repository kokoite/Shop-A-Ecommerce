const Product = require("../database/model/prod");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apiFeature");
const ErrorHandler = require("../middleware/errorHandler");
const cloudinary = require("cloudinary");
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user;

  const prod = await Product.create(req.body);
  res.status(201).json({
    success: true,
    prod,
  });
});

exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 9;
  const productCount = await Product.countDocuments();
  let apiFeature = new ApiFeature(Product.find(), req.query).search().filter();
  let products = await apiFeature.query;
  const filterResult = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filterResult,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let prod = await Product.findById(req.params.id);
  if (!prod) return next(new ErrorHandler("Not found", 500));
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
await prod.save();
  res.status(200).json({ success: true, prod });
});

exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return next(new ErrorHandler("Not found", 500));
  res.status(200).json({ success: true, prod });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let prod = await Product.findById(req.params.id);
  if (!prod) return next(new ErrorHandler("Not found", 500));
  for (let i = 0; i < prod.images.length; i++) {
    await cloudinary.v2.uploader.destroy(prod.images[i].public_id);
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, message: "deleted" });
});

exports.createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    review,
  });
});

exports.getAllReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Prod not found", 401));
  res.status(200).json({ success: true, reviews: product.reviews });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Prod not found", 400));
  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id
  );
  
  let rating = 0;
  const numOfReviews = reviews ? reviews.length : 0;
  reviews.forEach((rev) => (rating += rev.rating));
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, rating, numOfReviews },
    {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    }
  );
  res.status(200).json({ success: true, message: "review deleted success" });
});
exports.getAdminProduct = catchAsyncError(async (req, res, next) => {
  const prod = await Product.find();
  res.status(200).json({
    success: true,
    prod,
  });
});
