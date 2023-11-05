const Support = require("../models/typeSUPModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoosedbid");

const createSupport = asyncHandler(async (req, res) => {
  try {
    const newSupport = await Support.create(req.body);
    res.json(newSupport);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSupport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateSupport = await Support.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateSupport);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSupport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteSupport = await Support.findByIdAndDelete(id);

    res.json({ message: "Support deleted successfully", deleteSupport });
  } catch (error) {
    throw new Error(error);
  }
});
const getSupport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getSupport = await Support.findById(id);
    res.json(getSupport);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllSupport = asyncHandler(async (req, res) => {
  try {
    const getAllSupport = await Support.find();
    res.json(getAllSupport);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSupport,
  updateSupport,
  deleteSupport,
  getSupport,
  getAllSupport,
};
