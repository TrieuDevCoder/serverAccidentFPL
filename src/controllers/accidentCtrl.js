const Accident = require("../models/accidentModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongooseId = require("../../utils/validateMongoosedbid");
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require("../../utils/cloudinary");
const path = require("path");
const fs=require('fs')
const createAccident = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const AccidentData = req.body;
    const newAccident = new Accident(AccidentData);
    const savedAccident = await newAccident.save();
    res.json(savedAccident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});
//get all Accident
const getallAccident = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Accident.find(JSON.parse(queryStr));
    //sort Accidents
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //litmit fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    //pagination
    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    } else {
      query = query.skip(0).limit(10);
    }
    const accident = await query;
    res.json(accident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});
//get single Accident
const getAccidentById = asyncHandler(async (req, res) => {
  const {id}=req.params;
  validateMongooseId(id);
  try {
    const accident = await Accident.findById(id);
    res.json(accident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});
//update Accident
const updateAccident = asyncHandler(async (req, res) => {
  const id = req.params.id; // Lấy id từ req.params, không cần chuyển thành đối tượng
  try {
    const updatedAccident = await Accident.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.json(updatedAccident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});
//delete Accident
const deleteAccident = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deletedAccident = await Accident.findByIdAndDelete(
      { _id: id },
      req.body,
      { new: true }
    );
    res.json("delete success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  if (!star) {
    return res
      .status(400)
      .json({ message: "Please provide a star rating", success: false });
  }
  try {
    const accident = await Accident.findById(prodId);
    let alreadyRated = accident.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Accident.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
      res.json(updateRating);
    } else {
      const rateAccident = await Accident.findByIdAndUpdate(
        prodId,
        { $push: { ratings: { star: star, comment: comment, postedby: _id } } },
        { new: true }
      );
      res.json(rateAccident);
    }
    const getallRatings = await Accident.findById(prodId);
    if (!getallRatings) {
      return res
        .status(404)
        .json({ message: "Accident not found", success: false });
    }
    const ratingsArray = getallRatings.ratings;
    if (!ratingsArray || ratingsArray.length === 0) {
      return res
        .status(200)
        .json({ message: "Accident has no ratings yet", success: true });
    }

    // Lọc ra các đánh giá hợp lệ (số sao từ 1 đến 5)
    const validRatings = ratingsArray.filter(
      (item) => item.star >= 1 && item.star <= 5
    );

    if (validRatings.length === 0) {
      return res
        .status(200)
        .json({ message: "Accident has no valid ratings yet", success: true });
    }

    let totalRating = validRatings.length;
    let ratingSum = validRatings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = ratingSum / totalRating;

    let finalAccident = await Accident.findByIdAndUpdate(
      prodId,
      { totalRating: actualRating },
      { new: true }
    );
    // Gửi kết quả cuối cùng ở đây
    res.json({ finalAccident });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});






module.exports = {
  createAccident,
  getallAccident,
  getAccidentById,
  updateAccident,
  deleteAccident,
  rating,
  // uploadImages,
  // deleteImages,
};