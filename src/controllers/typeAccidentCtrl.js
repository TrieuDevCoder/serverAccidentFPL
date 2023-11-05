const Accident = require("../models/typeACDModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoosedbid");

const createAccident = asyncHandler(async (req, res) => {
  try {
    const newAccident = await Accident.create(req.body);
    res.json(newAccident);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAccident = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateAccident = await Accident.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateAccident);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAccident = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteAccident = await Accident.findByIdAndDelete(id);

    res.json({ message: "Accident deleted successfully", deleteAccident });
  } catch (error) {
    throw new Error(error);
  }
});
const getAccident = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getAccident = await Accident.findById(id);
    res.json(getAccident);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllAccident = asyncHandler(async (req, res) => {
  try {
    const getAllAccident = await Accident.find();
    res.json(getAllAccident);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createAccident,
  updateAccident,
  deleteAccident,
  getAccident,
  getAllAccident,
};
