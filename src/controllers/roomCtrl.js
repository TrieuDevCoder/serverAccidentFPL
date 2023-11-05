const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongoosedbid");

const createRoom = asyncHandler(async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.json(newRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteRoom = await Room.findByIdAndDelete(id);

    res.json({ message: "Room deleted successfully", deleteRoom });
  } catch (error) {
    throw new Error(error);
  }
});
const getRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getRoom = await Room.findById(id);
    res.json(getRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllRoom = asyncHandler(async (req, res) => {
  try {
    const getAllRoom = await Room.find();
    res.json(getAllRoom);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
};
