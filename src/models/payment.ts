import { Schema, model, models, Types } from "mongoose";

const paymentSchema = new Schema(
  {
    customerId: {
      type: Types.ObjectId,
      ref: "CustomerProfile",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    mode: {
      type: String,
      enum: ["CASH", "UPI", "BANK"],
      required: true,
      default: "UPI",
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = models.Payment || model("Payment", paymentSchema);
