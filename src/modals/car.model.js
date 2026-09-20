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
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "CarBrand",
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    rcNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isCommercial: {
      type: Boolean,
      required: true,
      default: false,
    },
    carNumber: {
      type: String,
      required: true,
      trim: true,
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
