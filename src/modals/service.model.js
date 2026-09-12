import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
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
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    pricingType: {
      type: String,
      required: true,
      enum: ["FIXED", "PER_HOUR", "PER_KM"],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
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

export const Service = mongoose.model("Service", serviceSchema);
