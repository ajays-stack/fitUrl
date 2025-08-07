import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

const Images = mongoose.model("Image", imageSchema); // Better to capitalize model names

export default Images;
