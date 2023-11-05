const mongoose = require("mongoose"); // Erase if already required

var AccidentSchema = new mongoose.Schema(
  {
    room: { type: String, required: true, uppercase: true },
    description: {
      type: String,
      required: true,
    },
    image: [],
    typeAccident: {
      type: mongoose.Types.ObjectId,
      ref: "TypeACD",
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: Number,

      default:0
    },
    status: {
      type: String,
      default: "Request",
      enum: ["Request", "Receive", "Successful"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Accident", AccidentSchema);
