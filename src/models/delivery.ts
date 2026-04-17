import { Schema, model, models, Types } from "mongoose";

const deliverySchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    quantityDelivered: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["DELIVERED", "SKIPPED", "PAUSED"],
      required: true,
      default: "DELIVERED",
    },
    note: {
      type: String,
      trim: true,
    },
    markedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Delivery = models.Delivery || model("Delivery", deliverySchema);
