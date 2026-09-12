import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Car = mongoose.model("Car", carSchema);
