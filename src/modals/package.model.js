import mongoose, { Schema } from "mongoose";

const packageSchema = new Schema(
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
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    tripType: {
      type: String,
      required: true,
      enum: ["ONE_WAY", "ROUND_TRIP"],
    },
    distanceKm: {
      type: Number,
    },
    estimatedDurationMinutes: {
      type: Number,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    pricing: [
      {
        carId: {
          type: Schema.Types.ObjectId,
          ref: "Car",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    inclusions: [
      {
        type: String,
      },
    ],
    exclusions: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Package = mongoose.model("Package", packageSchema);
